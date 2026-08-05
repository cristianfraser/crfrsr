import * as React from 'react';
import {
  ThemeProvider,
  Text,
  Heading,
  useTheme,
  Button,
  Pill,
  Combobox,
  CommandItem,
  Input,
  Textarea,
  Field,
} from '@crfrsr/ui';
import './App.css';

// ---- Components showcase ------------------------------------------------

const PILL_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

const MOCK_OPTIONS = Array.from({ length: 500 }, (_, i) => ({
  id: i,
  label: `Option ${i + 1}`,
}));

type MockOption = (typeof MOCK_OPTIONS)[number];

function ComponentsShowcase() {
  const { theme } = useTheme();

  const [search, setSearch] = React.useState('');
  const [selected, setSelected] = React.useState<MockOption | null>(null);

  const filtered = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return MOCK_OPTIONS;
    return MOCK_OPTIONS.filter((o) => o.label.toLowerCase().includes(q));
  }, [search]);

  const cardStyle: React.CSSProperties = {
    padding: '1.5rem',
    borderRadius: '8px',
    backgroundColor: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    marginBottom: '1.5rem',
  };

  return (
    <section style={{ marginBottom: '3rem' }}>
      <Heading level={2} style={{ marginBottom: '1rem' }}>
        Components
      </Heading>

      {/* Buttons */}
      <div style={cardStyle}>
        <Heading level={3} style={{ marginBottom: '1rem' }}>
          Button
        </Heading>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center', marginBottom: '1rem' }}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="link">Link</Button>
          <Button disabled>Disabled</Button>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="icon" aria-label="icon button">★</Button>
        </div>
      </div>

      {/* Pills */}
      <div style={cardStyle}>
        <Heading level={3} style={{ marginBottom: '1rem' }}>
          Pill
        </Heading>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center', marginBottom: '1rem' }}>
          {PILL_COLORS.map((c, i) => (
            <Pill key={c} color={c} hoverColor={theme.colors.text} glyph={<span>{i + 1}</span>}>
              Label {i + 1}
            </Pill>
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
          <Pill size="default" color={PILL_COLORS[0]}>Default</Pill>
          <Pill size="small" color={PILL_COLORS[1]}>Small</Pill>
          <Pill size="icon" color={PILL_COLORS[2]} glyph={<span>i</span>} uppercase={false} />
        </div>
      </div>

      {/* Combobox */}
      <div style={cardStyle}>
        <Heading level={3} style={{ marginBottom: '1rem' }}>
          Combobox (virtualized, 500 options)
        </Heading>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Combobox<MockOption>
            options={MOCK_OPTIONS}
            filteredOptions={filtered}
            searchValue={search}
            onSearchChange={setSearch}
            onSelect={setSelected}
            value={selected}
            showClearButton
            onClear={() => setSelected(null)}
            popoverWidth="220px"
            placeholder="Search options..."
            emptyMessage="No options found."
            trigger={
              <Button variant="outline" size="sm">
                {selected ? selected.label : 'Select an option'}
              </Button>
            }
            renderOption={(option, _index, onSelectOption) => (
              <CommandItem key={option.id} value={option.label} onSelect={onSelectOption}>
                {option.label}
              </CommandItem>
            )}
          />
          <Text color="textSecondary" variant="sm">
            Selected: {selected ? selected.label : 'none'}
          </Text>
        </div>
      </div>

      {/* Input */}
      <div style={cardStyle}>
        <Heading level={3} style={{ marginBottom: '1rem' }}>
          Input
        </Heading>
        {/* Inputs fill their container, so each demo sits in a sized cell. */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '0.75rem',
          }}
        >
          <Input size="sm" placeholder="Small" aria-label="small input" />
          <Input size="md" placeholder="Medium" aria-label="medium input" />
          <Input size="lg" placeholder="Large" aria-label="large input" />
          <Input defaultValue="Disabled" disabled aria-label="disabled input" />
          <Input defaultValue="Invalid" aria-invalid="true" aria-label="invalid input" />
          <Input type="search" placeholder="Search" aria-label="search input" />
          <Input type="number" defaultValue={42} aria-label="number input" />
          <Input type="date" aria-label="date input" />
        </div>
      </div>

      {/* Input + Button */}
      <div id="input-button" style={cardStyle}>
        <Heading level={3} style={{ marginBottom: '1rem' }}>
          Input + Button
        </Heading>
        <Text color="textSecondary" variant="sm" style={{ marginBottom: '0.75rem' }}>
          Controls on the same size step share a height, so a plain flex row
          lines up without any extra alignment.
        </Text>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <Input type="email" placeholder="you@example.com" aria-label="email address" />
          <Button>Subscribe</Button>
          <Button size="icon" variant="outline" aria-label="favorite">★</Button>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <Input size="sm" placeholder="Filter rows…" aria-label="filter rows" />
          <Button size="sm" variant="outline">Apply</Button>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Input size="lg" type="search" placeholder="Search the docs" aria-label="search the docs" />
          <Button size="lg" variant="secondary">Search</Button>
        </div>
      </div>

      {/* Labelled inputs + buttons on one row (nw-tracker layout) */}
      <div id="nw-tracker" style={cardStyle}>
        <Heading level={3} style={{ marginBottom: '1rem' }}>
          Labelled inputs + buttons on one row
        </Heading>
        <Text color="textSecondary" variant="sm" style={{ marginBottom: '0.75rem' }}>
          Inputs wrapped in column-flex labels beside plain buttons, row on
          flex-end. Buttons a step below the inputs (md inputs, sm buttons) sit
          4px shorter:
        </Text>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'flex-end', marginBottom: '1.25rem' }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span style={{ fontSize: 'var(--crfrsr-font-size-xs)', color: theme.colors.textSecondary }}>
              Monto (CLP)
            </span>
            <Input type="number" defaultValue={583492} />
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span style={{ fontSize: 'var(--crfrsr-font-size-xs)', color: theme.colors.textSecondary }}>
              Fecha
            </span>
            <Input type="date" defaultValue="2017-06-30" />
          </label>
          <Button size="sm">Guardar</Button>
          <Button size="sm" variant="secondary">Quitar ancla</Button>
        </div>
        <Text color="textSecondary" variant="sm" style={{ marginBottom: '0.75rem' }}>
          Buttons on the same step as the inputs (both md) sit flush:
        </Text>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'flex-end', marginBottom: '1.25rem' }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span style={{ fontSize: 'var(--crfrsr-font-size-xs)', color: theme.colors.textSecondary }}>
              Monto (CLP)
            </span>
            <Input type="number" defaultValue={583492} />
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span style={{ fontSize: 'var(--crfrsr-font-size-xs)', color: theme.colors.textSecondary }}>
              Fecha
            </span>
            <Input type="date" defaultValue="2017-06-30" />
          </label>
          <Button>Guardar</Button>
          <Button variant="secondary">Quitar ancla</Button>
        </div>
        <Text color="textSecondary" variant="sm" style={{ marginBottom: '0.75rem' }}>
          Same thing with Field instead of a hand-rolled label:
        </Text>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'flex-end' }}>
          <Field label="Monto (CLP)">
            <Input type="number" defaultValue={583492} />
          </Field>
          <Field label="Fecha">
            <Input type="date" defaultValue="2017-06-30" />
          </Field>
          <Button>Guardar</Button>
          <Button variant="secondary">Quitar ancla</Button>
        </div>
      </div>

      {/* Textarea */}
      <div style={cardStyle}>
        <Heading level={3} style={{ marginBottom: '1rem' }}>
          Textarea
        </Heading>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '0.75rem',
          }}
        >
          <Textarea rows={4} placeholder="Resizes vertically" aria-label="textarea" />
          <Textarea rows={4} size="sm" defaultValue="Small, disabled" disabled aria-label="disabled textarea" />
        </div>
      </div>

      {/* Field */}
      <div style={cardStyle}>
        <Heading level={3} style={{ marginBottom: '1rem' }}>
          Field
        </Heading>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '1rem',
            alignItems: 'start',
          }}
        >
          <Field label="Amount">
            <Input type="number" defaultValue={1000} />
          </Field>
          <Field label="Email" error="Enter a valid email address.">
            <Input type="email" defaultValue="not-an-email" aria-invalid="true" />
          </Field>
          <Field label="Notes">
            <Textarea rows={3} placeholder="Optional" />
          </Field>
        </div>
      </div>
    </section>
  );
}

function AppContent() {
  const { theme, toggleMode, isLight } = useTheme();

  return (
    <div className="app" style={{
      backgroundColor: theme.colors.background,
      minHeight: '100vh',
      padding: '2rem',
      transition: 'background-color 0.3s ease',
    }}>
      <button
        onClick={toggleMode}
        style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          border: '1px solid',
          cursor: 'pointer',
          backgroundColor: theme.colors.surface,
          color: theme.colors.text,
          borderColor: theme.colors.border,
          zIndex: 1000,
          transition: 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease',
        }}
      >
        {isLight ? '🌙 Dark' : '☀️ Light'}
      </button>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <Heading level={1}>crfrsr Design System</Heading>
        </div>

        <ComponentsShowcase />

        <section style={{ marginBottom: '3rem' }}>
          <Heading level={2} style={{ marginBottom: '1rem' }}>Typography Examples</Heading>

          <div style={{ marginBottom: '2rem' }}>
            <Heading level={3} style={{ marginBottom: '0.5rem' }}>Headings</Heading>
            <Heading level={1} >Heading 1 - Main Title</Heading>
            <Heading level={2}>Heading 2 - Section Title</Heading>
            <Heading level={3}>Heading 3 - Subsection</Heading>
            <Heading level={4}>Heading 4 - Minor Section</Heading>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <Heading level={3} style={{ marginBottom: '0.5rem' }}>Text Variants</Heading>
            <Text variant="xs">Extra Small Text (xs)</Text>
            <Text variant="sm">Small Text (sm)</Text>
            <Text
            // variant="base"
            >Base Text (base)</Text>
            <Text variant="lg">Large Text (lg)</Text>
            <Text variant="xl">Extra Large Text (xl)</Text>
            <Text variant="2xl">2XL Text (2xl)</Text>
            <Text variant="3xl">3XL Text (3xl)</Text>
            <Text variant="4xl">4XL Text (4xl)</Text>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <Heading level={3} style={{ marginBottom: '0.5rem' }}>Font Weights</Heading>
            <Text
            // weight="normal"
            >Normal Weight</Text>
            <Text weight="medium">Medium Weight</Text>
            <Text weight="semibold">Semibold Weight</Text>
            <Text weight="bold">Bold Weight</Text>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <Heading level={3} style={{ marginBottom: '0.5rem' }}>Colors</Heading>
            <Text
            // color="text"
            >Default Text Color</Text>
            <Text color="textSecondary">Secondary Text Color</Text>
            <Text color="textDisabled">Disabled Text Color</Text>
            <Text color="primary">Primary Color</Text>
            <Text color="secondary">Secondary Color</Text>
            <Text color="success">Success Color</Text>
            <Text color="warning">Warning Color</Text>
            <Text color="error">Error Color</Text>
            <Text color="info">Info Color</Text>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <Heading level={3} style={{ marginBottom: '0.5rem' }}>Text Alignment</Heading>
            <Text
            // align="left"
            >Left Aligned Text</Text>
            <Text align="center">Center Aligned Text</Text>
            <Text align="right">Right Aligned Text</Text>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <Heading level={3} style={{ marginBottom: '0.5rem' }}>Line Heights</Heading>
            <Text lineHeight="tight" style={{ marginBottom: '0.5rem' }}>
              Tight Line Height - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
            <Text
              // lineHeight="normal" 
              style={{ marginBottom: '0.5rem' }}>
              Normal Line Height - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
            <Text lineHeight="relaxed" style={{ marginBottom: '0.5rem' }}>
              Relaxed Line Height - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </div>
        </section>

        <section>
          <Heading level={2} style={{ marginBottom: '1rem' }}>Usage Example</Heading>
          <div style={{
            padding: '1.5rem',
            borderRadius: '8px',
            backgroundColor: theme.colors.surface,
            border: `1px solid ${theme.colors.border}`,
          }}>
            <Heading level={3} color="primary" style={{ marginBottom: '0.5rem' }}>
              Welcome to crfrsr
            </Heading>
            <Text style={{ marginBottom: '1rem' }}>
              This is an example of how to use the crfrsr Design System in your React web application.
              The typography components automatically adapt to the current theme mode.
            </Text>
            <Text color="textSecondary" variant="sm">
              All components support dynamic theming and will update when the theme mode changes.
            </Text>
          </div>
        </section>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;

