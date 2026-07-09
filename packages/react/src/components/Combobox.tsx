import * as React from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { cn } from '../lib/cn';
import { useIsMobile } from '../hooks/useIsMobile';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from './command';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

export interface ComboboxProps<T> {
  options: T[];
  filteredOptions: T[];
  isLoading?: boolean;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSelect: (option: T) => void;
  trigger: React.ReactNode;
  renderOption: (option: T, index: number, onSelect: () => void) => React.ReactNode;
  placeholder?: string;
  emptyMessage?: string;
  loadingMessage?: string;
  /** CSS width value for the popover, e.g. "200px" or "12rem". Default "137.5px". */
  popoverWidth?: string;
  /** Extra class names for the popover content. */
  popoverClassName?: string;
  estimateItemSize?: number;
  inputClassName?: string;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  onLoadMore?: () => void;
  showClearButton?: boolean;
  onClear?: () => void;
  value?: unknown;
  onOpenChange?: (open: boolean) => void;
}

/**
 * Generic, virtualized combobox with optional infinite scroll. Styling-agnostic:
 * the trigger and each option are supplied by the consumer via render props, and
 * the popover width is a plain CSS value.
 */
export function Combobox<T>({
  filteredOptions,
  isLoading = false,
  searchValue,
  onSearchChange,
  onSelect,
  trigger,
  renderOption,
  placeholder = 'Search...',
  emptyMessage = 'No items found.',
  loadingMessage = 'Loading...',
  popoverWidth = '137.5px',
  popoverClassName,
  estimateItemSize = 28,
  hasNextPage = false,
  isFetchingNextPage = false,
  onLoadMore,
  showClearButton = false,
  onClear,
  value,
  onOpenChange: externalOnOpenChange,
  inputClassName,
}: ComboboxProps<T>) {
  const [open, setOpen] = React.useState(false);
  const isMobile = useIsMobile();

  // Notify parent of open state changes
  React.useEffect(() => {
    externalOnOpenChange?.(open);
  }, [open, externalOnOpenChange]);

  const commandListRef = React.useRef<HTMLDivElement | null>(null);
  const parentRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isScrollingRef = React.useRef(false);

  // Reset search when popover closes, after the close animation finishes.
  // NOTE: 200ms must match the popover close-animation duration in combobox.css.
  React.useEffect(() => {
    if (!open) {
      const timeoutId = setTimeout(() => {
        onSearchChange('');
      }, 200);
      return () => clearTimeout(timeoutId);
    }
  }, [open, onSearchChange]);

  // Detect scrolling on mobile to prevent accidental combobox opens
  React.useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      isScrollingRef.current = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrollingRef.current = false;
      }, 150); // Reset scrolling flag 150ms after scroll ends
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Create full-page overlay when combobox opens
  React.useEffect(() => {
    if (!open) return;

    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.right = '0';
    overlay.style.bottom = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.userSelect = 'none';
    overlay.style.zIndex = '40'; // Below popover (z-50) but above most content
    document.body.appendChild(overlay);

    return () => {
      if (document.body.contains(overlay)) {
        document.body.removeChild(overlay);
      }
    };
  }, [open]);

  // Virtualizer for the list
  const rowVirtualizer = useVirtualizer({
    count: filteredOptions.length,
    getScrollElement: () => commandListRef.current,
    estimateSize: () => estimateItemSize,
    overscan: 10,
  });

  // Reset virtualizer when opening
  React.useEffect(() => {
    if (open) {
      rowVirtualizer.measure();
    }
  }, [open, rowVirtualizer]);

  // Update virtualizer when filtered options change
  React.useEffect(() => {
    if (open && filteredOptions.length > 0) {
      rowVirtualizer.measure();
    }
  }, [filteredOptions.length, open, rowVirtualizer]);

  // Check if we need to load more pages (when data changes or scrolling)
  const virtualItems = rowVirtualizer.getVirtualItems();
  const checkLoadMore = React.useCallback(() => {
    // Skip if already fetching or no more pages
    if (isFetchingNextPage || isLoading || !hasNextPage || !onLoadMore) return;

    const scrollElement = commandListRef.current;
    if (!scrollElement) return;

    // Check scroll position - load when within 80% of scroll height
    const scrollTop = scrollElement.scrollTop;
    const scrollHeight = scrollElement.scrollHeight;
    const clientHeight = scrollElement.clientHeight;
    const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;

    // Also check virtual items as backup
    const lastItem =
      virtualItems.length > 0 ? virtualItems[virtualItems.length - 1] : null;

    // Load next page if:
    // 1. Scrolled to 80% of content, OR
    // 2. Last visible item is within 20 items of the end
    if (
      scrollPercentage >= 0.8 ||
      (lastItem && lastItem.index >= filteredOptions.length - 20)
    ) {
      onLoadMore();
    }
  }, [
    virtualItems,
    isFetchingNextPage,
    isLoading,
    hasNextPage,
    onLoadMore,
    filteredOptions.length,
  ]);

  // Check for more pages when filtered options change (new data loaded)
  React.useEffect(() => {
    if (open && filteredOptions.length > 0 && onLoadMore) {
      requestAnimationFrame(() => {
        checkLoadMore();
      });
    }
  }, [open, filteredOptions.length, checkLoadMore, onLoadMore]);

  // Infinite scroll: load next page when scrolling near the bottom
  React.useEffect(() => {
    if (!open || !onLoadMore) return;

    const scrollElement = commandListRef.current;
    if (!scrollElement) {
      return;
    }

    const rafHandleScroll = () => {
      requestAnimationFrame(() => {
        checkLoadMore();
      });
    };

    scrollElement.addEventListener('scroll', rafHandleScroll, { passive: true });

    return () => {
      scrollElement.removeEventListener('scroll', rafHandleScroll);
    };
  }, [open, checkLoadMore, onLoadMore]);

  // Handle popover open change - prevent opening if scrolling
  const handleOpenChange = React.useCallback((newOpen: boolean) => {
    if (newOpen && isScrollingRef.current) {
      return;
    }
    setOpen(newOpen);
  }, []);

  // Touch handlers for mobile to prevent double-tap issue
  const handleTouchStart = React.useCallback(
    (e: React.TouchEvent) => {
      if (isMobile) {
        const touch = e.touches[0];
        if (touch) {
          (e.currentTarget as unknown as { __touchStart?: unknown }).__touchStart = {
            x: touch.clientX,
            y: touch.clientY,
            time: Date.now(),
          };
        }
      }
    },
    [isMobile]
  );

  const handleTouchMove = React.useCallback(
    (e: React.TouchEvent) => {
      if (isMobile) {
        const touchStart = (
          e.currentTarget as unknown as { __touchStart?: { x: number; y: number } }
        ).__touchStart;
        if (touchStart) {
          const touch = e.touches[0];
          if (touch) {
            const deltaX = Math.abs(touch.clientX - touchStart.x);
            const deltaY = Math.abs(touch.clientY - touchStart.y);
            // If moved more than 10px, consider it a scroll
            if (deltaX > 10 || deltaY > 10) {
              (
                e.currentTarget as unknown as { __isScrollGesture?: boolean }
              ).__isScrollGesture = true;
            }
          }
        }
      }
    },
    [isMobile]
  );

  const handleTouchEnd = React.useCallback(
    (e: React.TouchEvent) => {
      // On mobile, trigger click immediately to open combobox.
      // This prevents the double-tap issue.
      if (isMobile) {
        const target = e.currentTarget as unknown as {
          __isScrollGesture?: boolean;
          __touchStart?: unknown;
        };
        const isScrollGesture = target.__isScrollGesture;
        if (isScrollGesture) {
          // Don't open if it was a scroll gesture
          e.preventDefault();
          e.stopPropagation();
          delete target.__touchStart;
          delete target.__isScrollGesture;
          return;
        }

        delete target.__touchStart;
        delete target.__isScrollGesture;

        e.preventDefault();
        e.stopPropagation();
        // Programmatically trigger click to open the popover
        const clickEvent = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window,
        });
        e.currentTarget.dispatchEvent(clickEvent);
      }
    },
    [isMobile]
  );

  const handleTriggerClick = React.useCallback((e: React.MouseEvent) => {
    // Stop propagation to prevent container selection
    e.stopPropagation();
  }, []);

  return (
    <div ref={containerRef} className="crfrsr-combobox">
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onClick={handleTriggerClick}
          >
            {trigger}
          </div>
        </PopoverTrigger>
        <PopoverContent
          className={cn('crfrsr-combobox__popover', popoverClassName)}
          style={{ width: popoverWidth }}
          align="start"
          onClick={(e) => e.stopPropagation()}
        >
          <Command shouldFilter={false}>
            <CommandInput
              placeholder={placeholder}
              className={inputClassName}
              value={searchValue}
              onValueChange={onSearchChange}
            />
            <CommandList className="crfrsr-combobox__list" ref={commandListRef}>
              {isLoading ? (
                <CommandEmpty className="crfrsr-combobox__message">
                  {loadingMessage}
                </CommandEmpty>
              ) : filteredOptions.length === 0 ? (
                <CommandEmpty className="crfrsr-combobox__message">
                  {emptyMessage}
                </CommandEmpty>
              ) : null}
              <CommandGroup
                ref={parentRef}
                style={{
                  height: `${rowVirtualizer.getTotalSize()}px`,
                  width: '100%',
                  position: 'relative',
                }}
              >
                {filteredOptions.length === 0
                  ? null
                  : rowVirtualizer.getVirtualItems().map((virtualItem) => {
                      const option = filteredOptions[virtualItem.index];
                      if (!option) return null;

                      return (
                        <div
                          key={virtualItem.key}
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: `${virtualItem.size}px`,
                            transform: `translateY(${virtualItem.start}px)`,
                          }}
                        >
                          {renderOption(option, virtualItem.index, () => {
                            if (!open) {
                              return;
                            }
                            onSelect(option);
                            setOpen(false);
                          })}
                        </div>
                      );
                    })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {showClearButton && value != null && onClear && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClear();
          }}
          className="crfrsr-combobox__clear"
          aria-label="Clear selection"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
