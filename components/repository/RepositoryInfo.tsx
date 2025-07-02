// components/repository/RepositoryInfo.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Repository } from '../../types/repository';
import { formatFileSize } from '../../utils/formatters';
import { useModernTheme } from '@/context/ThemeContext';

interface RepositoryInfoProps {
  repository: Repository;
}

interface InfoRowProps {
  label: string;
  value: string;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => {
  const { colors } = useModernTheme();

  const rowStyles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 4,
    },
    label: {
      fontSize: 14,
      color: colors.text.secondary,
      fontWeight: '500',
    },
    value: {
      fontSize: 14,
      color: colors.text.primary,
      textAlign: 'right',
      flex: 1,
      marginLeft: 16,
    },
  });

  return (
    <View style={rowStyles.container}>
      <Text style={rowStyles.label}>{label}</Text>
      <Text style={rowStyles.value}>{value}</Text>
    </View>
  );
};

export const RepositoryInfo: React.FC<RepositoryInfoProps> = ({ repository }) => {
  const { colors } = useModernTheme();

  const infoStyles = StyleSheet.create({
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
    infoContainer: {
      gap: 8,
    },
  });

  return (
    <View style={infoStyles.container}>
      <Text style={infoStyles.title}>
        Repository Information
      </Text>
      
      <View style={infoStyles.infoContainer}>
        <InfoRow label="Language" value={repository.language || 'Not specified'} />
        <InfoRow label="Default Branch" value={repository.default_branch} />
        <InfoRow label="Size" value={formatFileSize(repository.size)} />
        <InfoRow label="License" value={repository.license?.name || 'No license'} />
        <InfoRow label="Created" value={new Date(repository.created_at).toLocaleDateString()} />
        <InfoRow label="Last Updated" value={new Date(repository.updated_at).toLocaleDateString()} />
        <InfoRow label="Last Pushed" value={new Date(repository.pushed_at).toLocaleDateString()} />
      </View>
    </View>
  );
};
