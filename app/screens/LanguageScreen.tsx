import { useModernThemeColor, useThemeClasses } from '@/hooks/useThemeColor';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪' },
  { code: 'da', name: 'Danish', nativeName: 'Dansk', flag: '🇩🇰' },
  { code: 'no', name: 'Norwegian', nativeName: 'Norsk', flag: '🇳🇴' },
];

export default function LanguagesScreen() {
  const { colors } = useModernThemeColor();
  const themeClasses = useThemeClasses();
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    // Here you would typically trigger the language change
    // For now, we'll just update the selected state
  };

  return (
    <View className={`flex-1 ${themeClasses.bg.primary}`}>
      {/* Header */}
      <View className={`pt-16 pb-4 px-6 ${themeClasses.border.primary} border-b`}>
        <Text className={`text-2xl font-bold ${themeClasses.text.primary} text-center`}>
          Language
        </Text>
        <Text className={`${themeClasses.text.tertiary} text-center mt-2`}>
          Choose your preferred language
        </Text>
      </View>

      {/* Current selection info */}
      <View className={`px-6 py-4 ${themeClasses.accents.blue.bg}`}>
        <View className="flex-row items-center justify-center">
          <Text className="text-3xl mr-3">
            {languages.find(lang => lang.code === selectedLanguage)?.flag}
          </Text>
          <View>
            <Text className={`text-lg font-semibold ${themeClasses.text.primary}`}>
              {languages.find(lang => lang.code === selectedLanguage)?.name}
            </Text>
            <Text className={`text-sm`} style={{ color: colors.accents.blue.main }}>
              Currently selected
            </Text>
          </View>
        </View>
      </View>

      {/* Languages list */}
      <ScrollView className="flex-1 px-6 py-4">
        {languages.map((language) => (
          <TouchableOpacity
            key={language.code}
            className={`flex-row items-center justify-between py-4 px-4 mb-2 rounded-xl ${
              selectedLanguage === language.code 
                ? `${themeClasses.accents.blue.bg} ${themeClasses.border.focus} border` 
                : `${themeClasses.surface.secondary}`
            }`}
            onPress={() => handleLanguageSelect(language.code)}
            activeOpacity={0.7}
          >
            <View className="flex-row items-center flex-1">
              <Text className="text-2xl mr-4">{language.flag}</Text>
              <View className="flex-1">
                <Text className={`font-semibold text-lg ${
                  selectedLanguage === language.code 
                    ? themeClasses.text.primary 
                    : themeClasses.text.primary
                }`}>
                  {language.name}
                </Text>
                <Text className={`text-sm ${
                  selectedLanguage === language.code 
                    ? themeClasses.text.secondary 
                    : themeClasses.text.tertiary
                }`}>
                  {language.nativeName}
                </Text>
              </View>
            </View>
            
            {selectedLanguage === language.code && (
              <View 
                className="w-6 h-6 rounded-full items-center justify-center"
                style={{ backgroundColor: colors.accents.blue.main }}
              >
                <Text className={`${themeClasses.text.inverse} text-xs font-bold`}>✓</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Footer info */}
      <View className={`px-6 py-4 ${themeClasses.border.primary} border-t`}>
        <Text className={`text-center ${themeClasses.text.tertiary} text-sm`}>
          Language changes will be applied after restarting the app
        </Text>
      </View>
    </View>
  );
}