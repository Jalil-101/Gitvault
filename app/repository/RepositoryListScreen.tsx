// app/index.tsx - Main Repository List Screen
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TextInput,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Repository } from '@/types/repository';
import { RepositoryCard } from '@/components/repository/RepositoryCard';
import { Button } from '@/components/ui/Button';
import { useModernTheme } from '@/context/ThemeContext';
import { useThemeClasses } from '@/hooks/useThemeColor';

interface GitHubUser {
  login: string;
  avatar_url: string;
}

export default function RepositoryListScreen() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRepositories, setFilteredRepositories] = useState<Repository[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Theme hooks
  const { colors, isDarkTheme } = useModernTheme();
  const themeClasses = useThemeClasses();

  // GitHub API configuration
  const GITHUB_API_BASE = 'https://api.github.com';
  const DEFAULT_USERNAME = 'microsoft'; // You can change this to any GitHub username

  const fetchRepositories = async (username: string = DEFAULT_USERNAME) => {
    try {
      setError(null);
      const response = await fetch(`${GITHUB_API_BASE}/users/${username}/repos?sort=updated&per_page=30`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('User not found');
        } else if (response.status === 403) {
          throw new Error('API rate limit exceeded. Please try again later.');
        } else {
          throw new Error('Failed to fetch repositories');
        }
      }

      const data = await response.json();
      
      // Transform GitHub API response to our Repository interface
      const transformedRepos: Repository[] = data.map((repo: any) => ({
        id: repo.id,
        name: repo.name,
        full_name: repo.full_name,
        description: repo.description || '',
        private: repo.private,
        owner: {
          login: repo.owner.login,
          avatar_url: repo.owner.avatar_url,
        },
        html_url: repo.html_url,
        clone_url: repo.clone_url,
        ssh_url: repo.ssh_url,
        language: repo.language || 'Unknown',
        stargazers_count: repo.stargazers_count,
        watchers_count: repo.watchers_count,
        forks_count: repo.forks_count,
        open_issues_count: repo.open_issues_count,
        default_branch: repo.default_branch,
        created_at: repo.created_at,
        updated_at: repo.updated_at,
        pushed_at: repo.pushed_at,
        size: repo.size,
        topics: repo.topics || [],
        license: repo.license ? {
          name: repo.license.name,
          spdx_id: repo.license.spdx_id,
        } : undefined,
      }));

      setRepositories(transformedRepos);
      setFilteredRepositories(transformedRepos);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      Alert.alert('Error', errorMessage);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchRepositories();
    setRefreshing(false);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredRepositories(repositories);
    } else {
      const filtered = repositories.filter(repo =>
        repo.name.toLowerCase().includes(query.toLowerCase()) ||
        repo.description.toLowerCase().includes(query.toLowerCase()) ||
        (repo.language && repo.language.toLowerCase().includes(query.toLowerCase())) ||
        repo.topics.some(topic => topic.toLowerCase().includes(query.toLowerCase()))
      );
      setFilteredRepositories(filtered);
    }
  };

  const handleSearchUser = () => {
    Alert.prompt(
      'Search User Repositories',
      'Enter a GitHub username:',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Search',
          onPress: async (username) => {
            if (username && username.trim()) {
              setLoading(true);
              await fetchRepositories(username.trim());
              setLoading(false);
            }
          },
        },
      ],
      'plain-text',
      DEFAULT_USERNAME
    );
  };

  useEffect(() => {
    const initializeData = async () => {
      await fetchRepositories();
      setLoading(false);
    };
    initializeData();
  }, []);

  const renderRepository = ({ item }: { item: Repository }) => (
    <RepositoryCard repository={item} />
  );

  const renderHeader = () => (
    <View 
      className={`${themeClasses.surface.primary} px-4 py-3 ${themeClasses.border.primary} border-b`}
    >
      <View className="flex-row items-center justify-between mb-3">
        <Text className={`text-2xl font-bold ${themeClasses.text.primary}`}>
          Repositories
        </Text>
        <Button variant="secondary" size="sm" onPress={handleSearchUser}>
          Search User
        </Button>
      </View>
      
      <TextInput
        className={`${themeClasses.surface.secondary} ${themeClasses.border.secondary} border rounded-lg px-4 py-3 text-base ${themeClasses.text.primary}`}
        placeholder="Search repositories..."
        placeholderTextColor={colors.text.tertiary}
        value={searchQuery}
        onChangeText={handleSearch}
        autoCapitalize="none"
        autoCorrect={false}
        style={{
          backgroundColor: colors.surface.secondary,
          borderColor: colors.border.secondary,
          color: colors.text.primary,
        }}
      />
      
      <View className="flex-row justify-between items-center mt-3">
        <Text className={`text-sm ${themeClasses.text.secondary}`}>
          {filteredRepositories.length} repositories
        </Text>
        {searchQuery.length > 0 && (
          <Text className={`text-sm ${themeClasses.text.primary}`} style={{ color: colors.interactive.primary }}>
            Filtered by "{searchQuery}"
          </Text>
        )}
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View className="flex-1 justify-center items-center px-4 py-12">
      <Text className="text-6xl mb-4">📦</Text>
      <Text className={`text-xl font-semibold ${themeClasses.text.primary} mb-2 text-center`}>
        {searchQuery ? 'No repositories found' : 'No repositories available'}
      </Text>
      <Text className={`text-base ${themeClasses.text.secondary} text-center mb-6`}>
        {searchQuery 
          ? `No repositories match "${searchQuery}". Try a different search term.`
          : 'This user doesn\'t have any public repositories yet.'
        }
      </Text>
      {searchQuery && (
        <Button variant="secondary" onPress={() => handleSearch('')}>
          Clear Search
        </Button>
      )}
    </View>
  );

  const renderErrorState = () => (
    <View className="flex-1 justify-center items-center px-4 py-12">
      <Text className="text-6xl mb-4">⚠️</Text>
      <Text className={`text-xl font-semibold ${themeClasses.text.primary} mb-2 text-center`}>
        Something went wrong
      </Text>
      <Text className={`text-base ${themeClasses.text.secondary} text-center mb-6`}>
        {error}
      </Text>
      <Button variant="primary" onPress={() => {
        setLoading(true);
        fetchRepositories().finally(() => setLoading(false));
      }}>
        Try Again
      </Button>
    </View>
  );

  const renderLoadingState = () => (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" color={colors.interactive.primary} />
      <Text className={`text-base ${themeClasses.text.secondary} mt-4`}>
        Loading repositories...
      </Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView className={`flex-1 ${themeClasses.bg.primary}`}>
        <StatusBar barStyle={isDarkTheme ? "light-content" : "dark-content"} />
        {renderLoadingState()}
      </SafeAreaView>
    );
  }

  if (error && repositories.length === 0) {
    return (
      <SafeAreaView className={`flex-1 ${themeClasses.bg.primary}`}>
        <StatusBar barStyle={isDarkTheme ? "light-content" : "dark-content"} />
        {renderErrorState()}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className={`flex-1 ${themeClasses.bg.primary}`}>
      <StatusBar barStyle={isDarkTheme ? "light-content" : "dark-content"} />
      <FlatList
        data={filteredRepositories}
        renderItem={renderRepository}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[colors.interactive.primary]}
            tintColor={colors.interactive.primary}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        ItemSeparatorComponent={() => <View className="h-1" />}
      />
    </SafeAreaView>
  );
}