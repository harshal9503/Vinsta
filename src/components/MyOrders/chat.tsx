import React, { useState, useRef, useContext } from 'react';
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
import { ThemeContext } from '../../theme/ThemeContext';

const { width, height } = Dimensions.get('window');
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight;

const ChatScreen = () => {
  const navigation = useNavigation();
  const { theme, isDarkMode } = useContext(ThemeContext);
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

  const headerTop = STATUS_BAR_HEIGHT + 10;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar
        backgroundColor="transparent"
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        translucent
      />

      <View style={[styles.header, { top: headerTop, backgroundColor: theme.cardBackground }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image
            source={require('../../assets/back.png')}
            style={[styles.backIcon, { tintColor: theme.text }]}
          />
        </TouchableOpacity>

        <View style={styles.headerInfo}>
          <Text style={[styles.agentName, { color: theme.text }]}>Mann Sharma</Text>
          <Text style={[styles.agentStatus]}>Delivery Partner • Online</Text>
        </View>

        <TouchableOpacity style={[styles.callButton, { backgroundColor: theme.cardBackground }]}>
          <Image
            source={require('../../assets/call.png')}
            style={[styles.callIcon, { tintColor: COLORS.primary }]}
          />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={styles.chatContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ScrollView
          ref={scrollViewRef}
          style={[styles.messagesContainer]}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map(msg => {
            const isSpecial = (msg.id === 1 || msg.id === 3) && !msg.isUser;

            return (
              <View
                key={msg.id}
                style={[
                  styles.messageBubble,

                  msg.isUser
                    ? styles.userBubble
                    : [
                      styles.agentBubble,
                      isDarkMode && { backgroundColor: '#1A1A1A' },
                      isDarkMode && isSpecial && { backgroundColor: '#2A2A2A' }
                    ],
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    msg.isUser ? styles.userText : styles.agentText,
                    { color: msg.isUser ? '#fff' : theme.text }
                  ]}
                >
                  {msg.text}
                </Text>

                <Text
                  style={[
                    styles.messageTime,
                    msg.isUser ? styles.userTime : styles.agentTime,
                    isDarkMode && isSpecial && { color: '#BBBBBB' }
                  ]}
                >
                  {msg.time}
                </Text>
              </View>
            );
          })}
        </ScrollView>

        <View style={[styles.inputContainer, {
          backgroundColor: theme.cardBackground,
        }]}>
          <TextInput
            style={[
              styles.textInput,
              { backgroundColor: isDarkMode ? "#313131ff" : "#fff" }
            ]}
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message..."
            placeholderTextColor={isDarkMode ? "#999" : "#666"}
            multiline
          />

          <TouchableOpacity
            style={[
              styles.sendButton,
              !message.trim() && styles.sendButtonDisabled
            ]}
            onPress={sendMessage}
            disabled={!message.trim()}
          >
            <Image
              source={require('../../assets/send.png')}
              style={[
                styles.sendIcon,
                !message.trim() && styles.sendIconDisabled
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
  container: { flex: 1 },

  header: {
    position: 'absolute',
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 10,
    paddingVertical: 12,
    borderRadius: 15,
    elevation: 5,
  },

  backButton: { padding: 8 },

  backIcon: { width: 22, height: 22 },

  headerInfo: { flex: 1, marginLeft: 15 },

  agentName: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Figtree-Bold',
  },

  agentStatus: {
    fontSize: 12,
    marginTop: 2,
    color: '#259E29',
    fontFamily: 'Figtree-SemiBold',
  },

  callButton: {
    padding: 8,
    borderRadius: 20,
  },

  callIcon: { width: 20, height: 20 },

  chatContainer: { flex: 1, marginTop: 120 },

  messagesContainer: { flex: 1 },

  messagesContent: {
    padding: 20,
    paddingBottom: 120,
  },

  messageBubble: {
    maxWidth: '80%',
    padding: 14,
    borderRadius: 20,
    marginBottom: 16,
  },

  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 6,
  },

  agentBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#f1f3f6',
    borderBottomLeftRadius: 6,
  },

  messageText: { fontSize: 14, lineHeight: 20 },

  userText: { color: '#fff' },

  agentText: { color: '#1a1a1a' },

  messageTime: {
    fontSize: 11,
    marginTop: 6,
    opacity: 0.8,
  },

  userTime: { color: 'rgba(255,255,255,0.9)', textAlign: 'right' },

  agentTime: { color: '#666' },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 18,
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    //borderTopWidth: 1,
  },

  textInput: {
    flex: 1,
    //borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 18,
    paddingVertical: 14,
    maxHeight: 100,
    fontSize: 14,
    marginRight: 12,
  },

  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  sendButtonDisabled: { backgroundColor: '#ccc' },

  sendIcon: { width: 22, height: 22, tintColor: '#fff' },

  sendIconDisabled: { tintColor: '#999' },
});
