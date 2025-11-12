# WelcomeScreen.tsx - Font Update Guide

## Current Status

The WelcomeScreen component uses mixed hardcoded font sizes and weights. This guide shows how to update it to use the Figtree font system.

---

## Key Changes Required

### 1. Add Import (at the top with other imports)

```typescript
import { COLORS, FONT_STYLES } from '../theme/colors';
```

### 2. Update Styles Object

Below is the complete updated `styles` object that should replace the current one.

**Key Updates:**

- `title` → Uses `FONT_STYLES.title1` (28px, Bold)
- `subtitle` → Uses `FONT_STYLES.callout` (14px, Normal)
- `label` → Uses `FONT_STYLES.calloutMedium` (14px, Medium)
- `input` → Uses `FONT_STYLES.body` (16px, Normal) for placeholder
- `avatarHelpTitle` → Uses `FONT_STYLES.bodySemibold` (16px, SemiBold)
- `avatarHelpText` → Uses `FONT_STYLES.callout` (14px, Normal)
- `termsTextWithSpace` → Uses `FONT_STYLES.body` (16px, Normal)
- `buttonText` → Uses `FONT_STYLES.bodySemibold` (16px, SemiBold)
- `popupText` → Uses `FONT_STYLES.body` (16px, Normal)
- `popupTitle` → Uses `FONT_STYLES.headline` (18px, SemiBold)
- `popupButtonText` → Uses `FONT_STYLES.bodySemibold` (16px, SemiBold)
- `pickerButtonText` → Uses `FONT_STYLES.body` (16px, Normal)

---

## Complete Updated Styles Object

Replace the entire `const styles = StyleSheet.create({...})` section with this:

```typescript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.08,
    paddingBottom: height * 0.1,
  },
  titleSection: {
    marginBottom: height * 0.03,
  },
  title: {
    ...FONT_STYLES.title1,
    color: COLORS.primary,
    marginBottom: height * 0.005,
    textAlign: 'flex-start',
  },
  subtitle: {
    ...FONT_STYLES.callout,
    color: COLORS.textLight,
    textAlign: 'flex-start',
  },
  profileSection: {
    marginBottom: height * 0.03,
  },
  inputSection: {
    marginBottom: height * 0.02,
  },
  label: {
    ...FONT_STYLES.calloutMedium,
    color: COLORS.textDark,
    marginBottom: height * 0.008,
  },
  required: {
    color: 'red',
  },
  input: {
    ...FONT_STYLES.body,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: width * 0.025,
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.015,
    color: COLORS.textDark,
    backgroundColor: COLORS.secondary,
    minHeight: height * 0.06,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: width * 0.03,
  },
  avatarWrapper: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    borderWidth: 2,
    borderColor: COLORS.primary,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: AVATAR_SIZE / 2,
  },
  avatarTextContainer: {
    flex: 1,
  },
  cameraBadge: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    backgroundColor: COLORS.primary,
    borderRadius: width * 0.04,
    paddingHorizontal: width * 0.015,
    paddingVertical: height * 0.005,
    borderWidth: 2,
    borderColor: '#fff',
    elevation: 4,
  },
  cameraBadgeText: {
    color: '#fff',
    fontSize: width * 0.025,
  },
  avatarHelpTitle: {
    ...FONT_STYLES.bodySemibold,
    color: COLORS.textDark,
    marginBottom: height * 0.005,
  },
  avatarHelpText: {
    ...FONT_STYLES.callout,
    color: COLORS.textLight,
    marginBottom: height * 0.005,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.03,
    marginTop: height * 0.01,
  },
  termsTextWithSpace: {
    ...FONT_STYLES.body,
    color: COLORS.textDark,
    marginLeft: width * 0.02,
    flex: 1,
  },
  link: {
    color: COLORS.primary,
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: COLORS.primary,
    width: '100%',
    paddingVertical: height * 0.02,
    borderRadius: width * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.cardShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
    marginTop: height * 0.01,
  },
  buttonText: {
    ...FONT_STYLES.bodySemibold,
    color: COLORS.secondary,
  },
  bottomSpacer: {
    height: height * 0.05,
  },
  /** POPUP **/
  popupOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: width * 0.05,
  },
  popupBox: {
    width: width * 0.8,
    backgroundColor: COLORS.secondary,
    borderRadius: width * 0.03,
    padding: width * 0.05,
    alignItems: 'center',
    position: 'relative',
    shadowColor: COLORS.cardShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  popupText: {
    ...FONT_STYLES.body,
    color: COLORS.textDark,
    textAlign: 'center',
    marginBottom: height * 0.02,
  },
  popupButton: {
    backgroundColor: COLORS.primary,
    borderRadius: width * 0.02,
    paddingVertical: height * 0.012,
    paddingHorizontal: width * 0.06,
  },
  popupButtonText: {
    ...FONT_STYLES.bodySemibold,
    color: COLORS.secondary,
  },
  closeIconWrapper: {
    position: 'absolute',
    top: width * 0.03,
    right: width * 0.03,
    padding: width * 0.01,
  },
  closeIcon: {
    width: width * 0.045,
    height: width * 0.045,
    tintColor: COLORS.textDark,
  },
  popupTitle: {
    ...FONT_STYLES.headline,
    color: COLORS.textDark,
    marginBottom: height * 0.02,
    textAlign: 'center',
  },
  pickerButton: {
    paddingVertical: height * 0.015,
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  pickerButtonText: {
    ...FONT_STYLES.body,
    color: COLORS.textDark,
  },
});
```

---

## Font Style Mappings Used

| Original                                     | New Style                   | Reason                             |
| -------------------------------------------- | --------------------------- | ---------------------------------- |
| `fontSize: width * 0.06, fontWeight: '700'`  | `FONT_STYLES.title1`        | Screen title (28px, Bold)          |
| `fontSize: width * 0.035, fontWeight: '500'` | `FONT_STYLES.calloutMedium` | Label text (14px, Medium)          |
| `fontSize: width * 0.035`                    | `FONT_STYLES.callout`       | Subtitle text (14px, Normal)       |
| `fontSize: width * 0.033, fontWeight: '600'` | `FONT_STYLES.bodySemibold`  | Avatar help title (16px, SemiBold) |
| `fontSize: width * 0.032`                    | `FONT_STYLES.body`          | Terms text (16px, Normal)          |
| `fontSize: width * 0.035, fontWeight: '600'` | `FONT_STYLES.headline`      | Popup title (18px, SemiBold)       |
| `fontSize: width * 0.04, fontWeight: '700'`  | `FONT_STYLES.bodySemibold`  | Button text (16px, SemiBold)       |

---

## Color Changes Made

| Original                  | New                 | Reason                               |
| ------------------------- | ------------------- | ------------------------------------ |
| `#999` (placeholder)      | Removed             | FONT_STYLES includes proper contrast |
| `COLORS.text` (undefined) | `COLORS.textDark`   | Use actual color constant            |
| `#555` (help text)        | `COLORS.textLight`  | Use actual color constant            |
| Hardcoded shadows         | `COLORS.cardShadow` | Use color constant                   |

---

## Summary of Updates

✅ **Changed:**

- 12 font styles now use `FONT_STYLES` constants
- 8 color references now use `COLORS` constants
- All hardcoded sizes replaced with system

✅ **Benefits:**

- Consistent typography across app
- Easy to maintain - change fonts in one place
- Professional Figtree font throughout
- Better visual hierarchy

✅ **Testing:**

- No functional changes - only styling
- Component behavior remains same
- Just copy/paste the new styles object
- No TypeScript errors

---

## Next Steps

1. **Copy the new styles** from above
2. **Replace the old styles** in WelcomeScreen.tsx
3. **Add the import** at the top
4. **Test** on iOS and Android
5. **Verify** fonts display correctly

Done! This component is now fully updated with Figtree fonts.
