import { useModernThemeColor, useThemeClasses } from '@/hooks/useThemeColor';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function ContactSupportScreen() {
  const { colors } = useModernThemeColor();
  const themeClasses = useThemeClasses();

  return (
    <View className={`flex-1 ${themeClasses.bg.primary} px-6`}>
      {/* Header matching your settings style */}
      <View className="pt-16 pb-8">
        <Text className={`text-2xl font-bold ${themeClasses.text.primary} text-center`}>
          Contact Support
        </Text>
      </View>

      {/* Main content container */}
      <View className="flex-1 items-center justify-center">
        {/* Icon container with green theme */}
        <View className={`w-24 h-24 ${themeClasses.accents.green.bg} rounded-full items-center justify-center mb-8`}>
          <Text className="text-4xl">💬</Text>
        </View>

        {/* Coming soon text */}
        <Text className={`text-3xl font-bold ${themeClasses.text.primary} mb-3`}>
          Coming Soon
        </Text>
        
        <Text className={`${themeClasses.text.secondary} text-center text-lg mb-8 px-4 leading-6`}>
          Direct support channels are being set up to help you faster
        </Text>

        {/* Feature preview cards */}
        <View className="w-full space-y-4 mb-8">
          <View className={`${themeClasses.surface.secondary} rounded-xl p-4 flex-row items-center ${themeClasses.border.primary} border`}>
            <View className={`w-10 h-10 ${themeClasses.accents.green.bg} rounded-lg items-center justify-center mr-4`}>
              <Text className="text-lg">⚡</Text>
            </View>
            <View className="flex-1">
              <Text className={`font-semibold ${themeClasses.text.primary}`}>
                Live Chat
              </Text>
              <Text className={`${themeClasses.text.tertiary} text-sm`}>
                Real-time support conversations
              </Text>
            </View>
          </View>

          <View className={`${themeClasses.surface.secondary} rounded-xl p-4 flex-row items-center ${themeClasses.border.primary} border`}>
            <View className={`w-10 h-10 ${themeClasses.accents.blue.bg} rounded-lg items-center justify-center mr-4`}>
              <Text className="text-lg">📧</Text>
            </View>
            <View className="flex-1">
              <Text className={`font-semibold ${themeClasses.text.primary}`}>
                Email Support
              </Text>
              <Text className={`${themeClasses.text.tertiary} text-sm`}>
                Detailed support via email tickets
              </Text>
            </View>
          </View>

          <View className={`${themeClasses.surface.secondary} rounded-xl p-4 flex-row items-center ${themeClasses.border.primary} border`}>
            <View className={`w-10 h-10 ${themeClasses.accents.purple.bg} rounded-lg items-center justify-center mr-4`}>
              <Text className="text-lg">🐛</Text>
            </View>
            <View className="flex-1">
              <Text className={`font-semibold ${themeClasses.text.primary}`}>
                Bug Reports
              </Text>
              <Text className={`${themeClasses.text.tertiary} text-sm`}>
                Easy bug reporting with diagnostics
              </Text>
            </View>
          </View>

          <View className={`${themeClasses.surface.secondary} rounded-xl p-4 flex-row items-center ${themeClasses.border.primary} border`}>
            <View className={`w-10 h-10 ${themeClasses.accents.orange.bg} rounded-lg items-center justify-center mr-4`}>
              <Text className="text-lg">💡</Text>
            </View>
            <View className="flex-1">
              <Text className={`font-semibold ${themeClasses.text.primary}`}>
                Feature Requests
              </Text>
              <Text className={`${themeClasses.text.tertiary} text-sm`}>
                Share ideas for new features
              </Text>
            </View>
          </View>
        </View>

        {/* CTA Button using green accent color */}
        <TouchableOpacity 
          className={`px-8 py-4 rounded-lg w-full ${themeClasses.shadow.md}`}
          style={{ backgroundColor: colors.accents.green.main }}
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
          <View className="h-2 rounded-full w-1/4" 
                style={{ backgroundColor: colors.accents.green.main }} />
        </View>
        <Text className={`text-center ${themeClasses.text.quaternary} text-xs mt-2`}>
          25% Complete
        </Text>
      </View>
    </View>
  );
}