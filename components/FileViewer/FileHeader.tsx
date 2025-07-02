// components/FileViewer/FileHeader.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronLeft, Star, Eye, GitFork, Download } from 'lucide-react-native';
import { MODERN_DARK } from '../../constants/Colors';

interface FileHeaderProps {
  repositoryName: string;
  fileName: string;
  fileSize: string;
  onBack: () => void;
  onStar: () => void;
  onDownload: () => void;
  isStarred?: boolean;
}

export const FileHeader: React.FC<FileHeaderProps> = ({
  repositoryName,
  fileName,
  fileSize,
  onBack,
  onStar,
  onDownload,
  isStarred = false,
}) => {
  return (
    <View className="bg-slate-900 border-b border-slate-800">
      {/* Navigation Header */}
      <View className="flex-row items-center justify-between px-4 py-3">
        <TouchableOpacity 
          onPress={onBack}
          className="p-2 rounded-lg bg-slate-800 active:bg-slate-700"
        >
          <ChevronLeft size={20} color={MODERN_DARK.text.primary} />
        </TouchableOpacity>
        
        <View className="flex-1 mx-4">
          <Text className="text-slate-400 text-sm" numberOfLines={1}>
            {repositoryName}
          </Text>
          <Text className="text-white text-base font-medium" numberOfLines={1}>
            {fileName}
          </Text>
        </View>

        <View className="flex-row space-x-2">
          <TouchableOpacity 
            onPress={onStar}
            className="p-2 rounded-lg bg-slate-800 active:bg-slate-700"
          >
            <Star 
              size={18} 
              color={isStarred ? "#F59E0B" : MODERN_DARK.text.secondary} 
              fill={isStarred ? "#F59E0B" : "transparent"}
            />
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={onDownload}
            className="p-2 rounded-lg bg-slate-800 active:bg-slate-700"
          >
            <Download size={18} color={MODERN_DARK.text.secondary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* File Info */}
      <View className="px-4 pb-3">
        <Text className="text-slate-400 text-sm">
          {fileSize} • Last modified 2 hours ago
        </Text>
      </View>
    </View>
  );
};