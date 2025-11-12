# Figtree Font Setup - Complete Setup Summary

## Date: November 11, 2025

### What Was Done

#### 1. ✅ Font Files Verified

- Location: `src/assets/fonts/`
- Files:
  - `Figtree-VariableFont_wght.ttf` (Regular)
  - `Figtree-Italic-VariableFont_wght.ttf` (Italic)

#### 2. ✅ React Native Configuration Updated

- **File**: `react-native.config.js`
- **Status**: Already correct
- **Path**: `./src/assets/fonts/`

#### 3. ✅ Font Definitions Created

- **File**: `src/theme/colors.ts`
- **Added**:
  - `FONT_FAMILY` constants
  - `FONT_WEIGHT` constants (400, 500, 600, 700, 900)
  - `FONT_STYLES` object with 16 predefined styles:
    - 3 Large titles (largeTitle, title1, title2, title3)
    - 1 Headline style
    - 4 Body styles (body, bodyMedium, bodySemibold, bodyItalic)
    - 3 Callout styles (callout, calloutMedium, calloutSemibold)
    - 3 Caption styles (caption, captionMedium, captionSemibold)
    - 1 Italic caption style

#### 4. ✅ iOS Configuration

- **File**: `ios/Vinsta/Info.plist`
- **Added**: UIAppFonts array with font filenames
- **Command Run**: `npx react-native-asset ./src/assets/fonts/ --ios-path ./ios`

#### 5. ✅ Font Linking Completed

- Fonts linked to iOS Xcode project
- Fonts linked to Android project
- No additional Android configuration needed

#### 6. ✅ Component Example Updated

- **File**: `src/components/AppButton.tsx`
- **Updated**: Now uses `FONT_STYLES.bodyMedium` instead of hardcoded styles

#### 7. ✅ Documentation Created

- `src/theme/FONT_USAGE_GUIDE.md` - Complete usage guide with examples

---

## NPM Commands Used

```bash
# Install dependencies (verify all packages)
npm install

# Link fonts to both iOS and Android
npx react-native-asset ./src/assets/fonts/ --ios-path ./ios
```

---

## How to Use Fonts in Your Project

### Import in any component:

```typescript
import { FONT_STYLES, FONT_FAMILY, COLORS } from '../theme/colors';
```

### Apply to Text components:

```typescript
const styles = StyleSheet.create({
  heading: {
    ...FONT_STYLES.headline,
    color: COLORS.primary,
  },
  body: {
    ...FONT_STYLES.body,
    color: COLORS.textDark,
  },
});
```

---

## Font Styles Available

| Style           | Size | Weight | Italic? |
| --------------- | ---- | ------ | ------- |
| largeTitle      | 32px | 700    | No      |
| title1          | 28px | 700    | No      |
| title2          | 24px | 600    | No      |
| title3          | 20px | 600    | No      |
| headline        | 18px | 600    | No      |
| body            | 16px | 400    | No      |
| bodyMedium      | 16px | 500    | No      |
| bodySemibold    | 16px | 600    | No      |
| bodyItalic      | 16px | 400    | Yes     |
| callout         | 14px | 400    | No      |
| calloutMedium   | 14px | 500    | No      |
| calloutSemibold | 14px | 600    | No      |
| caption         | 12px | 400    | No      |
| captionMedium   | 12px | 500    | No      |
| captionSemibold | 12px | 600    | No      |
| captionItalic   | 12px | 400    | Yes     |

---

## Custom Font Weights

You can use any weight from 400 to 900:

```typescript
fontWeight: '400' as any; // Normal
fontWeight: '500' as any; // Medium
fontWeight: '600' as any; // SemiBold
fontWeight: '700' as any; // Bold
fontWeight: '900' as any; // ExtraBold
```

---

## Files Modified

1. ✅ `src/theme/colors.ts` - Added font definitions
2. ✅ `ios/Vinsta/Info.plist` - Added UIAppFonts
3. ✅ `src/components/AppButton.tsx` - Example of font usage
4. ✅ Created `src/theme/FONT_USAGE_GUIDE.md` - Complete documentation

---

## Next Steps

1. **Update all Text components** in your app to use FONT_STYLES
2. **Search for hardcoded fonts** in your codebase:

   ```bash
   grep -r "fontFamily" src/ --include="*.tsx" --include="*.ts"
   grep -r "fontSize" src/ --include="*.tsx" --include="*.ts"
   ```

3. **Test on both platforms**:

   ```bash
   # iOS
   npx react-native run-ios

   # Android
   npx react-native run-android
   ```

4. **Key files to update**:
   - `src/AuthScreens/` - All screens
   - `src/components/HomeScreen/` - All home components
   - `src/components/MyOrders/` - Orders components
   - `src/components/Notification/` - Notification components
   - `src/components/Profile/` - Profile components
   - `src/components/Wishlist/` - Wishlist components

---

## Verification Checklist

- [x] Font files present in `src/assets/fonts/`
- [x] `react-native.config.js` configured correctly
- [x] Font definitions in `src/theme/colors.ts`
- [x] iOS Info.plist updated with UIAppFonts
- [x] Fonts linked to iOS project
- [x] Fonts linked to Android project
- [x] npm dependencies installed
- [ ] Test on iOS device/simulator
- [ ] Test on Android device/simulator
- [ ] Update all components in the app
- [ ] Verify all fonts are rendering correctly

---

## Troubleshooting

If fonts don't appear after rebuilding:

**iOS:**

```bash
rm -rf ios/Pods
rm -rf ~/Library/Developer/Xcode/DerivedData/*
cd ios && pod install && cd ..
npx react-native run-ios
```

**Android:**

```bash
cd android && ./gradlew clean && cd ..
npx react-native run-android
```

---

## Support

Refer to `src/theme/FONT_USAGE_GUIDE.md` for detailed usage examples and best practices.
