// components/repository/RepositoryDetailHeader.tsx
import React from 'react';
import { View, Text, Alert, Share, Linking, StyleSheet } from 'react-native';
import { Repository } from '../../types/repository';
import { Button } from '../ui/Button';
import { useModernTheme } from '@/context/ThemeContext';

interface RepositoryDetailHeaderProps {
  repository: Repository;
}

export const RepositoryDetailHeader: React.FC<RepositoryDetailHeaderProps> = ({ repository }) => {
  const { colors } = useModernTheme();

  const handleOpenInBrowser = async () => {
    try {
      await Linking.openURL(repository.html_url);
    } catch (error) {
      Alert.alert('Error', 'Failed to open repository in browser');
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${repository.full_name} on GitHub: ${repository.html_url}`,
        url: repository.html_url,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const headerStyles = StyleSheet.create({
    container: {
      backgroundColor: colors.surface.primary,
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border.primary,
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
      flexWrap: 'wrap',
    },
    ownerText: {
      fontSize: 20,
      color: colors.text.secondary,
      fontWeight: '500',
    },
    repoNameText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text.primary,
    },
    buttonContainer: {
      flexDirection: 'row',
      gap: 8,
    },
  });

  return (
    <View style={headerStyles.container}>
      <View style={headerStyles.titleContainer}>
        <Text style={headerStyles.ownerText}>{repository.owner.login}</Text>
        <Text style={headerStyles.repoNameText}>/{repository.name}</Text>
      </View>
      
      <View style={headerStyles.buttonContainer}>
        <Button variant="secondary" onPress={handleShare}>
          Share
        </Button>
        
        <Button variant="primary" onPress={handleOpenInBrowser}>
          View on GitHub
        </Button>
      </View>
    </View>
  );
};
