// components/FileViewer/CodeBlock.tsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Copy } from 'lucide-react-native';
import { MODERN_DARK } from '../../constants/Colors';

interface CodeBlockProps {
  content: string;
  language: string;
  showLineNumbers?: boolean;
  onCopy?: () => void;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  content,
  language,
  showLineNumbers = true,
  onCopy,
}) => {
  const lines = content.split('\n');

  return (
    <View className="bg-slate-900 mx-4 rounded-lg overflow-hidden mb-4">
      {/* Code Header */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
        <Text className="text-slate-300 text-sm font-medium">{language}</Text>
        {onCopy && (
          <TouchableOpacity 
            onPress={onCopy}
            className="flex-row items-center space-x-2 px-3 py-1.5 rounded-md bg-slate-700 active:bg-slate-600"
          >
            <Copy size={14} color={MODERN_DARK.text.secondary} />
            <Text className="text-slate-300 text-sm">Copy</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Code Content */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row">
          {/* Line Numbers */}
          {showLineNumbers && (
            <View className="bg-slate-800 px-3 py-4 border-r border-slate-700">
              {lines.map((_, index) => (
                <Text 
                  key={index} 
                  className="text-slate-500 text-sm font-mono leading-6 text-right"
                  style={{ minWidth: 30 }}
                >
                  {index + 1}
                </Text>
              ))}
            </View>
          )}

          {/* Code Lines */}
          <ScrollView>
            <View className="px-4 py-4">
              {lines.map((line, index) => (
                <TouchableOpacity 
                  key={index}
                  className="active:bg-slate-800 px-2 py-0.5 rounded"
                  activeOpacity={0.7}
                >
                  <Text className="text-slate-200 text-sm font-mono leading-6">
                    {line || ' '}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};