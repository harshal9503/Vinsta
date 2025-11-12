# 🎯 FIGTREE FONTS - COMPLETE SETUP GUIDE

**Project**: Vinsta (React Native App)  
**Date**: November 11, 2025  
**Status**: ✅ COMPLETE AND READY TO USE

---

## 📌 EXECUTIVE SUMMARY

Your React Native project is now fully configured to use **Figtree** variable fonts throughout the application. The fonts support weights from 400 (normal) to 900 (extra bold), allowing you to create visual hierarchy without relying on multiple font files.

---

## ✅ WHAT'S BEEN COMPLETED

### 1. **Font Files Setup**

- ✅ Font files location: `src/assets/fonts/`
- ✅ Files:
  - `Figtree-VariableFont_wght.ttf` (Regular)
  - `Figtree-Italic-VariableFont_wght.ttf` (Italic)

### 2. **Configuration Files**

- ✅ `react-native.config.js` - Verified and correct
- ✅ `ios/Vinsta/Info.plist` - UIAppFonts array added
- ✅ Android config - Auto-linked via react-native.config.js

### 3. **Font Definitions**

- ✅ `src/theme/colors.ts` - Complete font system added:
  - `FONT_FAMILY` - Font family constants
  - `FONT_WEIGHT` - Weight constants (400-900)
  - `FONT_STYLES` - 16 predefined font styles

### 4. **Font Linking**

- ✅ iOS fonts linked to Xcode project
- ✅ Android fonts linked to project
- ✅ npm dependencies verified

### 5. **Documentation**

- ✅ `FONT_USAGE_GUIDE.md` - Detailed usage guide
- ✅ `FONT_SETUP_SUMMARY.md` - Setup summary
- ✅ `FONT_COMMANDS_GUIDE.md` - All commands
- ✅ `COMPONENTS_TO_UPDATE.md` - Update checklist
- ✅ `src/components/FONT_TEMPLATE.tsx` - Component template

### 6. **Example Component**

- ✅ `src/components/AppButton.tsx` - Updated to use fonts

---

## 🚀 QUICK START

### 1. Install & Link (Already Done)

```bash
npm install
npx react-native-asset ./src/assets/fonts/ --ios-path ./ios
```

### 2. Run Your App

```bash
# iOS
npx react-native run-ios

# Android
npx react-native run-android
```

### 3. Use Fonts in Components

```typescript
import { COLORS, FONT_STYLES } from '../theme/colors';

const styles = StyleSheet.create({
  title: {
    ...FONT_STYLES.title2, // 24px, SemiBold (600)
    color: COLORS.textDark,
  },
  body: {
    ...FONT_STYLES.body, // 16px, Normal (400)
    color: COLORS.textLight,
  },
});
```

---

## 📚 AVAILABLE FONT STYLES

| Style             | Size | Weight | Italic? | Use Case             |
| ----------------- | ---- | ------ | ------- | -------------------- |
| `largeTitle`      | 32px | 700    | No      | Large feature titles |
| `title1`          | 28px | 700    | No      | Main screen titles   |
| `title2`          | 24px | 600    | No      | Secondary titles     |
| `title3`          | 20px | 600    | No      | Section headings     |
| `headline`        | 18px | 600    | No      | Card headings        |
| `body`            | 16px | 400    | No      | Main content         |
| `bodyMedium`      | 16px | 500    | No      | Button text          |
| `bodySemibold`    | 16px | 600    | No      | Emphasized text      |
| `bodyItalic`      | 16px | 400    | Yes     | Italic content       |
| `callout`         | 14px | 400    | No      | Meta text            |
| `calloutMedium`   | 14px | 500    | No      | Semi-important       |
| `calloutSemibold` | 14px | 600    | No      | Important callout    |
| `caption`         | 12px | 400    | No      | Small labels         |
| `captionMedium`   | 12px | 500    | No      | Important labels     |
| `captionSemibold` | 12px | 600    | No      | Bold labels          |
| `captionItalic`   | 12px | 400    | Yes     | Italic captions      |

---

## 💡 USAGE EXAMPLES

### Basic Title and Body

```typescript
import { Text, StyleSheet } from 'react-native';
import { COLORS, FONT_STYLES } from '../theme/colors';

const MyScreen = () => (
  <>
    <Text style={styles.title}>My Title</Text>
    <Text style={styles.body}>This is body text</Text>
  </>
);

const styles = StyleSheet.create({
  title: {
    ...FONT_STYLES.title2,
    color: COLORS.textDark,
  },
  body: {
    ...FONT_STYLES.body,
    color: COLORS.textLight,
  },
});
```

### Card Component

```typescript
const CardComponent = () => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>Card Heading</Text>
    <Text style={styles.cardBody}>Card content goes here</Text>
    <Text style={styles.cardMeta}>Supporting text</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
  },
  cardTitle: {
    ...FONT_STYLES.headline,
    color: COLORS.primary,
    marginBottom: 8,
  },
  cardBody: {
    ...FONT_STYLES.body,
    color: COLORS.textDark,
    marginBottom: 4,
  },
  cardMeta: {
    ...FONT_STYLES.caption,
    color: COLORS.textLight,
  },
});
```

### Button Text

```typescript
const styles = StyleSheet.create({
  buttonText: {
    ...FONT_STYLES.bodyMedium, // 16px, Weight 500
    color: COLORS.secondary,
  },
  buttonLabel: {
    ...FONT_STYLES.calloutMedium, // 14px, Weight 500
    color: COLORS.primary,
  },
});
```

### Custom Weights

```typescript
// When you need a specific weight not covered by predefined styles
const styles = StyleSheet.create({
  customBold: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: 18,
    fontWeight: '900' as any, // Extra bold
  },
  customMedium: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: 16,
    fontWeight: '500' as any, // Medium
  },
});
```

---

## 📂 PROJECT STRUCTURE

```
Vinsta/
├── 📄 react-native.config.js                    ✅ Correct
├── 📄 FONT_SETUP_SUMMARY.md                     ← Read this
├── 📄 FONT_USAGE_GUIDE.md                       ← Detailed guide
├── 📄 FONT_COMMANDS_GUIDE.md                    ← Commands
├── 📄 COMPONENTS_TO_UPDATE.md                   ← Update checklist
│
├── src/
│   ├── assets/fonts/                            ✅
│   │   ├── Figtree-VariableFont_wght.ttf
│   │   └── Figtree-Italic-VariableFont_wght.ttf
│   │
│   ├── theme/
│   │   ├── colors.ts                            ✅ FONT_STYLES added
│   │   ├── FONT_USAGE_GUIDE.md                  ← Reference
│   │   └── ThemeContext.tsx
│   │
│   ├── components/
│   │   ├── AppButton.tsx                        ✅ Updated
│   │   ├── FONT_TEMPLATE.tsx                    ← Copy this pattern
│   │   ├── HomeScreen/                          ⏳ Needs updating
│   │   ├── Profile/                             ⏳ Needs updating
│   │   ├── MyOrders/                            ⏳ Needs updating
│   │   ├── Notification/                        ⏳ Needs updating
│   │   └── Wishlist/                            ⏳ Needs updating
│   │
│   └── AuthScreens/                             ⏳ Needs updating
│
├── ios/
│   └── Vinsta/
│       ├── Info.plist                           ✅ UIAppFonts added
│       └── Fonts/                               ✅ Files linked
│
└── android/
    └── app/src/assets/fonts/                    ✅ Auto-linked
```

---

## 🔧 DEVELOPMENT WORKFLOW

### Step 1: Open Component

```bash
# Example: src/components/HomeScreen/HomeScreen.tsx
```

### Step 2: Import Font Styles

```typescript
import { COLORS, FONT_STYLES } from '../../theme/colors';
```

### Step 3: Replace Hardcoded Styles

**Before:**

```typescript
title: {
  fontSize: 24,
  fontWeight: 'bold',
  color: '#1E1E1E',
}
```

**After:**

```typescript
title: {
  ...FONT_STYLES.title2,
  color: COLORS.textDark,
}
```

### Step 4: Test

```bash
npx react-native run-ios
# or
npx react-native run-android
```

---

## 📋 NEXT STEPS - YOUR ACTION ITEMS

### Phase 1: Update Core Components (Today)

- [ ] `src/components/AppButton.tsx` ✅ DONE
- [ ] `src/components/HomeScreen/HomeScreen.tsx`
- [ ] `src/components/Profile/profile.tsx`

### Phase 2: Update Screen Components (This Week)

- [ ] All `src/AuthScreens/` files (7 files)
- [ ] All `src/components/HomeScreen/` files (7 files)
- [ ] All `src/components/Profile/` files (13 files)

### Phase 3: Update Remaining Components (This Week)

- [ ] `src/components/MyOrders/`
- [ ] `src/components/Notification/`
- [ ] `src/components/Wishlist/`
- [ ] `src/Payment/` screens
- [ ] `src/navigation/` files

### Phase 4: Testing & QA

- [ ] Test on iOS simulator
- [ ] Test on Android emulator
- [ ] Test on real devices
- [ ] Verify font rendering on different screen sizes

---

## 🎨 DESIGN GUIDELINES

### Color + Font Combination

```typescript
// Primary Heading
heading: {
  ...FONT_STYLES.title1,
  color: COLORS.primary,
}

// Secondary Heading
subheading: {
  ...FONT_STYLES.headline,
  color: COLORS.textDark,
}

// Supporting Text
support: {
  ...FONT_STYLES.caption,
  color: COLORS.textLight,
}
```

### Button Styling

```typescript
// Primary Button
primaryButton: {
  ...FONT_STYLES.bodyMedium,  // Semi-bold text
  color: COLORS.secondary,
  backgroundColor: COLORS.primary,
}

// Secondary Button
secondaryButton: {
  ...FONT_STYLES.body,        // Normal weight
  color: COLORS.primary,
}
```

---

## 🐛 TROUBLESHOOTING

### Fonts Not Showing (iOS)

```bash
rm -rf ios/Pods
rm -rf ~/Library/Developer/Xcode/DerivedData/*
cd ios && pod install && cd ..
npx react-native run-ios
```

### Fonts Not Showing (Android)

```bash
cd android && ./gradlew clean && cd ..
npx react-native run-android
```

### TypeScript Errors with fontWeight

Make sure to use `as any`:

```typescript
fontWeight: '600' as any; // ✅ Correct
fontWeight: '600'; // ❌ Error
```

### Can't Find Colors Import

Check your relative import path:

```typescript
import { COLORS, FONT_STYLES } from '../theme/colors'; // 1 level up
import { COLORS, FONT_STYLES } from '../../theme/colors'; // 2 levels up
import { COLORS, FONT_STYLES } from '../../../theme/colors'; // 3 levels up
```

---

## 📞 QUICK REFERENCE

### Font Imports

```typescript
import { COLORS, FONT_STYLES, FONT_FAMILY, FONT_WEIGHT } from '../theme/colors';
```

### All Available Weights

```typescript
fontWeight: '400' as any; // Normal
fontWeight: '500' as any; // Medium
fontWeight: '600' as any; // SemiBold
fontWeight: '700' as any; // Bold
fontWeight: '900' as any; // ExtraBold
```

### Quick Style Mapping

```
32px, Bold       → largeTitle
28px, Bold       → title1
24px, SemiBold   → title2
20px, SemiBold   → title3
18px, SemiBold   → headline
16px, Normal     → body
16px, Medium     → bodyMedium
16px, SemiBold   → bodySemibold
14px, Normal     → callout
14px, Medium     → calloutMedium
14px, SemiBold   → calloutSemibold
12px, Normal     → caption
12px, Medium     → captionMedium
12px, SemiBold   → captionSemibold
```

---

## 📊 PROJECT STATUS

| Component          | Status      | Files |
| ------------------ | ----------- | ----- |
| Configuration      | ✅ Complete | 3/3   |
| Font Definitions   | ✅ Complete | 1/1   |
| Documentation      | ✅ Complete | 4/4   |
| Examples           | ✅ Complete | 2/2   |
| **App Components** | ⏳ Pending  | 0/34  |

---

## 🎯 SUCCESS CRITERIA

After completing all updates:

- [ ] All Text components use `FONT_STYLES`
- [ ] No hardcoded font sizes in app
- [ ] No hardcoded font weights in app
- [ ] All colors use `COLORS` constants
- [ ] App runs on iOS without font errors
- [ ] App runs on Android without font errors
- [ ] Fonts render correctly on all screen sizes
- [ ] No TypeScript errors in entire app

---

## 📞 SUPPORT & REFERENCES

1. **Detailed Usage Guide**: See `src/theme/FONT_USAGE_GUIDE.md`
2. **Component Template**: See `src/components/FONT_TEMPLATE.tsx`
3. **Update Checklist**: See `COMPONENTS_TO_UPDATE.md`
4. **Commands Reference**: See `FONT_COMMANDS_GUIDE.md`
5. **Font Definitions**: See `src/theme/colors.ts`

---

## ✨ HIGHLIGHTS

- ✅ **Variable Font Family**: Single font file with all weights (400-900)
- ✅ **Consistent Typography**: All styles defined in one place
- ✅ **Easy Maintenance**: Change fonts globally by updating one file
- ✅ **Better Performance**: One font file instead of multiple
- ✅ **Professional Design**: Proper font sizing and weighting hierarchy
- ✅ **Both Platforms**: Fully configured for iOS and Android

---

**You're all set! 🚀 Start updating your components and enjoy the beautiful Figtree fonts in your app!**

For questions, refer to the detailed guides in the project root and `src/theme/` directory.
