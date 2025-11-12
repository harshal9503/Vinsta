# 🎯 FIGTREE FONTS - QUICK REFERENCE CARD

## IMPORT

```typescript
import { COLORS, FONT_STYLES, FONT_FAMILY } from '../theme/colors';
// Adjust path: ../../ or ../../../ as needed
```

---

## FONT STYLES (Copy-Paste Ready)

### Titles

```typescript
...FONT_STYLES.largeTitle      // 32px, 700 (bold)
...FONT_STYLES.title1          // 28px, 700 (bold)
...FONT_STYLES.title2          // 24px, 600 (semibold)
...FONT_STYLES.title3          // 20px, 600 (semibold)
```

### Headings & Body

```typescript
...FONT_STYLES.headline        // 18px, 600 (semibold)
...FONT_STYLES.body            // 16px, 400 (normal)
...FONT_STYLES.bodyMedium      // 16px, 500 (medium)
...FONT_STYLES.bodySemibold    // 16px, 600 (semibold)
...FONT_STYLES.bodyItalic      // 16px, 400 (italic)
```

### Small Text

```typescript
...FONT_STYLES.callout         // 14px, 400 (normal)
...FONT_STYLES.calloutMedium   // 14px, 500 (medium)
...FONT_STYLES.calloutSemibold // 14px, 600 (semibold)
...FONT_STYLES.caption         // 12px, 400 (normal)
...FONT_STYLES.captionMedium   // 12px, 500 (medium)
...FONT_STYLES.captionSemibold // 12px, 600 (semibold)
...FONT_STYLES.captionItalic   // 12px, 400 (italic)
```

---

## QUICK COMPONENT TEMPLATE

```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONT_STYLES } from '../theme/colors';

const MyComponent = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Title</Text>
    <Text style={styles.body}>Body text</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { ...FONT_STYLES.title2, color: COLORS.textDark },
  body: { ...FONT_STYLES.body, color: COLORS.textLight },
});

export default MyComponent;
```

---

## COMMON PATTERNS

### Card Component

```typescript
card: { padding: 16, backgroundColor: COLORS.secondary, borderRadius: 12 },
cardTitle: { ...FONT_STYLES.headline, color: COLORS.primary, marginBottom: 8 },
cardBody: { ...FONT_STYLES.body, color: COLORS.textDark, marginBottom: 4 },
cardMeta: { ...FONT_STYLES.caption, color: COLORS.textLight },
```

### Button

```typescript
button: {
  backgroundColor: COLORS.primary,
  padding: 12,
  borderRadius: 8
},
buttonText: {
  ...FONT_STYLES.bodyMedium,  // Weight 500
  color: COLORS.secondary
},
```

### List Item

```typescript
item: { padding: 12, borderBottomColor: COLORS.accent, borderBottomWidth: 1 },
itemTitle: { ...FONT_STYLES.body, color: COLORS.textDark, marginBottom: 4 },
itemSubtitle: { ...FONT_STYLES.caption, color: COLORS.textLight },
```

---

## COLORS REFERENCE

```typescript
COLORS.primary; // #E5752F (orange)
COLORS.secondary; // #FFFFFF (white)
COLORS.background; // #F9F9F9 (light gray)
COLORS.textDark; // #1E1E1E (dark text)
COLORS.textLight; // #666666 (light text)
COLORS.accent; // #FFE8D6 (light orange)
COLORS.cardShadow; // rgba(0,0,0,0.1)
```

---

## WEIGHT CHART

| Weight    | Value | Usage                 |
| --------- | ----- | --------------------- |
| Normal    | 400   | Body text, captions   |
| Medium    | 500   | Button text, callouts |
| SemiBold  | 600   | Headlines, titles     |
| Bold      | 700   | Large titles          |
| ExtraBold | 900   | Heavy emphasis        |

---

## CUSTOM WEIGHT (If Needed)

```typescript
fontWeight: '400' as any; // Normal
fontWeight: '500' as any; // Medium
fontWeight: '600' as any; // SemiBold
fontWeight: '700' as any; // Bold
fontWeight: '900' as any; // ExtraBold
```

---

## FONT FAMILY (If Needed)

```typescript
FONT_FAMILY.regular; // 'Figtree-VariableFont_wght'
FONT_FAMILY.italic; // 'Figtree-Italic-VariableFont_wght'
```

---

## COMMON MISTAKES ❌ → ✅

❌ `fontWeight: '600'`  
✅ `fontWeight: '600' as any`

❌ `fontSize: 16, fontWeight: '600', color: '#000'`  
✅ `...FONT_STYLES.bodySemibold, color: COLORS.textDark`

❌ `fontFamily: 'Figtree-VariableFont_wght'`  
✅ `...FONT_STYLES.body` (includes family automatically)

❌ Color in theme, font in component  
✅ Both from theme/colors.ts

---

## TESTING CHECKLIST

- [ ] No TypeScript errors
- [ ] Text visible on iOS
- [ ] Text visible on Android
- [ ] Font looks like Figtree (rounded, friendly)
- [ ] Weights are visually distinct
- [ ] Colors are correct

---

## USEFUL COMMANDS

```bash
# Start development
npm start

# Run on iOS
npx react-native run-ios

# Run on Android
npx react-native run-android

# Check TypeScript
npx tsc --noEmit

# Search hardcoded sizes
grep -r "fontSize:" src/ --include="*.tsx"
```

---

## 📚 FULL DOCUMENTATION

- `README_FONTS.md` - Complete overview
- `FONT_USAGE_GUIDE.md` - Detailed examples
- `COMPONENTS_TO_UPDATE.md` - File checklist
- `src/components/FONT_TEMPLATE.tsx` - Template component

---

**Print this card and keep it handy while updating components!** 🚀
