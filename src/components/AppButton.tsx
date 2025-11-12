// This file will contain reusable UI components (e.g., Button, Input, etc.)
// Example placeholder component:
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, FONT_STYLES } from '../theme/colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
}

const AppButton: React.FC<ButtonProps> = ({ title, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
    shadowColor: COLORS.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  text: {
    color: COLORS.secondary,
    ...FONT_STYLES.bodyMedium,
  },
});

export default AppButton;
