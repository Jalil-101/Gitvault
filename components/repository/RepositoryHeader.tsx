// components/repository/RepositoryHeader.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Repository } from '../../types/repository';
import { Badge } from '../ui/Badge';
import { useModernTheme } from '@/context/ThemeContext';

interface RepositoryHeaderProps {
  repository: Repository;
}

export const RepositoryHeader: React.FC<RepositoryHeaderProps> = ({ repository }) => {
  const { colors } = useModernTheme();

  const headerStyles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    repoName: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.status.info.main,
      flex: 1,
    },
  });

  return (
    <View style={headerStyles.container}>
      <Text style={headerStyles.repoName} numberOfLines={1}>
        {repository.name}
      </Text>
      <Badge variant={repository.private ? 'warning' : 'success'}>
        {repository.private ? 'Private' : 'Public'}
      </Badge>
    </View>
  );
};
