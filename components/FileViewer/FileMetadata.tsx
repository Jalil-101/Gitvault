// components/FileViewer/FileMetadata.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Calendar, User, GitCommit, Clock } from 'lucide-react-native';
import { MODERN_DARK } from '../../constants/Colors';

interface FileMetadataProps {
  lastCommit: {
    message: string;
    author: string;
    date: string;
    hash: string;
  };
  contributors: number;
  onViewHistory?: () => void;
  onViewCommit?: () => void;
}

export const FileMetadata: React.FC<FileMetadataProps> = ({
  lastCommit,
  contributors,
  onViewHistory,
  onViewCommit,
}) => {
  return (
    <View className="bg-slate-800 mx-4 rounded-lg p-4 mb-4">
      <Text className="text-white font-medium mb-3">File History</Text>
      
      {/* Last Commit */}
      <TouchableOpacity 
        onPress={onViewCommit}
        className="bg-slate-700 rounded-lg p-3 mb-3 active:bg-slate-600"
      >
        <View className="flex-row items-start justify-between mb-2">
          <View className="flex-1 mr-3">
            <Text className="text-white font-medium mb-1" numberOfLines={2}>
              {lastCommit.message}
            </Text>
            <View className="flex-row items-center space-x-3">
              <View className="flex-row items-center space-x-1">
                <User size={12} color={MODERN_DARK.text.quaternary} />
                <Text className="text-slate-400 text-sm">{lastCommit.author}</Text>
              </View>
              <View className="flex-row items-center space-x-1">
                <Clock size={12} color={MODERN_DARK.text.quaternary} />
                <Text className="text-slate-400 text-sm">{lastCommit.date}</Text>
              </View>
            </View>
          </View>
          <View className="bg-slate-600 px-2 py-1 rounded">
            <Text className="text-slate-300 text-xs font-mono">
              {lastCommit.hash.substring(0, 7)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Stats */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center space-x-1">
          <GitCommit size={14} color={MODERN_DARK.text.quaternary} />
          <Text className="text-slate-400 text-sm">{contributors} contributors</Text>
        </View>
        
        {onViewHistory && (
          <TouchableOpacity 
            onPress={onViewHistory}
            className="px-3 py-1.5 rounded-md bg-slate-700 active:bg-slate-600"
          >
            <Text className="text-blue-400 text-sm font-medium">View History</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
