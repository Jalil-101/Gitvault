// components/repository/RepositoryTopics.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Repository } from '../../types/repository';
import { useModernTheme } from '@/context/ThemeContext';

interface RepositoryTopicsProps {
  repository: Repository;
}

export const RepositoryTopics: React.FC<RepositoryTopicsProps> = ({ repository }) => {
  const { colors } = useModernTheme();

  if (!repository.topics || repository.topics.length === 0) {
    return null;
  }

  const topicsStyles = StyleSheet.create({
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
    topicsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    topicBadge: {
      backgroundColor: colors.status.info.light,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.status.info.main,
    },
    topicText: {
      fontSize: 12,
      color: colors.status.info.text,
      fontWeight: '500',
    },
  });

  return (
    <View style={topicsStyles.container}>
      <Text style={topicsStyles.title}>Topics</Text>
      <View style={topicsStyles.topicsContainer}>
        {repository.topics.map((topic, index) => (
          <View key={index} style={topicsStyles.topicBadge}>
            <Text style={topicsStyles.topicText}>{topic}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};