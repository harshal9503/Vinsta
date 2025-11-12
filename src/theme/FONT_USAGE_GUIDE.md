# Figtree Font Integration Guide

## Overview

This project uses **Figtree** variable font family for all text styling. The Figtree font supports variable weights from 400 to 900.

## Available Font Files

- `Figtree-VariableFont_wght.ttf` - Regular font
- `Figtree-Italic-VariableFont_wght.ttf` - Italic font

## Font Weights

- **400 (Normal)**: Default/regular text
- **500 (Medium)**: Slightly bolder than normal
- **600 (SemiBold)**: Medium-bold text
- **700 (Bold)**: Bold text
- **900 (ExtraBold)**: Extra bold/heavy text

## Available Font Styles

All font styles are defined in `colors.ts` and exported from there.

### Import

```typescript
import { FONT_STYLES, FONT_FAMILY } from '../theme/colors';
```

### Title Styles

```typescript
// Largest title - 32px, Bold (700)
FONT_STYLES.largeTitle;

// Large title - 28px, Bold (700)
FONT_STYLES.title1;

// Medium title - 24px, SemiBold (600)
FONT_STYLES.title2;

// Small title - 20px, SemiBold (600)
FONT_STYLES.title3;
```

### Heading Style

```typescript
// Headline - 18px, SemiBold (600)
FONT_STYLES.headline;
```

### Body Styles

```typescript
// Normal body text - 16px, Normal (400)
FONT_STYLES.body;

// Medium body text - 16px, Medium (500)
FONT_STYLES.bodyMedium;

// Bold body text - 16px, SemiBold (600)
FONT_STYLES.bodySemibold;

// Italic body text - 16px, Normal (400) - Italic font
FONT_STYLES.bodyItalic;
```

### Callout Styles

```typescript
// Normal callout - 14px, Normal (400)
FONT_STYLES.callout;

// Medium callout - 14px, Medium (500)
FONT_STYLES.calloutMedium;

// Bold callout - 14px, SemiBold (600)
FONT_STYLES.calloutSemibold;
```

### Caption Styles

```typescript
// Normal caption - 12px, Normal (400)
FONT_STYLES.caption;

// Medium caption - 12px, Medium (500)
FONT_STYLES.captionMedium;

// Bold caption - 12px, SemiBold (600)
FONT_STYLES.captionSemibold;

// Italic caption - 12px, Normal (400) - Italic font
FONT_STYLES.captionItalic;
```

## Usage Examples

### Basic Text Component

```tsx
import { Text, StyleSheet } from 'react-native';
import { FONT_STYLES } from '../theme/colors';

const MyComponent = () => <Text style={styles.title}>My Title</Text>;

const styles = StyleSheet.create({
  title: {
    ...FONT_STYLES.title1,
    color: '#000',
  },
});
```

### Multiple Font Styles

```tsx
import { Text, StyleSheet } from 'react-native';
import { FONT_STYLES, COLORS } from '../theme/colors';

const MyComponent = () => (
  <>
    <Text style={styles.heading}>Heading</Text>
    <Text style={styles.body}>Body text content</Text>
    <Text style={styles.caption}>Small caption</Text>
  </>
);

const styles = StyleSheet.create({
  heading: {
    ...FONT_STYLES.headline,
    color: COLORS.primary,
  },
  body: {
    ...FONT_STYLES.body,
    color: COLORS.textDark,
  },
  caption: {
    ...FONT_STYLES.caption,
    color: COLORS.textLight,
  },
});
```

### Custom Font Styling

For custom weight and size combinations not covered by predefined styles:

```tsx
import { FONT_FAMILY } from '../theme/colors';

const styles = StyleSheet.create({
  customText: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: 18,
    fontWeight: '600' as any, // SemiBold weight
  },
  customItalic: {
    fontFamily: FONT_FAMILY.italic,
    fontSize: 16,
    fontWeight: '400' as any, // Normal weight
  },
});
```

## Available Weights with Custom Styling

You can manually specify any weight from 400 to 900:

```typescript
// Normal weight
fontWeight: '400' as any;

// Medium weight
fontWeight: '500' as any;

// SemiBold weight
fontWeight: '600' as any;

// Bold weight
fontWeight: '700' as any;

// ExtraBold weight
fontWeight: '900' as any;
```

## Setup Files Modified

### 1. **react-native.config.js**

```javascript
module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./src/assets/fonts/'],
};
```

### 2. **iOS Info.plist**

Added UIAppFonts array with font file names:

```xml
<key>UIAppFonts</key>
<array>
  <string>Figtree-VariableFont_wght.ttf</string>
  <string>Figtree-Italic-VariableFont_wght.ttf</string>
</array>
```

### 3. **src/theme/colors.ts**

Exports all color constants, font families, and predefined font styles.

## Android Configuration

Android automatically picks up fonts from the `src/assets/fonts/` directory specified in `react-native.config.js`.

No additional configuration needed for Android.

## iOS Configuration

iOS requires fonts to be:

1. Linked to the Xcode project (done via react-native-asset)
2. Declared in Info.plist UIAppFonts array (already configured)

The linking was done using:

```bash
npx react-native-asset ./src/assets/fonts/ --ios-path ./ios
```

## Troubleshooting

### Fonts Not Appearing

**iOS:**

1. Verify fonts are in `ios/Vinsta/Fonts/` directory
2. Check Info.plist has UIAppFonts key with font filenames
3. Clean build: `rm -rf ~/Library/Developer/Xcode/DerivedData/*`
4. Rebuild: `npx react-native run-ios`

**Android:**

1. Verify fonts are in `src/assets/fonts/`
2. Verify react-native.config.js assets path is correct
3. Rebuild: `npx react-native run-android`

### Font Weight Not Working

Make sure to cast fontWeight as `any`:

```typescript
fontWeight: '600' as any; // ✓ Correct
fontWeight: '600'; // ✗ TypeScript error
```

## Global Font Usage

To use Figtree fonts globally throughout the app, import and apply FONT_STYLES in:

- Screen components
- Card components
- List item components
- Modal components
- Any other Text rendering component

## Best Practices

1. **Always use FONT_STYLES** from colors.ts for consistency
2. **Don't hardcode font names** - use FONT_FAMILY constants
3. **Don't hardcode font sizes** - use predefined styles
4. **Use font weights for emphasis**, not just color or size
5. **Test on both iOS and Android** before committing changes
6. **Update FONT_STYLES** when creating new global text variations

---

For more questions, refer to the Figtree font documentation or React Native Text documentation.
