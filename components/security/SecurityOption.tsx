// components/security/SecurityOption.tsx
import { useModernTheme } from '@/context/ThemeContext';
import { AlertTriangle, CheckCircle, ChevronRight } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SecurityOptionProps {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  action?: string;
  status?: {
    type: 'success' | 'warning';
    text: string;
  };
  onPress?: () => void;
  rightElement?: React.ReactNode;
}

export function SecurityOption({ 
  icon: Icon, 
  title, 
  description, 
  action, 
  status, 
  onPress, 
  rightElement 
}: SecurityOptionProps) {
  const { colors, shadows } = useModernTheme();

  return (
    <TouchableOpacity 
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: colors.surface.secondary,
          borderColor: colors.border.primary,
          ...shadows.sm,
        }
      ]}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={[
          styles.iconContainer,
          { backgroundColor: colors.surface.elevated }
        ]}>
          <Icon size={20} color={colors.accents.blue.main} />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: colors.text.primary }]}>
            {title}
          </Text>
          <Text style={[styles.description, { color: colors.text.secondary }]}>
            {description}
          </Text>
          {status && (
            <View style={styles.statusContainer}>
              {status.type === 'success' && (
                <CheckCircle size={16} color={colors.status.success.main} />
              )}
              {status.type === 'warning' && (
                <AlertTriangle size={16} color={colors.status.warning.main} />
              )}
              <Text style={[
                styles.statusText,
                {
                  color: status.type === 'success' 
                    ? colors.status.success.text 
                    : colors.status.warning.text
                }
              ]}>
                {status.text}
              </Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.rightContainer}>
        {action && (
          <TouchableOpacity 
            style={[
              styles.actionButton,
              { backgroundColor: colors.status.success.main }
            ]}
            activeOpacity={0.8}
          >
            <Text style={[styles.actionButtonText, { color: colors.text.inverse }]}>
              {action}
            </Text>
          </TouchableOpacity>
        )}
        {rightElement || <ChevronRight size={20} color={colors.text.quaternary} />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 12,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  iconContainer: {
    padding: 8,
    borderRadius: 8,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    marginTop: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  statusText: {
    fontSize: 12,
    marginLeft: 4,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 8,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
