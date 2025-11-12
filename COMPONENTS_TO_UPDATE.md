# Components to Update - Action List

Complete this checklist to integrate Figtree fonts throughout your Vinsta app.

---

## 📋 Update Checklist

### ✅ ALREADY UPDATED

- [x] `src/theme/colors.ts` - Font definitions added
- [x] `src/components/AppButton.tsx` - Updated to use fonts
- [x] `ios/Vinsta/Info.plist` - UIAppFonts configured
- [x] `react-native.config.js` - Assets path correct

### ⏳ NEED TO UPDATE

#### Authentication Screens

- [ ] `src/AuthScreens/SplashScreen.tsx`
- [ ] `src/AuthScreens/WelcomeScreen.tsx`
- [ ] `src/AuthScreens/Onboarding1.tsx`
- [ ] `src/AuthScreens/Onboarding2.tsx`
- [ ] `src/AuthScreens/Onboarding3.tsx`
- [ ] `src/AuthScreens/SignInScreen.tsx`
- [ ] `src/AuthScreens/OtpVerificationScreen.tsx`

#### Home Screen Components

- [ ] `src/components/HomeScreen/HomeScreen.tsx`
- [ ] `src/components/HomeScreen/search/` - All files
- [ ] `src/components/HomeScreen/bestBurger.tsx`
- [ ] `src/components/HomeScreen/featuredRestrorents.tsx`
- [ ] `src/components/HomeScreen/todayOfferView.tsx`
- [ ] `src/components/HomeScreen/Cart.tsx`
- [ ] `src/components/HomeScreen/ChangeLocation.tsx`

#### Orders Components

- [ ] `src/components/MyOrders/myorders.tsx`

#### Notification Components

- [ ] `src/components/Notification/notification.tsx`

#### Profile Components & Settings

- [ ] `src/components/Profile/profile.tsx`
- [ ] `src/components/Profile/profileEdit.tsx`
- [ ] `src/components/Profile/address.tsx`
- [ ] `src/components/Profile/favourite.tsx`
- [ ] `src/components/Profile/myOrder.tsx`
- [ ] `src/components/Profile/myOffer.tsx`
- [ ] `src/components/Profile/wallet.tsx`
- [ ] `src/components/Profile/refer.tsx`
- [ ] `src/components/Profile/subscription.tsx`
- [ ] `src/components/Profile/help.tsx`
- [ ] `src/components/Profile/support.tsx`
- [ ] `src/components/Profile/DarkMode.tsx`
- [ ] `src/components/Profile/Settings/` - All settings files

#### Wishlist Components

- [ ] `src/components/Wishlist/wishlist.tsx`

#### Navigation Files

- [ ] `src/navigation/AppNavigator.tsx`
- [ ] `src/navigation/BottomTabNavigator.tsx`

#### Other Screens

- [ ] `src/Payment/PaymentScreen.tsx`
- [ ] `src/Payment/PaymentSuccess.tsx`

---

## 🔄 Update Pattern

For each file, follow this pattern:

### 1. Add Import

```typescript
import { COLORS, FONT_STYLES } from '../theme/colors';
// OR if deeper in folder:
import { COLORS, FONT_STYLES } from '../../theme/colors';
// OR if much deeper:
import { COLORS, FONT_STYLES } from '../../../theme/colors';
```

### 2. Replace Hardcoded Styles

**Before:**

```typescript
const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
  body: {
    fontSize: 16,
    color: '#666666',
  },
});
```

**After:**

```typescript
const styles = StyleSheet.create({
  title: {
    ...FONT_STYLES.title2, // 24px, SemiBold
    color: COLORS.textDark,
  },
  body: {
    ...FONT_STYLES.body, // 16px, Normal
    color: COLORS.textLight,
  },
});
```

### 3. Find & Replace Strategy

Use your editor's find and replace to make updates faster:

**Find hardcoded font sizes:**

```
fontSize: \d+
```

Replace with appropriate FONT_STYLE

**Find hardcoded colors:**

```
color: ['#\w+|rgba\([^)]+\)']
```

Replace with COLORS constants

---

## 📝 Template for Each Component

```typescript
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONT_STYLES } from '../../theme/colors'; // Adjust path

interface ComponentProps {
  // your props
}

const MyComponent: React.FC<ComponentProps> = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Title</Text>
      <Text style={styles.body}>Body text</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: COLORS.secondary,
  },
  title: {
    ...FONT_STYLES.title2,
    color: COLORS.textDark,
  },
  body: {
    ...FONT_STYLES.body,
    color: COLORS.textLight,
  },
});

export default MyComponent;
```

---

## 🎨 Font Style Selection Guide

Choose the right font style for each component:

### Titles & Headers

- Large feature title → `FONT_STYLES.largeTitle` (32px, Bold)
- Screen title → `FONT_STYLES.title1` or `title2` (28px or 24px, Bold)
- Section heading → `FONT_STYLES.title3` (20px, SemiBold)
- Card heading → `FONT_STYLES.headline` (18px, SemiBold)

### Body & Content

- Main content text → `FONT_STYLES.body` (16px, Normal)
- Button text → `FONT_STYLES.bodyMedium` (16px, Medium)
- Emphasized text → `FONT_STYLES.bodySemibold` (16px, SemiBold)
- Italic content → `FONT_STYLES.bodyItalic` (16px, Normal, Italic)

### Secondary Text

- Meta information → `FONT_STYLES.callout` (14px, Normal)
- Semi-important → `FONT_STYLES.calloutMedium` (14px, Medium)
- Important callout → `FONT_STYLES.calloutSemibold` (14px, SemiBold)

### Small Text & Labels

- Helper text → `FONT_STYLES.caption` (12px, Normal)
- Important label → `FONT_STYLES.captionMedium` (12px, Medium)
- Emphasized label → `FONT_STYLES.captionSemibold` (12px, SemiBold)
- Italic caption → `FONT_STYLES.captionItalic` (12px, Normal, Italic)

---

## ⚡ Quick Find & Replace

### In VS Code:

1. **Open Find and Replace**: Ctrl+H
2. **Find pattern for old fonts**:
   ```
   fontWeight: '?bold'|fontSize: 16
   ```
3. **Replace with FONT_STYLES.body**

### Common Replacements:

| Find                               | Replace With                |
| ---------------------------------- | --------------------------- |
| `fontSize: 32, fontWeight: 'bold'` | `...FONT_STYLES.largeTitle` |
| `fontSize: 28, fontWeight: 'bold'` | `...FONT_STYLES.title1`     |
| `fontSize: 24, fontWeight: 'bold'` | `...FONT_STYLES.title2`     |
| `fontSize: 20, fontWeight: '600'`  | `...FONT_STYLES.title3`     |
| `fontSize: 18, fontWeight: '600'`  | `...FONT_STYLES.headline`   |
| `fontSize: 16`                     | `...FONT_STYLES.body`       |
| `fontSize: 14`                     | `...FONT_STYLES.callout`    |
| `fontSize: 12`                     | `...FONT_STYLES.caption`    |

---

## 🧪 Testing After Updates

For each file updated:

1. **Check TypeScript** - No errors in the file
2. **Visual test** - Run on iOS and Android
3. **Font rendering** - Text appears in Figtree font
4. **All weights** - Bold, normal, medium text appears correctly
5. **Colors** - Text colors match design

---

## 💡 Pro Tips

1. **Use Spread Operator**: `...FONT_STYLES.body` applies all properties at once
2. **Override When Needed**:

   ```typescript
   title: {
     ...FONT_STYLES.body,
     fontSize: 20,  // Override just the size
     color: COLORS.primary,
   }
   ```

3. **Combine with Colors**:

   ```typescript
   title: {
     ...FONT_STYLES.title2,
     color: COLORS.primary,  // Always add color separately
   }
   ```

4. **Test on Device**: Fonts may render differently on iOS vs Android

---

## 📊 Progress Tracking

Update this section as you complete files:

```
Authentication Screens: 0/7 ⬜
Home Components: 0/7 ⬜
Orders: 0/1 ⬜
Notifications: 0/1 ⬜
Profile: 0/13 ⬜
Wishlist: 0/1 ⬜
Navigation: 0/2 ⬜
Payment: 0/2 ⬜
Total: 0/34 files
```

---

## 📚 Reference Files

- **Font Definitions**: `src/theme/colors.ts`
- **Usage Guide**: `src/theme/FONT_USAGE_GUIDE.md`
- **Template Component**: `src/components/FONT_TEMPLATE.tsx`
- **Setup Summary**: `FONT_SETUP_SUMMARY.md`
- **Commands Guide**: `FONT_COMMANDS_GUIDE.md`

---

Good luck with your updates! 🚀
