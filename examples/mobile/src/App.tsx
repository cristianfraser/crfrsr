import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  Switch,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, Text, Heading, useTheme } from '@crfrsr/design-system-react-native';

function AppContent(): JSX.Element {
  const { theme, setMode, isLight } = useTheme();

  const handleToggle = (value: boolean) => {
    setMode(value ? 'dark' : 'light');
  };

  return (
    <SafeAreaView style={[
      styles.container,
      { backgroundColor: theme.colors.background }
    ]}>
      <View style={{ flex: 1 }}>
        <StatusBar style={isLight ? 'dark' : 'light'} />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={[styles.scrollView, { backgroundColor: theme.colors.background }]}
        >
          <View style={styles.content}>
            <View style={styles.header}>
              <View style={styles.titleContainer}>
                <Heading level={1}>crfrsr Design System</Heading>
              </View>
              <View style={styles.toggleContainer}>
                <Text color="textSecondary" variant="sm" style={styles.toggleLabel}>
                  {isLight ? '☀️ Light' : '🌙 Dark'}
                </Text>
                <Switch
                  value={!isLight}
                  onValueChange={handleToggle}
                  trackColor={
                    {
                      false: theme.colors.border,
                      true: theme.colors.textSecondary,
                    }
                  }
                  thumbColor={theme.colors.surface}
                />
              </View>
            </View>

            <View style={styles.section}>
              <Heading level={2} style={styles.sectionTitle}>Typography Examples</Heading>

              <View style={styles.subsection}>
                <Heading level={3} style={styles.subsectionTitle}>Headings</Heading>
                <Heading level={1}>Heading 1 - Main Title</Heading>
                <Heading level={2}>Heading 2 - Section Title</Heading>
                <Heading level={3}>Heading 3 - Subsection</Heading>
                <Heading level={4}>Heading 4 - Minor Section</Heading>
              </View>

              <View style={styles.subsection}>
                <Heading level={3} style={styles.subsectionTitle}>Text Variants</Heading>
                <Text variant="xs">Extra Small Text (xs)</Text>
                <Text variant="sm">Small Text (sm)</Text>
                <Text
                //variant="base"
                >Base Text (base)</Text>
                <Text variant="lg">Large Text (lg)</Text>
                <Text variant="xl">Extra Large Text (xl)</Text>
                <Text variant="2xl">2XL Text (2xl)</Text>
                <Text variant="3xl">3XL Text (3xl)</Text>
                <Text variant="4xl">4XL Text (4xl)</Text>
              </View>

              <View style={styles.subsection}>
                <Heading level={3} style={styles.subsectionTitle}>Font Weights</Heading>
                <Text
                // weight="normal"
                >Normal Weight</Text>
                <Text weight="medium">Medium Weight</Text>
                <Text weight="semibold">Semibold Weight</Text>
                <Text weight="bold">Bold Weight</Text>
              </View>

              <View style={styles.subsection}>
                <Heading level={3} style={styles.subsectionTitle}>Colors</Heading>
                <Text
                //color="text"
                >Default Text Color</Text>
                <Text color="textSecondary">Secondary Text Color</Text>
                <Text color="textDisabled">Disabled Text Color</Text>
                <Text color="primary">Primary Color</Text>
                <Text color="secondary">Secondary Color</Text>
                <Text color="success">Success Color</Text>
                <Text color="warning">Warning Color</Text>
                <Text color="error">Error Color</Text>
                <Text color="info">Info Color</Text>
              </View>

              <View style={styles.subsection}>
                <Heading level={3} style={styles.subsectionTitle}>Text Alignment</Heading>
                <Text
                //align="left"
                >Left Aligned Text</Text>
                <Text align="center">Center Aligned Text</Text>
                <Text align="right">Right Aligned Text</Text>
              </View>

              <View style={styles.subsection}>
                <Heading level={3} style={styles.subsectionTitle}>Line Heights</Heading>
                <Text lineHeight="tight" style={styles.paragraph}>
                  Tight Line Height - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Text>
                <Text
                  //lineHeight="normal"
                  style={styles.paragraph}>
                  Normal Line Height - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Text>
                <Text lineHeight="relaxed" style={styles.paragraph}>
                  Relaxed Line Height - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Text>
              </View>
            </View>

            <View style={styles.section}>
              <Heading level={2} style={styles.sectionTitle}>Usage Example</Heading>
              <View style={[
                styles.card,
                {
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border,
                }
              ]}>
                <Heading level={3} color="primary" style={styles.cardTitle}>
                  Welcome to crfrsr
                </Heading>
                <Text style={styles.cardText}>
                  This is an example of how to use the crfrsr Design System in your React Native mobile application.
                  The typography components automatically adapt to the current theme mode.
                </Text>
                <Text color="textSecondary" variant="sm">
                  All components support dynamic theming and will update when the theme mode changes.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  titleContainer: {
    flex: 1,
    marginRight: 16,
    flexShrink: 1,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 0,
  },
  toggleLabel: {
    marginRight: 8,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  subsection: {
    marginBottom: 24,
  },
  subsectionTitle: {
    marginBottom: 8,
  },
  paragraph: {
    marginBottom: 8,
  },
  card: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  cardTitle: {
    marginBottom: 8,
  },
  cardText: {
    marginBottom: 12,
  },
});

function App(): JSX.Element {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;

