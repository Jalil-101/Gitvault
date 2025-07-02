// components/readme/ReadmeSection.tsx
import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Repository } from '../../types/repository';
import { useReadme } from '../../hooks/useReadme';
import { ReadmeRenderer } from './ReadmeRenderer';
import { readmeService } from '../../services/readmeService';
import { useModernTheme } from '@/context/ThemeContext';
import { useStatusColors } from '@/hooks/useThemeColor';

interface ReadmeSectionProps {
  repository: Repository;
}

export const ReadmeSection: React.FC<ReadmeSectionProps> = ({ repository }) => {
  const { readme, loading, error, refetch } = useReadme(repository.full_name);
  const { colors, shadows } = useModernTheme();
  const statusColors = useStatusColors();

  if (loading) {
    return (
      <View 
        style={{
          backgroundColor: colors.surface.primary,
          marginTop: 8,
          padding: 16,
          borderRadius: 12,
          ...shadows.sm,
        }}
      >
        <Text 
          style={{
            fontSize: 16,
            fontWeight: '600',
            color: colors.text.primary,
            marginBottom: 12,
          }}
        >
          README
        </Text>
        <View 
          style={{
            backgroundColor: colors.surface.secondary,
            padding: 16,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 80,
          }}
        >
          <ActivityIndicator 
            size="small" 
            color={colors.interactive.primary} 
            style={{ marginBottom: 8 }} 
          />
          <Text 
            style={{
              color: colors.text.tertiary,
              fontSize: 14,
            }}
          >
            Loading README...
          </Text>
        </View>
      </View>
    );
  }

  if (error || !readme) {
    return (
      <View 
        style={{
          backgroundColor: colors.surface.primary,
          marginTop: 8,
          padding: 16,
          borderRadius: 12,
          ...shadows.sm,
        }}
      >
        <Text 
          style={{
            fontSize: 16,
            fontWeight: '600',
            color: colors.text.primary,
            marginBottom: 12,
          }}
        >
          README
        </Text>
        <View 
          style={{
            backgroundColor: statusColors.error.light,
            padding: 16,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: statusColors.error.main,
          }}
        >
          <Text 
            style={{
              color: statusColors.error.text,
              textAlign: 'center',
              marginBottom: 12,
              fontSize: 14,
              fontWeight: '500',
            }}
          >
            {error || 'README not found'}
          </Text>
          <TouchableOpacity 
            style={{
              backgroundColor: statusColors.error.main,
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 6,
              alignSelf: 'center',
              ...shadows.sm,
            }}
            onPress={refetch}
            activeOpacity={0.8}
          >
            <Text 
              style={{
                color: colors.text.inverse,
                textAlign: 'center',
                fontWeight: '600',
                fontSize: 14,
              }}
            >
              Retry
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const decodedContent = readmeService.decodeContent(readme);

  return (
    <View 
      style={{
        backgroundColor: colors.surface.primary,
        marginTop: 8,
        flex: 1,
        borderRadius: 12,
        overflow: 'hidden',
        ...shadows.md,
      }}
    >
      <View 
        style={{
          padding: 16,
          borderBottomWidth: 1,
          borderBottomColor: colors.border.primary,
          backgroundColor: colors.surface.secondary,
        }}
      >
        <Text 
          style={{
            fontSize: 16,
            fontWeight: '600',
            color: colors.text.primary,
          }}
        >
          README.md
        </Text>
      </View>
      <ReadmeRenderer content={decodedContent} />
    </View>
  );
};