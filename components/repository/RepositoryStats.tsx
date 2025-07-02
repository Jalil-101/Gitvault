// components/repository/RepositoryStats.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Repository } from '../../types/repository';
import { LanguageDot } from '../ui/LanguageDot';
import { formatNumber } from '../../utils/formatters';
import { useModernTheme } from '@/context/ThemeContext';

interface RepositoryStatsProps {
  repository: Repository;
}

export const RepositoryStats: React.FC<RepositoryStatsProps> = ({ repository }) => {
  const { colors } = useModernTheme();

  const statsStyles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    statItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 16,
    },
    statText: {
      fontSize: 12,
      color: colors.text.tertiary,
    },
    languageContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 16,
    },
    languageText: {
      fontSize: 12,
      color: colors.text.tertiary,
    },
  });

  return (
    <View style={statsStyles.container}>
      {repository.language && (
        <View style={statsStyles.languageContainer}>
          <LanguageDot language={repository.language} />
          <Text style={statsStyles.languageText}>{repository.language}</Text>
        </View>
      )}
      
      <View style={statsStyles.statItem}>
        <Text style={statsStyles.statText}>⭐ {formatNumber(repository.stargazers_count)}</Text>
      </View>
      
      <View style={statsStyles.statItem}>
        <Text style={statsStyles.statText}>🍴 {formatNumber(repository.forks_count)}</Text>
      </View>
    </View>
  );
};