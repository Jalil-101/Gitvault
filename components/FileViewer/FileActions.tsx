// components/FileViewer/FileActions.tsx
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Edit3, MessageSquare, Share, AlertTriangle } from 'lucide-react-native';
import { MODERN_DARK } from '../../constants/Colors';

interface FileActionsProps {
  onEdit?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  onReport?: () => void;
  canEdit?: boolean;
}

export const FileActions: React.FC<FileActionsProps> = ({
  onEdit,
  onComment,
  onShare,
  onReport,
  canEdit = false,
}) => {
  const actions = [
    {
      icon: Edit3,
      label: 'Edit',
      onPress: onEdit,
      disabled: !canEdit,
      color: MODERN_DARK.accents.blue.main,
    },
    {
      icon: MessageSquare,
      label: 'Comment',
      onPress: onComment,
      color: MODERN_DARK.accents.green.main,
    },
    {
      icon: Share,
      label: 'Share',
      onPress: onShare,
      color: MODERN_DARK.accents.purple.main,
    },
    {
      icon: AlertTriangle,
      label: 'Report',
      onPress: onReport,
      color: MODERN_DARK.accents.orange.main,
    },
  ];

  return (
    <View className="bg-slate-800 mx-4 rounded-lg p-4 mb-4">
      <Text className="text-white font-medium mb-3">Quick Actions</Text>
      <View className="flex-row justify-between">
        {actions.map((action, index) => {
          const IconComponent = action.icon;
          return (
            <TouchableOpacity
              key={index}
              onPress={action.onPress}
              disabled={action.disabled}
              className={`flex-1 items-center p-3 rounded-lg mx-1 ${
                action.disabled ? 'bg-slate-700 opacity-50' : 'bg-slate-700 active:bg-slate-600'
              }`}
            >
              <IconComponent 
                size={20} 
                color={action.disabled ? MODERN_DARK.text.quaternary : action.color} 
              />
              <Text 
                className={`text-sm mt-1 ${
                  action.disabled ? 'text-slate-500' : 'text-slate-300'
                }`}
              >
                {action.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
