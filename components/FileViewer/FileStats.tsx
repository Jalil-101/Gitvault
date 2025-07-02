// components/FileViewer/FileStats.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { Eye, GitFork, Star } from 'lucide-react-native';
import { MODERN_DARK } from '../../constants/Colors';

interface FileStatsProps {
  language: string;
  lines: number;
  size: string;
  stars?: number;
  forks?: number;
  watchers?: number;
}

export const FileStats: React.FC<FileStatsProps> = ({
  language,
  lines,
  size,
  stars,
  forks,
  watchers,
}) => {
  return (
    <View className="bg-slate-800 mx-4 rounded-lg p-4 mb-4">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center space-x-3">
          <View className="bg-blue-500 w-3 h-3 rounded-full" />
          <Text className="text-white font-medium">{language}</Text>
          <Text className="text-slate-400">•</Text>
          <Text className="text-slate-400">{lines} lines</Text>
          <Text className="text-slate-400">•</Text>
          <Text className="text-slate-400">{size}</Text>
        </View>
      </View>
      
      {(stars || forks || watchers) && (
        <View className="flex-row items-center space-x-4 mt-3 pt-3 border-t border-slate-700">
          {stars && (
            <View className="flex-row items-center space-x-1">
              <Star size={14} color={MODERN_DARK.text.quaternary} />
              <Text className="text-slate-400 text-sm">{stars}</Text>
            </View>
          )}
          {forks && (
            <View className="flex-row items-center space-x-1">
              <GitFork size={14} color={MODERN_DARK.text.quaternary} />
              <Text className="text-slate-400 text-sm">{forks}</Text>
            </View>
          )}
          {watchers && (
            <View className="flex-row items-center space-x-1">
              <Eye size={14} color={MODERN_DARK.text.quaternary} />
              <Text className="text-slate-400 text-sm">{watchers}</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};