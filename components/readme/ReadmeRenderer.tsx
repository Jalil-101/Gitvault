// components/readme/ReadmeRenderer.tsx
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useModernTheme } from '@/context/ThemeContext';
import { useThemeClasses } from '@/hooks/useThemeColor';

interface ReadmeRendererProps {
  content: string;
}

export const ReadmeRenderer: React.FC<ReadmeRendererProps> = ({ content }) => {
  const { colors, shadows } = useModernTheme();
  const themeClasses = useThemeClasses();

  const renderMarkdown = (markdown: string) => {
    const lines = markdown.split('\n');
    const elements: React.ReactNode[] = [];
    let currentIndex = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Headers
      if (line.startsWith('#')) {
        const level = line.match(/^#+/)?.[0].length || 1;
        const text = line.replace(/^#+\s*/, '');
        elements.push(
          <Text 
            key={currentIndex++} 
            style={{
              fontWeight: 'bold',
              color: colors.text.primary,
              fontSize: level === 1 ? 24 : level === 2 ? 20 : level === 3 ? 18 : 16,
              marginBottom: 8,
              marginTop: 16,
              lineHeight: level === 1 ? 32 : level === 2 ? 28 : level === 3 ? 24 : 20,
            }}
          >
            {text}
          </Text>
        );
      }
      // Code blocks
      else if (line.startsWith('```')) {
        const language = line.replace('```', '');
        const codeLines = [];
        i++; // Skip the opening ```
        
        while (i < lines.length && !lines[i].startsWith('```')) {
          codeLines.push(lines[i]);
          i++;
        }
        
        elements.push(
          <View 
            key={currentIndex++} 
            style={{
              backgroundColor: colors.surface.secondary,
              padding: 12,
              borderRadius: 8,
              marginVertical: 8,
              borderWidth: 1,
              borderColor: colors.border.primary,
              ...shadows.sm,
            }}
          >
            {language && (
              <Text 
                style={{
                  fontSize: 12,
                  color: colors.text.tertiary,
                  marginBottom: 4,
                  fontWeight: '500',
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                }}
              >
                {language}
              </Text>
            )}
            <Text 
              style={{
                fontFamily: 'monospace',
                fontSize: 14,
                color: colors.text.primary,
                lineHeight: 20,
              }}
            >
              {codeLines.join('\n')}
            </Text>
          </View>
        );
      }
      // Inline code
      else if (line.includes('`') && !line.startsWith('```')) {
        const parts = line.split('`');
        const textElements = parts.map((part, index) => {
          if (index % 2 === 1) {
            // This is inline code
            return (
              <Text
                key={index}
                style={{
                  fontFamily: 'monospace',
                  backgroundColor: colors.surface.secondary,
                  color: colors.text.primary,
                  paddingHorizontal: 4,
                  paddingVertical: 2,
                  borderRadius: 4,
                  fontSize: 14,
                }}
              >
                {part}
              </Text>
            );
          } else {
            // Regular text
            return part;
          }
        });
        
        elements.push(
          <Text 
            key={currentIndex++} 
            style={{
              color: colors.text.primary,
              marginBottom: 8,
              lineHeight: 24,
              fontSize: 16,
            }}
          >
            {textElements}
          </Text>
        );
      }
      // Lists
      else if (line.startsWith('- ') || line.startsWith('* ')) {
        const text = line.replace(/^[-*]\s*/, '');
        elements.push(
          <View 
            key={currentIndex++} 
            style={{
              flexDirection: 'row',
              marginBottom: 4,
              paddingLeft: 8,
            }}
          >
            <Text 
              style={{
                color: colors.accents.blue.main,
                marginRight: 8,
                fontSize: 16,
                fontWeight: '600',
              }}
            >
              •
            </Text>
            <Text 
              style={{
                color: colors.text.primary,
                flex: 1,
                lineHeight: 24,
                fontSize: 16,
              }}
            >
              {text}
            </Text>
          </View>
        );
      }
      // Numbered lists
      else if (/^\d+\.\s/.test(line)) {
        const match = line.match(/^(\d+)\.\s(.+)$/);
        if (match) {
          const [, number, text] = match;
          elements.push(
            <View 
              key={currentIndex++} 
              style={{
                flexDirection: 'row',
                marginBottom: 4,
                paddingLeft: 8,
              }}
            >
              <Text 
                style={{
                  color: colors.accents.blue.main,
                  marginRight: 8,
                  fontSize: 16,
                  fontWeight: '600',
                  minWidth: 24,
                }}
              >
                {number}.
              </Text>
              <Text 
                style={{
                  color: colors.text.primary,
                  flex: 1,
                  lineHeight: 24,
                  fontSize: 16,
                }}
              >
                {text}
              </Text>
            </View>
          );
        }
      }
      // Links (basic markdown links)
      else if (line.includes('[') && line.includes(']') && line.includes('(') && line.includes(')')) {
        // Simple link parsing - could be enhanced for more complex cases
        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        let processedText = line;
        const links: Array<{ text: string; url: string; index: number }> = [];
        let match;
        
        while ((match = linkRegex.exec(line)) !== null) {
          links.push({
            text: match[1],
            url: match[2],
            index: match.index,
          });
        }
        
        // For now, just render as text with link styling
        elements.push(
          <Text 
            key={currentIndex++} 
            style={{
              color: colors.text.primary,
              marginBottom: 8,
              lineHeight: 24,
              fontSize: 16,
            }}
          >
            {processedText.replace(linkRegex, (match, text) => text)}
          </Text>
        );
      }
      // Bold text
      else if (line.includes('**')) {
        const parts = line.split('**');
        const textElements = parts.map((part, index) => {
          if (index % 2 === 1) {
            // This is bold text
            return (
              <Text
                key={index}
                style={{
                  fontWeight: 'bold',
                  color: colors.text.primary,
                }}
              >
                {part}
              </Text>
            );
          } else {
            return part;
          }
        });
        
        elements.push(
          <Text 
            key={currentIndex++} 
            style={{
              color: colors.text.primary,
              marginBottom: 8,
              lineHeight: 24,
              fontSize: 16,
            }}
          >
            {textElements}
          </Text>
        );
      }
      // Italic text
      else if (line.includes('*') && !line.startsWith('*')) {
        const parts = line.split('*');
        const textElements = parts.map((part, index) => {
          if (index % 2 === 1) {
            // This is italic text
            return (
              <Text
                key={index}
                style={{
                  fontStyle: 'italic',
                  color: colors.text.secondary,
                }}
              >
                {part}
              </Text>
            );
          } else {
            return part;
          }
        });
        
        elements.push(
          <Text 
            key={currentIndex++} 
            style={{
              color: colors.text.primary,
              marginBottom: 8,
              lineHeight: 24,
              fontSize: 16,
            }}
          >
            {textElements}
          </Text>
        );
      }
      // Block quotes
      else if (line.startsWith('> ')) {
        const text = line.replace(/^>\s*/, '');
        elements.push(
          <View 
            key={currentIndex++} 
            style={{
              backgroundColor: colors.surface.secondary,
              borderLeftWidth: 4,
              borderLeftColor: colors.accents.blue.main,
              paddingLeft: 12,
              paddingVertical: 8,
              paddingRight: 12,
              marginVertical: 8,
              borderRadius: 4,
            }}
          >
            <Text 
              style={{
                color: colors.text.secondary,
                fontStyle: 'italic',
                lineHeight: 24,
                fontSize: 16,
              }}
            >
              {text}
            </Text>
          </View>
        );
      }
      // Horizontal rules
      else if (line.trim() === '---' || line.trim() === '***') {
        elements.push(
          <View 
            key={currentIndex++} 
            style={{
              height: 1,
              backgroundColor: colors.border.primary,
              marginVertical: 16,
            }}
          />
        );
      }
      // Empty lines
      else if (line.trim() === '') {
        elements.push(
          <View 
            key={currentIndex++} 
            style={{ height: 8 }} 
          />
        );
      }
      // Regular paragraphs
      else if (line.trim() !== '') {
        elements.push(
          <Text 
            key={currentIndex++} 
            style={{
              color: colors.text.primary,
              marginBottom: 8,
              lineHeight: 24,
              fontSize: 16,
            }}
          >
            {line}
          </Text>
        );
      }
    }

    return elements;
  };

  return (
    <ScrollView 
      style={{ 
        flex: 1, 
        backgroundColor: colors.background.primary,
      }}
      contentContainerStyle={{
        padding: 16,
      }}
      showsVerticalScrollIndicator={false}
    >
      {renderMarkdown(content)}
    </ScrollView>
  );
};