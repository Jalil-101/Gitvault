// components/security/PasswordInput.tsx
import { useModernTheme } from '@/context/ThemeContext';
import { Eye, EyeOff } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface PasswordInputProps {
  label: string;
  placeholder: string;
  show: boolean;
  onToggleShow: () => void;
  value: string;
  onChangeText: (text: string) => void;
}

export function PasswordInput({ 
  label, 
  placeholder, 
  show, 
  onToggleShow, 
  value, 
  onChangeText 
}: PasswordInputProps) {
  const { colors } = useModernTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text.tertiary }]}>
        {label}
      </Text>
      <View style={styles.inputWrapper}>
        <TextInput
          secureTextEntry={!show}
          placeholder={placeholder}
          placeholderTextColor={colors.text.quaternary}
          value={value}
          onChangeText={onChangeText}
          style={[
            styles.input,
            {
              backgroundColor: colors.surface.secondary,
              borderColor: colors.border.primary,
              color: colors.text.primary,
            }
          ]}
        />
        <TouchableOpacity
          onPress={onToggleShow}
          style={styles.eyeButton}
          activeOpacity={0.7}
        >
          {show ? (
            <EyeOff size={20} color={colors.text.quaternary} />
          ) : (
            <Eye size={20} color={colors.text.quaternary} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  inputWrapper: {
    position: 'relative',
  },
  input: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 8,
    paddingRight: 48,
    fontSize: 16,
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
    top: '50%',
    marginTop: -10,
  },
});
