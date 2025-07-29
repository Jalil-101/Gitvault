import { useModernThemeColor, useThemeClasses } from '@/hooks/useThemeColor';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function HelpCenterScreen() {
  const { colors } = useModernThemeColor();
  const themeClasses = useThemeClasses();

  return (
    <View className={`flex-1 ${themeClasses.bg.primary} px-6`}>
      {/* Header matching your settings style */}
      <View className="pt-16 pb-8">
        <Text className={`text-2xl font-bold ${themeClasses.text.primary} text-center`}>
          Help Center
        </Text>
      </View>

      {/* Main content container */}
      <View className="flex-1 items-center justify-center">
        {/* Icon container with blue theme */}
        <View className={`w-24 h-24 ${themeClasses.accents.blue.bg} rounded-full items-center justify-center mb-8`}>
          <Text className="text-4xl">❓</Text>
        </View>

        {/* Coming soon text */}
        <Text className={`text-3xl font-bold ${themeClasses.text.primary} mb-3`}>
          Coming Soon
        </Text>
        
        <Text className={`${themeClasses.text.secondary} text-center text-lg mb-8 px-4 leading-6`}>
          A comprehensive help system is being built to assist you
        </Text>

        {/* Feature preview cards */}
        <View className="w-full space-y-4 mb-8">
          <View className={`${themeClasses.surface.secondary} rounded-xl p-4 flex-row items-center ${themeClasses.border.primary} border`}>
            <View className={`w-10 h-10 ${themeClasses.accents.blue.bg} rounded-lg items-center justify-center mr-4`}>
              <Text className="text-lg">📚</Text>
            </View>
            <View className="flex-1">
              <Text className={`font-semibold ${themeClasses.text.primary}`}>
                Documentation
              </Text>
              <Text className={`${themeClasses.text.tertiary} text-sm`}>
                Detailed guides and tutorials
              </Text>
            </View>
          </View>

          <View className={`${themeClasses.surface.secondary} rounded-xl p-4 flex-row items-center ${themeClasses.border.primary} border`}>
            <View className={`w-10 h-10 ${themeClasses.accents.green.bg} rounded-lg items-center justify-center mr-4`}>
              <Text className="text-lg">🔍</Text>
            </View>
            <View className="flex-1">
              <Text className={`font-semibold ${themeClasses.text.primary}`}>
                Search Help
              </Text>
              <Text className={`${themeClasses.text.tertiary} text-sm`}>
                Find answers quickly with smart search
              </Text>
            </View>
          </View>

          <View className={`${themeClasses.surface.secondary} rounded-xl p-4 flex-row items-center ${themeClasses.border.primary} border`}>
            <View className={`w-10 h-10 ${themeClasses.accents.purple.bg} rounded-lg items-center justify-center mr-4`}>
              <Text className="text-lg">💬</Text>
            </View>
            <View className="flex-1">
              <Text className={`font-semibold ${themeClasses.text.primary}`}>
                FAQ Section
              </Text>
              <Text className={`${themeClasses.text.tertiary} text-sm`}>
                Common questions and solutions
              </Text>
            </View>
          </View>

          <View className={`${themeClasses.surface.secondary} rounded-xl p-4 flex-row items-center ${themeClasses.border.primary} border`}>
            <View className={`w-10 h-10 ${themeClasses.accents.orange.bg} rounded-lg items-center justify-center mr-4`}>
              <Text className="text-lg">🎥</Text>
            </View>
            <View className="flex-1">
              <Text className={`font-semibold ${themeClasses.text.primary}`}>
                Video Tutorials
              </Text>
              <Text className={`${themeClasses.text.tertiary} text-sm`}>
                Step-by-step visual guides
              </Text>
            </View>
          </View>
        </View>

        {/* CTA Button using blue accent color */}
        <TouchableOpacity 
          className={`px-8 py-4 rounded-lg w-full ${themeClasses.shadow.md}`}
          style={{ backgroundColor: colors.accents.blue.main }}
          activeOpacity={0.8}
        >
          <Text className={`${themeClasses.text.inverse} font-semibold text-center text-lg`}>
            Get Notified When Ready
          </Text>
        </TouchableOpacity>
      </View>

      {/* Progress indicator */}
      <View className="pb-8">
        <Text className={`text-center ${themeClasses.text.tertiary} text-sm mb-3`}>
          Development Progress
        </Text>
        <View className={`${themeClasses.bg.tertiary} rounded-full h-2`}>
          <View className="h-2 rounded-full w-1/3" 
                style={{ backgroundColor: colors.accents.blue.main }} />
        </View>
        <Text className={`text-center ${themeClasses.text.quaternary} text-xs mt-2`}>
          35% Complete
        </Text>
      </View>
    </View>
  );
}