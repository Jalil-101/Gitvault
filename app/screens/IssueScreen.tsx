// screens/IssueListScreen.tsx
import React, { useState, useMemo } from 'react';
import { 
  View, 
  FlatList, 
  SafeAreaView, 
  Text, 
  TouchableOpacity,
  StatusBar
} from 'react-native';
import { ModernColors } from '@/constants/Colors';
import { Issue, IssueFilter, IssueSortBy } from '@/types/issue';
import IssueItem from '@/components/Issue/IssueItem';
import FilterTabs from '@/components/Issue/FilterTabs';
import SearchHeader from '@/components/Issue/SearchHeader';
import EmptyState from '@/components/Issue/EmptyState';
import { useRouter } from 'expo-router';

// Mock data - replace with your actual data source
const mockIssues: Issue[] = [
  {
    id: 1,
    number: 142,
    title: "Fix authentication bug in login component",
    state: 'open',
    user: {
      login: 'john.doe',
      avatar_url: 'https://github.com/identicons/johndoe.png'
    },
    labels: [
      { id: 1, name: 'bug', color: 'ef4444' },
      { id: 2, name: 'high-priority', color: 'f97316' }
    ],
    assignees: [
      { login: 'sarah.dev', avatar_url: 'https://github.com/identicons/sarahdev.png' }
    ],
    created_at: '2025-06-28T10:30:00Z',
    updated_at: '2025-06-29T08:15:00Z',
    comments: 5
  },
  {
    id: 2,
    number: 89,
    title: "App crashes when uploading large files",
    state: 'open',
    user: {
      login: 'jane.smith',
      avatar_url: 'https://github.com/identicons/janesmith.png'
    },
    labels: [
      { id: 3, name: 'bug', color: 'ef4444' },
      { id: 4, name: 'enhancement', color: '10b981' }
    ],
    assignees: [],
    created_at: '2025-06-25T14:20:00Z',
    updated_at: '2025-06-29T06:45:00Z',
    comments: 12
  },
  // Add more mock issues as needed
];

export default function IssueScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<IssueFilter>('all');
  const [sortBy, setSortBy] = useState<IssueSortBy>('created');
  const theme = 'dark';
  const colors = ModernColors[theme];

  // Filter and sort issues
  const filteredAndSortedIssues = useMemo(() => {
    let filtered = mockIssues;

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(issue =>
        issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.user.login.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    switch (activeFilter) {
      case 'open':
        filtered = filtered.filter(issue => issue.state === 'open');
        break;
      case 'closed':
        filtered = filtered.filter(issue => issue.state === 'closed');
        break;
      case 'assigned':
        filtered = filtered.filter(issue => issue.assignees.length > 0);
        break;
      case 'created':
        // This would typically filter by current user's created issues
        break;
    }

    // Apply sorting
    switch (sortBy) {
      case 'created':
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case 'updated':
        filtered.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
        break;
      case 'comments':
        filtered.sort((a, b) => b.comments - a.comments);
        break;
    }

    return filtered;
  }, [mockIssues, searchQuery, activeFilter, sortBy]);

  // Calculate counts for filter tabs
  const issueCounts: Record<IssueFilter, number> = {
    all: mockIssues.length,
    open: mockIssues.filter(issue => issue.state === 'open').length,
    closed: mockIssues.filter(issue => issue.state === 'closed').length,
    assigned: mockIssues.filter(issue => issue.assignees.length > 0).length,
    created: mockIssues.length, // This would be user-specific
  };

  const handleIssuePress = (issue: Issue) => {
    // Navigate to issue detail screen
    console.log('Navigate to issue:', issue.number);
  };

  const renderIssueItem = ({ item }: { item: Issue }) => (
    <IssueItem
      issue={item}
      onPress={handleIssuePress}
      theme={theme}
    />
  );

  const renderEmptyState = () => {
    if (searchQuery.trim()) {
      return (
        <EmptyState
          icon="🔍"
          title="No issues found"
          description={`No issues match your search for "${searchQuery}"`}
          theme={theme}
        />
      );
    }

    switch (activeFilter) {
      case 'open':
        return (
          <EmptyState
            icon="✅"
            title="No open issues"
            description="All issues have been resolved! Great work."
            theme={theme}
          />
        );
      case 'closed':
        return (
          <EmptyState
            icon="🎉"
            title="No closed issues"
            description="No issues have been closed yet."
            theme={theme}
          />
        );
      default:
        return (
          <EmptyState
            icon="📝"
            title="No issues yet"
            description="Create your first issue to get started with tracking bugs and features."
            theme={theme}
          />
        );
    }
  };

  return (
    <SafeAreaView 
      style={{ 
        flex: 1, 
        backgroundColor: colors.background.primary 
      }}
    >
      <StatusBar barStyle="light-content" backgroundColor={colors.background.primary} />
      
      {/* Header */}
      <View className="px-4 py-3 border-b" style={{ borderBottomColor: colors.border.primary }}>
        <View className="flex-row items-center justify-between">
          <Text
            style={{
              color: colors.text.primary,
              fontSize: 24,
              fontWeight: '700'
            }}
          >
            Issues
          </Text>
          <TouchableOpacity
            className="p-2 rounded-lg"
            style={{
              backgroundColor: colors.interactive.primary,
            }}
          >
            <Text style={{ color: colors.text.inverse, fontSize: 16 }}>
              ➕
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Header */}
      <SearchHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
        theme={theme}
      />

      {/* Filter Tabs */}
      <FilterTabs
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        issueCounts={issueCounts}
        theme={theme}
      />

      {/* Issues List */}
      <FlatList
        data={filteredAndSortedIssues}
        renderItem={renderIssueItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ 
          paddingHorizontal: 16,
          paddingBottom: 20,
          flexGrow: 1
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
      />
    </SafeAreaView>
  );
};



