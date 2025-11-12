# 🚀 FIGTREE FONTS - IMPLEMENTATION GUIDE

## Overview

This guide walks you through updating your React Native components to use the Figtree font system. Follow this step-by-step approach for consistency across your app.

---

## STEP 1: Identify Component Type

Before updating, identify what type of component you're working with:

### Screen Components

- Located in `src/AuthScreens/` and `src/components/*/`
- Usually have multiple Text elements with different sizes
- Often use multiple font sizes and weights

### Small Components

- Located in `src/components/`
- Usually have 1-3 Text elements
- Simple styling patterns

### Navigation Files

- Located in `src/navigation/`
- Minimal text styling
- Usually just one or two styles needed

---

## STEP 2: Update Process (5 Minutes Per File)

### A. Add Import

```typescript
// Add at the top with other imports
import { COLORS, FONT_STYLES } from '../theme/colors';
// Adjust path based on folder depth:
// - One level up: '../theme/colors'
// - Two levels up: '../../theme/colors'
// - Three levels up: '../../../theme/colors'
```

### B. Find All StyleSheets

```typescript
// Look for lines like:
const styles = StyleSheet.create({
  // ... styles here
});
```

### C. Update Each Style

Replace hardcoded font properties with FONT_STYLES spread:

**Before:**

```typescript
title: {
  fontSize: 24,
  fontWeight: 'bold',
  color: '#1E1E1E',
  marginBottom: 8,
}
```

**After:**

```typescript
title: {
  ...FONT_STYLES.title2,        // Replaces fontSize, fontWeight, fontFamily
  color: COLORS.textDark,        // Use color constants
  marginBottom: 8,               // Keep other properties
}
```

### D. Test Component

Run on device to verify fonts display correctly.

---

## STEP 3: Font Style Selection

### Decision Tree for Choosing Font Style

```
Is it a main heading?
├─ Yes, very large (feature) → largeTitle (32px, 700)
├─ Yes, screen title → title1 (28px, 700)
├─ Yes, section title → title2 (24px, 600)
├─ Yes, small heading → title3 (20px, 600)
└─ Yes, card heading → headline (18px, 600)

Is it main body text?
├─ Yes, regular → body (16px, 400)
├─ Yes, button text → bodyMedium (16px, 500)
├─ Yes, emphasized → bodySemibold (16px, 600)
└─ Yes, italic → bodyItalic (16px, 400, italic)

Is it secondary/meta text?
├─ Yes, 14px regular → callout (14px, 400)
├─ Yes, 14px medium → calloutMedium (14px, 500)
└─ Yes, 14px bold → calloutSemibold (14px, 600)

Is it small text/labels?
├─ Yes, 12px regular → caption (12px, 400)
├─ Yes, 12px medium → captionMedium (12px, 500)
└─ Yes, 12px bold → captionSemibold (12px, 600)
```

---

## STEP 4: Before & After Examples

### Example 1: Simple Screen Component

**BEFORE:**

```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MyScreen = () => (
  <View style={styles.container}>
    <Text style={styles.heading}>My Heading</Text>
    <Text style={styles.body}>This is the body text content</Text>
    <Text style={styles.small}>Supporting text</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#F9F9F9' },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 16,
  },
  body: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 8,
    lineHeight: 24,
  },
  small: {
    fontSize: 12,
    color: '#999999',
  },
});

export default MyScreen;
```

**AFTER:**

```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONT_STYLES } from '../theme/colors'; // Add this import

const MyScreen = () => (
  <View style={styles.container}>
    <Text style={styles.heading}>My Heading</Text>
    <Text style={styles.body}>This is the body text content</Text>
    <Text style={styles.small}>Supporting text</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: COLORS.background, // Use color constant
  },
  heading: {
    ...FONT_STYLES.title2, // 24px, SemiBold, Figtree
    color: COLORS.textDark, // Use color constant
    marginBottom: 16,
  },
  body: {
    ...FONT_STYLES.body, // 16px, Normal, Figtree, lineHeight included
    color: COLORS.textLight, // Use color constant
    marginBottom: 8,
  },
  small: {
    ...FONT_STYLES.caption, // 12px, Normal, Figtree
    color: COLORS.textLight, // Use color constant
  },
});

export default MyScreen;
```

### Example 2: Card Component

**BEFORE:**

```typescript
interface CardProps {
  title: string;
  subtitle: string;
  price: string;
}

const FoodCard: React.FC<CardProps> = ({ title, subtitle, price }) => (
  <View style={styles.card}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.subtitle}>{subtitle}</Text>
    <Text style={styles.price}>{price}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E5752F',
    marginTop: 8,
  },
});
```

**AFTER:**

```typescript
import { COLORS, FONT_STYLES } from '../../theme/colors'; // Add import

interface CardProps {
  title: string;
  subtitle: string;
  price: string;
}

const FoodCard: React.FC<CardProps> = ({ title, subtitle, price }) => (
  <View style={styles.card}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.subtitle}>{subtitle}</Text>
    <Text style={styles.price}>{price}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
  },
  title: {
    ...FONT_STYLES.headline,
    color: COLORS.textDark,
  },
  subtitle: {
    ...FONT_STYLES.callout,
    color: COLORS.textLight,
    marginTop: 4,
  },
  price: {
    ...FONT_STYLES.bodySemibold,
    color: COLORS.primary,
    marginTop: 8,
  },
});
```

### Example 3: Button Component

**BEFORE:**

```typescript
interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}

const CustomButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
}) => (
  <TouchableOpacity
    style={[styles.button, variant === 'secondary' && styles.secondary]}
    onPress={onPress}
  >
    <Text
      style={[styles.text, variant === 'secondary' && styles.secondaryText]}
    >
      {title}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#E5752F',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondary: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5752F',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  secondaryText: {
    color: '#E5752F',
  },
});
```

**AFTER:**

```typescript
import { COLORS, FONT_STYLES } from '../theme/colors'; // Add import

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}

const CustomButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
}) => (
  <TouchableOpacity
    style={[styles.button, variant === 'secondary' && styles.secondary]}
    onPress={onPress}
  >
    <Text
      style={[styles.text, variant === 'secondary' && styles.secondaryText]}
    >
      {title}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondary: {
    backgroundColor: COLORS.secondary,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  text: {
    ...FONT_STYLES.bodyMedium,
    color: COLORS.secondary,
  },
  secondaryText: {
    color: COLORS.primary,
  },
});
```

---

## STEP 5: Common Patterns

### Pattern 1: Screen with Header & List

```typescript
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  header: {
    ...FONT_STYLES.title1,
    color: COLORS.textDark,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  listItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomColor: COLORS.accent,
    borderBottomWidth: 1,
  },
  itemTitle: { ...FONT_STYLES.body, color: COLORS.textDark, marginBottom: 4 },
  itemMeta: { ...FONT_STYLES.caption, color: COLORS.textLight },
});
```

### Pattern 2: Modal/Dialog Content

```typescript
const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: COLORS.secondary,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
  },
  title: { ...FONT_STYLES.headline, color: COLORS.textDark, marginBottom: 12 },
  message: { ...FONT_STYLES.body, color: COLORS.textLight, marginBottom: 16 },
  buttonText: { ...FONT_STYLES.bodyMedium, color: COLORS.secondary },
});
```

### Pattern 3: Form Input Labels

```typescript
const styles = StyleSheet.create({
  label: { ...FONT_STYLES.callout, color: COLORS.textDark, marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: COLORS.accent,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  helper: { ...FONT_STYLES.caption, color: COLORS.textLight, marginTop: 4 },
});
```

---

## STEP 6: Verification Checklist

After updating each component:

- [ ] Import statement added
- [ ] All `fontSize` properties replaced with `FONT_STYLES`
- [ ] All `fontWeight` properties removed (included in FONT_STYLES)
- [ ] All hardcoded colors replaced with `COLORS` constants
- [ ] No TypeScript errors in file
- [ ] Component compiles without errors
- [ ] Text displays in Figtree font on iOS
- [ ] Text displays in Figtree font on Android

---

## STEP 7: Recommended Update Order

### Priority 1 (Do First)

1. `src/components/AppButton.tsx` ✅ Already done
2. `src/components/HomeScreen/HomeScreen.tsx` - Main screen
3. `src/components/Profile/profile.tsx` - Main profile

### Priority 2 (Do Second)

4. All auth screens (7 files)
5. All profile sub-screens (10 files)

### Priority 3 (Do Last)

6. Smaller components and navigation

---

## STEP 8: Testing Strategy

### After Each Component Update

```bash
# Check TypeScript
npx tsc --noEmit

# Visual test on device
npx react-native run-ios
# or
npx react-native run-android
```

### After Batch of Updates

1. Test on iPhone simulator
2. Test on Android emulator
3. Verify font rendering quality
4. Check for any console warnings

---

## STEP 9: Tracking Progress

Use the checklist in `COMPONENTS_TO_UPDATE.md` to track which files you've completed.

---

## STEP 10: Troubleshooting During Update

### "Cannot find module" Error

**Check**: Import path is correct

```typescript
// From: src/components/HomeScreen/HomeScreen.tsx
import { COLORS, FONT_STYLES } from '../../theme/colors'; // ✅ Two levels up
```

### TypeScript Error with fontWeight

**Solution**: Always cast as `any`

```typescript
fontWeight: '600' as any; // ✅ Correct
```

### Fonts Look Different

**Check**:

1. Did you use spread operator? `...FONT_STYLES.body`
2. Did you reload the app? `npx react-native run-ios --reset-cache`
3. Are fonts actually linked? Check `react-native.config.js`

### Styles Look Wrong After Update

**Compare** with `FONT_TEMPLATE.tsx` to ensure correct pattern usage

---

## QUICK START: Update Your First Component

1. Open `src/components/HomeScreen/HomeScreen.tsx`
2. Add import at top: `import { COLORS, FONT_STYLES } from '../../theme/colors';`
3. Find the `StyleSheet.create({` section
4. For each style that has `fontSize` or `fontWeight`:
   - Add `...FONT_STYLES.body` (or appropriate style)
   - Replace hardcoded `color` with `COLORS.textDark` (or appropriate color)
5. Save and test: `npx react-native run-ios`

You're done! Repeat for other components.

---

**Total Time Estimate**: ~30-40 minutes for all components  
**Difficulty**: Easy (just copy & paste patterns)  
**Support**: Check `FONT_TEMPLATE.tsx` for reference
