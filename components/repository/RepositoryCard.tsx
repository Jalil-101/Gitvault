// components/repository/RepositoryCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Repository } from '../../types/repository';
import { RepositoryHeader } from './RepositoryHeader';
import { RepositoryStats } from './RepositoryStats';
import { formatDate } from '../../utils/formatters';
import { useModernTheme } from '@/context/ThemeContext';

interface RepositoryCardProps {
  repository: Repository;
}

export const RepositoryCard: React.FC<RepositoryCardProps> = ({ repository }) => {
  const router = useRouter();
  const { colors, shadows } = useModernTheme();

  const handlePress = () => {
    router.push({
      pathname: '../repository/[id]',
      params: {
        id: repository.id.toString(),
        repositoryData: JSON.stringify(repository)
      }
    });
  };

  const cardStyles = StyleSheet.create({
    card: {
      backgroundColor: colors.surface.primary,
      padding: 16,
      marginHorizontal: 16,
      marginVertical: 4,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border.primary,
      ...shadows.sm,
    },
    description: {
      color: colors.text.secondary,
      fontSize: 14,
      lineHeight: 20,
      marginBottom: 12,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    updatedText: {
      fontSize: 12,
      color: colors.text.tertiary,
    },
  });

  return (
    <TouchableOpacity style={cardStyles.card} onPress={handlePress}>
      <RepositoryHeader repository={repository} />
      
      {repository.description && (
        <Text style={cardStyles.description} numberOfLines={2}>
          {repository.description}
        </Text>
      )}
      
      <View style={cardStyles.footer}>
        <RepositoryStats repository={repository} />
        <Text style={cardStyles.updatedText}>
          Updated {formatDate(repository.updated_at)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
