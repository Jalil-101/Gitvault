// Updated Repository Detail Screen with README Tab
// app/repository/[id].tsx
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Alert, StatusBar } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Repository } from '../../types/repository';
import { RepositoryDetailHeader } from '../../components/repository/RepositoryDetailHeader';
import { RepositoryStatsGrid } from '../../components/repository/RepositoryStatsGrid';
import { RepositoryInfo } from '../../components/repository/RepositoryInfo';
import { RepositoryTopics } from '../../components/repository/RepositoryTopics';
import { RepositoryCloneSection } from '../../components/repository/RepositoryCloneSection';
import { ReadmeTab } from '../../components/readme/ReadmeTab';
import { Button } from '../../components/ui/Button';
import { useModernTheme } from '../../context/ThemeContext';
import { useThemeClasses } from '../../hooks/useThemeColor';

type TabType = 'overview' | 'readme';

export default function RepositoryDetailScreen() {
  const { id, repositoryData } = useLocalSearchParams();
  const router = useRouter();
  const [repository, setRepository] = useState<Repository | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  // Theme hooks
  const { colors, isDarkTheme } = useModernTheme();
  const themeClasses = useThemeClasses();

  useEffect(() => {
    if (repositoryData && typeof repositoryData === 'string') {
      try {
        const parsedRepo = JSON.parse(repositoryData) as Repository;
        setRepository(parsedRepo);
      } catch (error) {
        console.error('Error parsing repository data:', error);
        Alert.alert('Error', 'Failed to load repository data');
        router.back();
      }
    }
  }, [repositoryData]);

  if (!repository) {
    return (
      <View className={`flex-1 justify-center items-center ${themeClasses.bg.primary}`}>
        <StatusBar barStyle={isDarkTheme ? "light-content" : "dark-content"} />
        <Text className={`text-base ${themeClasses.text.secondary}`}>
          Loading repository details...
        </Text>
      </View>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'readme':
        return <ReadmeTab repository={repository} />;
      case 'overview':
      default:
        return (
          <ScrollView className={`flex-1 ${themeClasses.bg.primary}`}>
            {repository.description && (
              <View className={`${themeClasses.surface.primary} mt-2 p-4`}>
                <Text className={`text-base ${themeClasses.text.primary} leading-6`}>
                  {repository.description}
                </Text>
              </View>
            )}

            <RepositoryStatsGrid repository={repository} />
            <RepositoryInfo repository={repository} />
            <RepositoryTopics repository={repository} />
            <RepositoryCloneSection repository={repository} />
          </ScrollView>
        );
    }
  };

  return (
    <View className={`flex-1 ${themeClasses.bg.primary}`}>
      <StatusBar barStyle={isDarkTheme ? "light-content" : "dark-content"} />
      <RepositoryDetailHeader repository={repository} />
      
      {/* Tab Navigation */}
      <View className={`${themeClasses.surface.primary} ${themeClasses.border.primary} border-b`}>
        <View className="flex-row px-4">
          <Button
            variant={activeTab === 'overview' ? 'primary' : 'ghost'}
            onPress={() => setActiveTab('overview')}
            size="sm"
          >
            Overview
          </Button>
          <Button
            variant={activeTab === 'readme' ? 'primary' : 'ghost'}
            onPress={() => setActiveTab('readme')}
            size="sm"
          >
            README
          </Button>
        </View>
      </View>

      {/* Tab Content */}
      {renderTabContent()}
    </View>
  );
}