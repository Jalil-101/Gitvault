// Main FileViewer Screen

import React, { useState } from 'react';
import { View, ScrollView, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { FileHeader } from '@/components/FileViewer/FileHeader';
import { FileStats } from '@/components/FileViewer/FileStats';
import { CodeBlock } from '@/components/FileViewer/CodeBlock';
import { FileActions } from '@/components/FileViewer/FileActions';
// import { FileMetadata } from '@/components/FileViewer/FileMetaData';


const sampleCode = `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface WelcomeProps {
  name: string;
  onPress?: () => void;
}

export const Welcome: React.FC<WelcomeProps> = ({ name, onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {name}!</Text>
      <Text style={styles.subtitle}>
        Ready to start coding?
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f172a',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
  },
});`;

export default function FileViewerScreen() {
  const router = useRouter();
  const [isStarred, setIsStarred] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleStar = () => {
    setIsStarred(!isStarred);
    Alert.alert(isStarred ? 'Unstarred' : 'Starred', 'Repository updated');
  };

  const handleDownload = () => {
    Alert.alert('Download', 'File download started');
  };

  const handleCopy = () => {
    Alert.alert('Copied', 'Code copied to clipboard');
  };

  const handleEdit = () => {
    Alert.alert('Edit', 'Opening editor...');
  };

  const handleComment = () => {
    Alert.alert('Comment', 'Opening comments...');
  };

  const handleShare = () => {
    Alert.alert('Share', 'Sharing file...');
  };

  const handleReport = () => {
    Alert.alert('Report', 'Report submitted');
  };

  const handleViewHistory = () => {
    Alert.alert('History', 'Opening file history...');
  };

  const handleViewCommit = () => {
    Alert.alert('Commit', 'Opening commit details...');
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <FileHeader
        repositoryName="react-native-components"
        fileName="Welcome.tsx"
        fileSize="2.1 KB"
        onBack={handleBack}
        onStar={handleStar}
        onDownload={handleDownload}
        isStarred={isStarred}
      />
      
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="py-4">
          <FileStats
            language="TypeScript"
            lines={42}
            size="2.1 KB"
            stars={128}
            forks={24}
            watchers={45}
          />
          
          <CodeBlock
            content={sampleCode}
            language="TypeScript"
            onCopy={handleCopy}
          />
          
          <FileActions
            onEdit={handleEdit}
            onComment={handleComment}
            onShare={handleShare}
            onReport={handleReport}
            canEdit={true}
          />
          
          {/* <FileMetadata
            lastCommit={{
              message: "Add TypeScript support for Welcome component",
              author: "sarah_code",
              date: "2 hours ago",
              hash: "a1b2c3d4e5f6g7h8"
            }}
            contributors={8}
            onViewHistory={handleViewHistory}
            onViewCommit={handleViewCommit}
          /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}