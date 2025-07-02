// components/SearchHeader.tsx
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { ModernColors } from '@/constants/Colors';
import { IssueSortBy } from '@/types/issue';

interface SearchHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: IssueSortBy;
  onSortChange: (sort: IssueSortBy) => void;
  theme?: 'light' | 'dark';
}

const SearchHeader: React.FC<SearchHeaderProps> = ({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  theme = 'dark'
}) => {
  const colors = ModernColors[theme];
  const [showSortMenu, setShowSortMenu] = useState(false);

  const sortOptions: { key: IssueSortBy; label: string }[] = [
    { key: 'created', label: 'Recently created' },
    { key: 'updated', label: 'Recently updated' },
    { key: 'comments', label: 'Most commented' },
  ];

  return (
    <View className="px-4 mb-4">
      {/* Search Input */}
      <View className="flex-row items-center mb-3">
        <View 
          className="flex-1 flex-row items-center px-4 py-3 rounded-lg mr-3"
          style={{
            backgroundColor: colors.surface.secondary,
            borderWidth: 1,
            borderColor: colors.border.primary,
          }}
        >
          <Text style={{ color: colors.text.tertiary, marginRight: 8 }}>
            🔍
          </Text>
          <TextInput
            value={searchQuery}
            onChangeText={onSearchChange}
            placeholder="Search issues..."
            placeholderTextColor={colors.text.quaternary}
            style={{
              flex: 1,
              color: colors.text.primary,
              fontSize: 16
            }}
          />
        </View>

        {/* Sort Button */}
        <TouchableOpacity
          onPress={() => setShowSortMenu(!showSortMenu)}
          className="p-3 rounded-lg"
          style={{
            backgroundColor: colors.surface.secondary,
            borderWidth: 1,
            borderColor: colors.border.primary,
          }}
        >
          <Text style={{ color: colors.text.secondary }}>
            📊
          </Text>
        </TouchableOpacity>
      </View>

      {/* Sort Menu */}
      {showSortMenu && (
        <View
          className="p-2 rounded-lg mb-2"
          style={{
            backgroundColor: colors.surface.elevated,
            borderWidth: 1,
            borderColor: colors.border.primary,
          }}
        >
          {sortOptions.map((option) => (
            <TouchableOpacity
              key={option.key}
              onPress={() => {
                onSortChange(option.key);
                setShowSortMenu(false);
              }}
              className="px-3 py-2 rounded-lg"
              style={{
                backgroundColor: sortBy === option.key 
                  ? colors.interactive.primary + '20' 
                  : 'transparent',
              }}
            >
              <Text
                style={{
                  color: sortBy === option.key 
                    ? colors.interactive.primary 
                    : colors.text.secondary,
                  fontSize: 14,
                  fontWeight: sortBy === option.key ? '600' : '400'
                }}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default SearchHeader;