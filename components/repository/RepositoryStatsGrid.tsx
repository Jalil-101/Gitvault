// components/repository/RepositoryStatsGrid.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Repository } from '../../types/repository';
import { StatCard } from '../ui/StatCard';
import { formatNumber } from '../../utils/formatters';
import { useModernTheme } from '@/context/ThemeContext';

interface RepositoryStatsGridProps {
  repository: Repository;
}

export const RepositoryStatsGrid: React.FC<RepositoryStatsGridProps> = ({ repository }) => {
  const { colors } = useModernTheme();

  const gridStyles = StyleSheet.create({
    container: {
      backgroundColor: colors.surface.primary,
      marginTop: 8,
      padding: 16,
    },
    grid: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
  });

  return (
    <View style={gridStyles.container}>
      <View style={gridStyles.grid}>
        <StatCard 
          value={formatNumber(repository.stargazers_count)} 
          label="Stars" 
        />
        <StatCard 
          value={formatNumber(repository.watchers_count)} 
          label="Watching" 
        />
        <StatCard 
          value={formatNumber(repository.forks_count)} 
          label="Forks" 
        />
        <StatCard 
          value={formatNumber(repository.open_issues_count)} 
          label="Issues" 
        />
      </View>
    </View>
  );
};
