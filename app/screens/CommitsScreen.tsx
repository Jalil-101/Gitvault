// screens/CommitsScreen.tsx
import React, { useState } from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  RefreshControl,
} from 'react-native';
import { useModernTheme } from '@/context/ThemeContext';
import { CommitsHeader } from '@/components/commits/CommitsHeader';
import { CommitItem } from '@/components/commits/CommitItem';
import { dummyCommits } from '@/data/commits';
import { Commit } from '@/types/commits';

export const CommitsScreen = ({ navigation }: any) => {
  const { colors, isDarkTheme } = useModernTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState('main');

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const handleCommitPress = (commit: Commit) => {
    // Handle commit item press
    console.log('Commit pressed:', commit.id);
    // You can navigate to commit details screen here
    // navigation.navigate('CommitDetails', { commit });
  };

  const handleBranchPress = () => {
    // Handle branch selector press
    console.log('Branch selector pressed');
    // You can show branch selector modal here
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background.primary }}>
      <StatusBar 
        barStyle={isDarkTheme ? "light-content" : "dark-content"} 
        backgroundColor={colors.background.primary} 
      />
      
      <CommitsHeader 
        navigation={navigation}
        selectedBranch={selectedBranch}
        onBranchPress={handleBranchPress}
      />

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh} 
            tintColor={colors.text.primary}
            colors={[colors.accents.purple.main]}
          />
        }
      >
        <View style={{ paddingVertical: 16 }}>
          {dummyCommits.map((commit) => (
            <CommitItem
              key={commit.id}
              commit={commit}
              onPress={() => handleCommitPress(commit)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};