// components/readme/ReadmeTab.tsx
import React from 'react';
import { View } from 'react-native';
import { Repository } from '../../types/repository';
import { ReadmeSection } from './ReadmeSection';
import { useModernTheme } from '@/context/ThemeContext';

interface ReadmeTabProps {
  repository: Repository;
}

export const ReadmeTab: React.FC<ReadmeTabProps> = ({ repository }) => {
  const { colors } = useModernTheme();

  return (
    <View 
      style={{
        flex: 1,
        backgroundColor: colors.background.secondary,
        padding: 16,
      }}
    >
      <ReadmeSection repository={repository} />
    </View>
  );
};