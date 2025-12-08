import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../theme/colors';

const { width, height } = Dimensions.get('window');
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight;

const ChatScreen = () => {
  const navigation = useNavigation();
  const scrollViewRef = useRef();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm on my way with your order. I'll reach in about 10 minutes.",
      time: '10:55 AM',
      isUser: false,
    },
    {
      id: 2,
      text: 'Okay, thanks for the update!',
      time: '10:56 AM',
      isUser: true,
    },
    {
      id: 3,
      text: 'Could you please share your exact location?',
      time: '10:57 AM',
      isUser: false,
    },
  ]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        isUser: true,
      };
      setMessages([...messages, newMessage]);
      setMessage('');

      // Auto reply after 2 seconds
      setTimeout(() => {
        const autoReply = {
          id: messages.length + 2,
          text: "Sure, I'll be waiting at the main gate.",
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          isUser: false,
        };
        setMessages(prev => [...prev, autoReply]);
      }, 2000);
    }
  };

  // 🔥 NEW — Responsive calculations matching TrackOrder
  const headerTop = STATUS_BAR_HEIGHT + 10;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent
      />

      {/* 🔥 FIXED — Header matching TrackOrder exact positioning */}
      <View style={[styles.header, { top: headerTop }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Image
            source={require('../../assets/back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.agentName}>Mann Sharma</Text>
          <Text style={styles.agentStatus}>Delivery Partner • Online</Text>
        </View>
        <TouchableOpacity style={styles.callButton}>
          <Image
            source={require('../../assets/call.png')}
            style={styles.callIcon}
          />
        </TouchableOpacity>
      </View>

      {/* 🔥 FIXED — Chat container with proper spacing */}
      <KeyboardAvoidingView
        style={styles.chatContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({ animated: true })
          }
        >
          {messages.map(msg => (
            <View
              key={msg.id}
              style={[
                styles.messageBubble,
                msg.isUser ? styles.userBubble : styles.agentBubble,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  msg.isUser ? styles.userText : styles.agentText,
                ]}
              >
                {msg.text}
              </Text>
              <Text
                style={[
                  styles.messageTime,
                  msg.isUser ? styles.userTime : styles.agentTime,
                ]}
              >
                {msg.time}
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* 🔥 FIXED — Input container matching TrackOrder spacing */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message..."
            placeholderTextColor="#999"
            multiline
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              !message.trim() && styles.sendButtonDisabled,
            ]}
            onPress={sendMessage}
            disabled={!message.trim()}
          >
            <Image
              source={require('../../assets/send.png')}
              style={[
                styles.sendIcon,
                !message.trim() && styles.sendIconDisabled,
              ]}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  // 🔥 NEW — Header positioned exactly like TrackOrder
  header: {
    position: 'absolute',
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingVertical: 12,
    borderRadius: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    width: 22,
    height: 22,
    tintColor: '#000',
  },
  headerInfo: {
    flex: 1,
    marginLeft: 15,
  },
  agentName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    fontFamily: 'Figtree-Bold',
  },
  agentStatus: {
    fontSize: 12,
    color: '#259E29',
    marginTop: 2,
    fontFamily: 'Figtree-SemiBold',
    fontWeight: '600',
  },
  callButton: {
    padding: 8,
    backgroundColor: '#f8f8f8',
    borderRadius: 20,
  },
  callIcon: {
    width: 20,
    height: 20,
    tintColor: COLORS.primary,
  },

  chatContainer: {
    flex: 1,
    marginTop: 120, // 🔥 FIXED — Proper spacing after header
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 20,
    paddingTop: 20, // 🔥 FIXED — Extra top padding
    paddingBottom: 120, // 🔥 FIXED — Space for input
  },

  messageBubble: {
    maxWidth: '80%',
    padding: 14, // 🔥 FIXED — Better padding
    borderRadius: 20,
    marginBottom: 16, // 🔥 FIXED — Better spacing
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 6,
  },
  agentBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#f1f3f6', // 🔥 FIXED — Better agent bubble color
    borderBottomLeftRadius: 6,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Figtree-Regular',
    fontWeight: '400',
  },
  userText: {
    color: '#fff',
  },
  agentText: {
    color: '#1a1a1a', // 🔥 FIXED — Better contrast
  },
  messageTime: {
    fontSize: 11, // 🔥 FIXED — Slightly smaller
    marginTop: 6,
    opacity: 0.8,
    fontFamily: 'Figtree-Regular',
    fontWeight: '400',
  },
  userTime: {
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'right',
  },
  agentTime: {
    color: '#666',
  },

  // 🔥 FIXED — Input matching TrackOrder agent section style
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 18,
    paddingBottom: Platform.OS === 'ios' ? 30 : 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 25,
    paddingHorizontal: 18,
    paddingVertical: 14,
    maxHeight: 100,
    fontSize: 14,
    backgroundColor: '#f8f9fa',
    marginRight: 12,
    fontFamily: 'Figtree-Regular',
    fontWeight: '400',
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#ccc',
  },
  sendIcon: {
    width: 22,
    height: 22,
    tintColor: '#fff',
  },
  sendIconDisabled: {
    tintColor: '#999',
  },
});
