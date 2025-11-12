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

const ChatScreen = () => {
  const navigation = useNavigation();
  const scrollViewRef = useRef();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hello! I\'m on my way with your order. I\'ll reach in about 10 minutes.',
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
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isUser: true,
      };
      setMessages([...messages, newMessage]);
      setMessage('');
      
      // Auto reply after 2 seconds
      setTimeout(() => {
        const autoReply = {
          id: messages.length + 2,
          text: 'Sure, I\'ll be waiting at the main gate.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isUser: false,
        };
        setMessages(prev => [...prev, autoReply]);
      }, 2000);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('../../assets/back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.agentName}>Mann Sharma</Text>
          <Text style={styles.agentStatus}>Delivery Partner • Online</Text>
        </View>
        <TouchableOpacity style={styles.callButton}>
          <Image source={require('../../assets/call.png')} style={styles.callIcon} />
        </TouchableOpacity>
      </View>

      {/* Chat Messages */}
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
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map((msg) => (
            <View
              key={msg.id}
              style={[
                styles.messageBubble,
                msg.isUser ? styles.userBubble : styles.agentBubble,
              ]}
            >
              <Text style={[
                styles.messageText,
                msg.isUser ? styles.userText : styles.agentText,
              ]}>
                {msg.text}
              </Text>
              <Text style={[
                styles.messageTime,
                msg.isUser ? styles.userTime : styles.agentTime,
              ]}>
                {msg.time}
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* Message Input */}
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 5,
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
  },
  agentStatus: {
    fontSize: 12,
    color: '#259E29',
    marginTop: 2,
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
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 20,
    paddingBottom: 10,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 18,
    marginBottom: 15,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 5,
  },
  agentBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
    borderBottomLeftRadius: 5,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  userText: {
    color: '#fff',
  },
  agentText: {
    color: '#000',
  },
  messageTime: {
    fontSize: 10,
    marginTop: 5,
    opacity: 0.7,
  },
  userTime: {
    color: '#fff',
    textAlign: 'right',
  },
  agentTime: {
    color: '#666',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 15,
    paddingBottom: Platform.OS === 'ios' ? 25 : 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
    paddingTop: 12,
    maxHeight: 100,
    fontSize: 14,
    backgroundColor: '#f8f8f8',
    marginRight: 10,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#ccc',
  },
  sendIcon: {
    width: 20,
    height: 20,
    tintColor: '#fff',
    marginLeft: 2,
  },
  sendIconDisabled: {
    tintColor: '#999',
  },
});