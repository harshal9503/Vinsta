import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../../theme/colors';
import { ThemeContext } from '../../../theme/ThemeContext';

const { width, height } = Dimensions.get('window');

const Language = () => {
  const navigation = useNavigation<any>();
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const { theme } = useContext(ThemeContext);

  const languages = [
    { id: 1, code: 'english', name: 'English', nativeName: 'English' },
    { id: 5, code: 'hindi', name: 'Hindi', nativeName: 'हिन्दी' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={theme.isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />

      <View style={[styles.header, { backgroundColor: theme.background }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../assets/back.png')}
            style={[styles.backIcon, { tintColor: theme.text }]}
          />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Language
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Select Language
        </Text>
        <Text style={[styles.sectionDescription, { color: theme.text }]}>
          Choose your preferred language for the app
        </Text>

        {languages.map(language => (
          <TouchableOpacity
            key={language.id}
            style={[
              styles.languageOption,
              selectedLanguage === language.code && styles.selectedLanguage,
              { backgroundColor: theme.cardBackground },
            ]}
            onPress={() => setSelectedLanguage(language.code)}
          >
            <View style={styles.languageLeft}>
              <View style={styles.languageInfo}>
                <Text style={[styles.languageName, { color: theme.text }]}>
                  {language.name}
                </Text>
                <Text
                  style={[
                    styles.languageNative,
                    { color: theme.textSecondary },
                  ]}
                >
                  {language.nativeName}
                </Text>
              </View>
            </View>
            <View style={styles.radioContainer}>
              <View
                style={[
                  styles.radio,
                  selectedLanguage === language.code && styles.radioSelected,
                ]}
              >
                {selectedLanguage === language.code && (
                  <View style={styles.radioInner} />
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <View
          style={[
            styles.noteContainer,
            {
              backgroundColor: theme.cardBackground,
              borderLeftColor: COLORS.primary,
            },
          ]}
        >
          <Text style={[styles.noteTitle, { color: theme.text }]}>Note:</Text>
          <Text style={[styles.noteText, { color: theme.text }]}>
            Changing the language will affect all text within the app. Some
            features may require restarting the app to fully apply the language
            changes.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? height * 0.07 : height * 0.07,
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
  },
  backIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: width * 0.045,
    fontFamily: 'Figtree-Bold',
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: width * 0.05,
    fontFamily: 'Figtree-Bold',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: width * 0.035,
    fontFamily: 'Figtree-SemiBold',
    marginBottom: 25,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: 'transparent',
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: { elevation: 3 },
    }),
  },
  selectedLanguage: {
    borderColor: COLORS.primary,
  },
  languageLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: width * 0.038,
    fontFamily: 'Figtree-SemiBold',
    marginBottom: 4,
  },
  languageNative: {
    fontSize: width * 0.032,
    fontFamily: 'Figtree-Regular',
  },
  radioContainer: {
    marginLeft: 10,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: COLORS.primary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  noteContainer: {
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    borderLeftWidth: 4,
  },
  noteTitle: {
    fontSize: width * 0.035,
    fontFamily: 'Figtree-Bold',
    marginBottom: 8,
  },
  noteText: {
    fontSize: width * 0.032,
    lineHeight: 18,
    fontFamily: 'Figtree-Regular',
  },
});

export default Language;
