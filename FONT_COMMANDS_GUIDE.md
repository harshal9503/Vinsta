# Figtree Fonts - Installation & Commands Guide

## ✅ Setup Status: COMPLETE

All Figtree fonts have been properly configured for your React Native project.

---

## 📦 NPM Commands

### 1. Install Dependencies

```bash
npm install
```

**Status**: ✅ Already ran successfully - all packages up to date

### 2. Link Fonts to Both Platforms

```bash
npx react-native-asset ./src/assets/fonts/ --ios-path ./ios
```

**Status**: ✅ Already completed

This command:

- Links fonts to iOS Xcode project
- Links fonts to Android project
- Creates necessary directory structure

---

## 🏃 Running Your App

### iOS

```bash
npx react-native run-ios
```

Or with specific device:

```bash
npx react-native run-ios --device "iPhone 14"
```

### Android

```bash
npx react-native run-android
```

---

## 🔧 Build & Clean Commands

### iOS - Clean & Rebuild

```bash
rm -rf ios/Pods
rm -rf ~/Library/Developer/Xcode/DerivedData/*
cd ios && pod install && cd ..
npx react-native run-ios
```

### Android - Clean & Rebuild

```bash
cd android
./gradlew clean
cd ..
npx react-native run-android
```

### Full Clean (Both Platforms)

```bash
rm -rf ios/Pods
rm -rf ~/Library/Developer/Xcode/DerivedData/*
cd android && ./gradlew clean && cd ..
npm start -- --reset-cache
```

---

## 📂 Project Structure

```
Vinsta/
├── react-native.config.js          ✅ Configured
├── src/
│   ├── assets/
│   │   └── fonts/
│   │       ├── Figtree-VariableFont_wght.ttf          ✅
│   │       └── Figtree-Italic-VariableFont_wght.ttf   ✅
│   ├── theme/
│   │   ├── colors.ts               ✅ Font definitions added
│   │   ├── FONT_USAGE_GUIDE.md     ✅ Detailed guide
│   │   └── ThemeContext.tsx
│   └── components/
│       ├── AppButton.tsx           ✅ Updated to use fonts
│       └── FONT_TEMPLATE.tsx       ✅ Template for other components
├── ios/
│   ├── Vinsta/
│   │   ├── Info.plist              ✅ UIAppFonts added
│   │   └── Fonts/                  ✅ Fonts linked by react-native-asset
│   └── Vinsta.xcodeproj/
├── android/
│   └── app/
│       └── src/
│           └── assets/
│               └── fonts/          ✅ Auto-linked
└── FONT_SETUP_SUMMARY.md           ✅ This setup summary
```

---

## 🎯 Font Configuration Details

### react-native.config.js

```javascript
module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./src/assets/fonts/'], // ✅ Correct path
};
```

### iOS Info.plist

```xml
<key>UIAppFonts</key>
<array>
  <string>Figtree-VariableFont_wght.ttf</string>
  <string>Figtree-Italic-VariableFont_wght.ttf</string>
</array>
```

### Font Names for Usage

- Regular: `Figtree-VariableFont_wght`
- Italic: `Figtree-Italic-VariableFont_wght`

---

## 💻 Quick Start Commands

### Fresh Start (Recommended)

```bash
cd d:\Vinsta
npm install
npx react-native run-ios
```

### For Development

```bash
npm start
```

Then in another terminal:

```bash
npx react-native run-ios
# OR
npx react-native run-android
```

---

## 🐛 Troubleshooting Commands

### Check if fonts are linked (iOS)

```bash
grep -r "Figtree" ios/
```

### Check if fonts are in assets (Android)

```bash
find src/assets/fonts -type f
```

### Verify font paths in config

```bash
cat react-native.config.js
```

### Check npm installation

```bash
npm list react-native
npm list
```

---

## 📋 Font Styles Reference

### From `colors.ts`:

```typescript
import { FONT_STYLES, FONT_FAMILY, COLORS } from '../theme/colors';

// Available styles:
FONT_STYLES.largeTitle; // 32px, Bold
FONT_STYLES.title1; // 28px, Bold
FONT_STYLES.title2; // 24px, SemiBold
FONT_STYLES.title3; // 20px, SemiBold
FONT_STYLES.headline; // 18px, SemiBold
FONT_STYLES.body; // 16px, Normal
FONT_STYLES.bodyMedium; // 16px, Medium
FONT_STYLES.bodySemibold; // 16px, SemiBold
FONT_STYLES.bodyItalic; // 16px, Normal (Italic)
FONT_STYLES.callout; // 14px, Normal
FONT_STYLES.calloutMedium; // 14px, Medium
FONT_STYLES.calloutSemibold; // 14px, SemiBold
FONT_STYLES.caption; // 12px, Normal
FONT_STYLES.captionMedium; // 12px, Medium
FONT_STYLES.captionSemibold; // 12px, SemiBold
FONT_STYLES.captionItalic; // 12px, Normal (Italic)
```

---

## 📚 Next Steps

1. **Update all components** to use `FONT_STYLES` from `colors.ts`
2. **Follow the template** in `src/components/FONT_TEMPLATE.tsx`
3. **Test on both platforms** (iOS & Android)
4. **Reference guide**: See `src/theme/FONT_USAGE_GUIDE.md`

### Files to Update:

- [ ] `src/AuthScreens/*.tsx` - All auth screens
- [ ] `src/components/HomeScreen/*.tsx` - Home components
- [ ] `src/components/MyOrders/*.tsx` - Orders
- [ ] `src/components/Notification/*.tsx` - Notifications
- [ ] `src/components/Profile/*.tsx` - Profile screens
- [ ] `src/components/Wishlist/*.tsx` - Wishlist

---

## ✨ Verification

After updating your app, verify fonts are working:

1. **Check console** for font loading errors
2. **Visual verification** - text should display in Figtree font
3. **Test on real device** for font rendering

Expected Font Names in Device Inspector:

- iOS: "Figtree-VariableFont_wght"
- Android: "Figtree-VariableFont_wght"

---

## 📞 Support

- Complete usage guide: `src/theme/FONT_USAGE_GUIDE.md`
- Component template: `src/components/FONT_TEMPLATE.tsx`
- Setup summary: `FONT_SETUP_SUMMARY.md`
- Font definitions: `src/theme/colors.ts`

---

**Setup Completed**: November 11, 2025
**Project**: Vinsta (React Native)
**Font**: Figtree (Variable Font Family)
**Supported Weights**: 400, 500, 600, 700, 900
