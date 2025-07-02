// components/IssueItem.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { ModernColors } from '@/constants/Colors';
import { Issue } from '@/types/issue';
import { formatDistanceToNow } from 'date-fns';

interface IssueItemProps {
  issue: Issue;
  onPress: (issue: Issue) => void;
  theme?: 'light' | 'dark';
}

const IssueItem: React.FC<IssueItemProps> = ({ 
  issue, 
  onPress, 
  theme = 'dark' 
}) => {
  const colors = ModernColors[theme];
  
  const getStatusColor = () => {
    return issue.state === 'open' 
      ? colors.status.success.main 
      : colors.status.error.main;
  };

  const getStatusIcon = () => {
    return issue.state === 'open' ? '●' : '○';
  };

  const formatTimeAgo = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };

  return (
    <TouchableOpacity
      onPress={() => onPress(issue)}
      className="mb-3"
      style={{
        backgroundColor: colors.surface.secondary,
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: colors.border.primary,
      }}
    >
      {/* Header with status and number */}
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center">
          <Text 
            style={{ 
              color: getStatusColor(),
              fontSize: 16,
              fontWeight: '600',
              marginRight: 8 
            }}
          >
            {getStatusIcon()}
          </Text>
          <Text
            style={{
              color: colors.text.tertiary,
              fontSize: 14,
              fontWeight: '500'
            }}
          >
            #{issue.number}
          </Text>
        </View>
        
        {issue.assignees.length > 0 && (
          <View className="flex-row">
            {issue.assignees.slice(0, 3).map((assignee, index) => (
              <Image
                key={assignee.login}
                source={{ uri: assignee.avatar_url }}
                className="w-6 h-6 rounded-full"
                style={{
                  marginLeft: index > 0 ? -8 : 0,
                  borderWidth: 2,
                  borderColor: colors.surface.secondary,
                }}
              />
            ))}
          </View>
        )}
      </View>

      {/* Title */}
      <Text
        style={{
          color: colors.text.primary,
          fontSize: 16,
          fontWeight: '600',
          lineHeight: 22,
          marginBottom: 8
        }}
        numberOfLines={2}
      >
        {issue.title}
      </Text>

      {/* Labels */}
      {issue.labels.length > 0 && (
        <View className="flex-row flex-wrap mb-3">
          {issue.labels.slice(0, 4).map((label) => (
            <View
              key={label.id}
              className="mr-2 mb-1 px-2 py-1 rounded-full"
              style={{
                backgroundColor: `#${label.color}20`,
                borderWidth: 1,
                borderColor: `#${label.color}40`,
              }}
            >
              <Text
                style={{
                  color: `#${label.color}`,
                  fontSize: 12,
                  fontWeight: '500'
                }}
              >
                {label.name}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Footer with metadata */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Image
            source={{ uri: issue.user.avatar_url }}
            className="w-5 h-5 rounded-full mr-2"
          />
          <Text
            style={{
              color: colors.text.tertiary,
              fontSize: 13
            }}
          >
            {issue.user.login}
          </Text>
          <Text
            style={{
              color: colors.text.quaternary,
              fontSize: 13,
              marginLeft: 8
            }}
          >
            {formatTimeAgo(issue.created_at)}
          </Text>
        </View>

        {issue.comments > 0 && (
          <View className="flex-row items-center">
            <Text
              style={{
                color: colors.text.tertiary,
                fontSize: 13,
                marginRight: 4
              }}
            >
              💬
            </Text>
            <Text
              style={{
                color: colors.text.tertiary,
                fontSize: 13,
                fontWeight: '500'
              }}
            >
              {issue.comments}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default IssueItem;
