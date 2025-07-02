// components/repository/RepositoryCloneSection.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Repository } from '../../types/repository';
import { useModernTheme } from '@/context/ThemeContext';

interface RepositoryCloneSectionProps {
  repository: Repository;
}

export const RepositoryCloneSection: React.FC<RepositoryCloneSectionProps> = ({ repository }) => {
  const { colors, shadows } = useModernTheme();

  const handleCloneUrl = (url: string, type: 'HTTPS' | 'SSH') => {
    Alert.alert(
      `Clone Repository (${type})`,
      url,
      [
        { text: 'Copy', onPress: () => {/* Implement clipboard copy */} },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const sectionStyles = StyleSheet.create({
    container: {
      backgroundColor: colors.surface.primary,
      marginTop: 8,
      padding: 16,
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text.primary,
      marginBottom: 12,
    },
    cloneButton: {
      backgroundColor: colors.surface.secondary,
      padding: 12,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border.primary,
      marginBottom: 8,
    },
    cloneButtonLast: {
      marginBottom: 0,
    },
    cloneTitle: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.text.primary,
      marginBottom: 4,
    },
    cloneUrl: {
      fontSize: 12,
      color: colors.text.secondary,
      fontFamily: 'monospace',
    },
  });

  return (
    <View style={sectionStyles.container}>
      <Text style={sectionStyles.title}>
        Clone Repository
      </Text>
      
      <TouchableOpacity 
        style={sectionStyles.cloneButton}
        onPress={() => handleCloneUrl(repository.clone_url, 'HTTPS')}
      >
        <Text style={sectionStyles.cloneTitle}>Clone with HTTPS</Text>
        <Text style={sectionStyles.cloneUrl}>{repository.clone_url}</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[sectionStyles.cloneButton, sectionStyles.cloneButtonLast]}
        onPress={() => handleCloneUrl(repository.ssh_url, 'SSH')}
      >
        <Text style={sectionStyles.cloneTitle}>Clone with SSH</Text>
        <Text style={sectionStyles.cloneUrl}>{repository.ssh_url}</Text>
      </TouchableOpacity>
    </View>
  );
};