/**
 * FONT IMPLEMENTATION TEMPLATE
 *
 * This is a template showing how to update your React Native components
 * to use the Figtree fonts defined in the theme/colors.ts file.
 *
 * Copy this pattern to all your components.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONT_STYLES } from '../theme/colors';

interface TemplateComponentProps {
  title: string;
  subtitle?: string;
  onPress?: () => void;
}

const TemplateComponent: React.FC<TemplateComponentProps> = ({
  title,
  subtitle,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      <Text style={styles.description}>
        This is a description using body font style
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
    marginVertical: 8,
  },
  // Title using title2 (24px, SemiBold)
  title: {
    ...FONT_STYLES.title2,
    color: COLORS.textDark,
    marginBottom: 8,
  },
  // Subtitle using headline (18px, SemiBold)
  subtitle: {
    ...FONT_STYLES.headline,
    color: COLORS.primary,
    marginBottom: 12,
  },
  // Body text using body style (16px, Normal)
  description: {
    ...FONT_STYLES.body,
    color: COLORS.textLight,
    marginBottom: 8,
  },
});

export default TemplateComponent;

/**
 * FONT STYLES QUICK REFERENCE
 *
 * Import from '../theme/colors':
 * import { COLORS, FONT_STYLES } from '../theme/colors';
 *
 * Usage:
 * ...FONT_STYLES.largeTitle    // 32px, Bold (700)
 * ...FONT_STYLES.title1        // 28px, Bold (700)
 * ...FONT_STYLES.title2        // 24px, SemiBold (600)
 * ...FONT_STYLES.title3        // 20px, SemiBold (600)
 * ...FONT_STYLES.headline      // 18px, SemiBold (600)
 * ...FONT_STYLES.body          // 16px, Normal (400)
 * ...FONT_STYLES.bodyMedium    // 16px, Medium (500)
 * ...FONT_STYLES.bodySemibold  // 16px, SemiBold (600)
 * ...FONT_STYLES.bodyItalic    // 16px, Normal (400) - Italic
 * ...FONT_STYLES.callout       // 14px, Normal (400)
 * ...FONT_STYLES.calloutMedium // 14px, Medium (500)
 * ...FONT_STYLES.calloutSemibold // 14px, SemiBold (600)
 * ...FONT_STYLES.caption       // 12px, Normal (400)
 * ...FONT_STYLES.captionMedium // 12px, Medium (500)
 * ...FONT_STYLES.captionSemibold // 12px, SemiBold (600)
 * ...FONT_STYLES.captionItalic // 12px, Normal (400) - Italic
 *
 * For custom weights:
 * fontWeight: '400' as any  // Normal
 * fontWeight: '500' as any  // Medium
 * fontWeight: '600' as any  // SemiBold
 * fontWeight: '700' as any  // Bold
 * fontWeight: '900' as any  // ExtraBold
 */
