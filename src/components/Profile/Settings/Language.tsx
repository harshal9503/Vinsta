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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../../theme/colors';
import font from '../../../assets/fonts'
import { ThemeContext } from '../../../theme/ThemeContext';

const { width, height } = Dimensions.get('window');

const Language = () => {
  const navigation = useNavigation<any>();
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const {theme} = useContext(ThemeContext);

  const languages = [
    { id: 1, code: 'english', name: 'English', nativeName: 'English' },
    { id: 5, code: 'hindi', name: 'Hindi', nativeName: 'हिन्दी' },
  ];

  return (
    <View style={[styles.container,{backgroundColor : theme.background}]}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      <View style={[styles.header,{backgroundColor  :theme.background}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../../assets/back.png')} style={[styles.backIcon,{tintColor : '#000000'}]} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle,{color : '#616161'}]}>Language</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={[styles.sectionTitle,{color : '#616161'}]}>Select Language</Text>
        <Text style={[styles.sectionDescription,{color : '#616161'}]}>
          Choose your preferred language for the app
        </Text>

        {languages.map((language) => (
          <TouchableOpacity
            key={language.id}
            style={[
              styles.languageOption,
              selectedLanguage === language.code && styles.selectedLanguage,
              {backgroundColor  :theme.background}
            ]}
            onPress={() => setSelectedLanguage(language.code)}
          >
            <View style={styles.languageLeft}>
              <View style={styles.languageInfo}>
                <Text style={[styles.languageName,{color : '#616161'}]}>{language.name}</Text>
                <Text style={[styles.languageNative,{color : '#616161'}]}>{language.nativeName}</Text>
              </View>
            </View>
            <View style={styles.radioContainer}>
              <View
                style={[
                  styles.radio,
                  selectedLanguage === language.code && styles.radioSelected,
                ]}
              >
                {selectedLanguage === language.code && <View style={styles.radioInner} />}
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.noteContainer}>
          <Text style={[styles.noteTitle,{color : '#616161'}]}>Note:</Text>
          <Text style={[styles.noteText,{color : '#616161'}]}>
            Changing the language will affect all text within the app. Some features may require restarting the app to fully apply the language changes.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: height * 0.07,
    paddingBottom: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS.secondary,
  },
  backIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    tintColor: '#000000',
  },
  headerTitle: {
    fontSize: width * 0.045,
    fontWeight: '700',
    color: '#616161',
    fontFamily : 'Figtree-Bold',
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: width * 0.05,
    fontWeight: '700',
    color: '#616161',
    marginBottom: 8,
    fontFamily : 'Figtree-Bold',
  },
  sectionDescription: {
    fontSize: width * 0.035,
    color: '#616161',
    marginBottom: 25,
    fontFamily : 'Figtree-SemiBold',
    fontWeight  :'600'
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedLanguage: {
    borderColor: COLORS.primary,
    backgroundColor: '#f0f7ff',
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
    fontWeight: '600',
    color: '#616161',
    marginBottom: 4,
    fontFamily : 'Figtree-SemiBold',
  },
  languageNative: {
    fontSize: width * 0.032,
    color: '#616161',
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
    backgroundColor: '#fff8e1',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#ffb300',
  },
  noteTitle: {
    fontSize: width * 0.035,
    fontWeight: '700',
    color: '#616161',
    marginBottom: 8,
    fontFamily : 'Figtree-Bold',
  },
  noteText: {
    fontSize: width * 0.032,
    color: '#616161',
    lineHeight: 18,
    fontFamily : 'Figtree-Regular',
    fontWeight  :'400'
  },
});

export default Language;