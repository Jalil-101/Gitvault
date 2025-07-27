import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { pushNotificationService } from '@/services/PushNotificationService';

interface NotificationTestButtonProps {
  style?: any;
  textStyle?: any;
}

const NotificationTestButton: React.FC<NotificationTestButtonProps> = ({ 
  style, 
  textStyle 
}) => {
  const runNotificationTests = async () => {
    try {
      // Test 1: Immediate local notification
      await pushNotificationService.presentNotification(
        'Test Notification',
        'This is a test notification',
        { type: 'test' }
      );

      // Show success message
      Alert.alert(
        'Testing Notifications',
        'Local notification sent immediately!\n\nScheduled notification will appear in 5 seconds...',
        [{ text: 'OK' }]
      );

      // Test 2: Scheduled notification after 5 seconds
      setTimeout(async () => {
        try {
          await pushNotificationService.scheduleLocalNotification(
            'Scheduled Test',
            'This notification was scheduled 5 seconds ago',
            { type: 'scheduled' },
            0 // Send immediately since we're already waiting 5 seconds
          );
        } catch (error) {
          console.error('Scheduled notification error:', error);
        }
      }, 5000);

    } catch (error) {
      Alert.alert(
        'Error', 
        'Failed to test notifications. Check console for details.'
      );
      console.error('Notification test error:', error);
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.button, style]} 
      onPress={runNotificationTests}
      activeOpacity={0.7}
    >
      <Text style={[styles.buttonText, textStyle]}>
        🔔 Test Notifications
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default NotificationTestButton;