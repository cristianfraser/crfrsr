import { ThemeProvider, Text, Heading, useTheme } from '@crfrsr/design-system-react';
import './App.css';

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

