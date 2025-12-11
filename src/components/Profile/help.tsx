import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform, Dimensions } from "react-native";
import { ThemeContext } from "../../theme/ThemeContext";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get('window');

const HelpScreen = () => {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation();

  return (

    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View
        style={[
          styles.header,
          { backgroundColor: theme.background, borderBottomColor: theme.borderColor },
        ]}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/back.png')}
            style={[styles.backIcon, { tintColor: theme.text }]}
          />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Help</Text>
        <View style={{ width: 22 }} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>Help & Support</Text>

        <Text style={[styles.paragraph, { color: theme.text }]}>
          This is a dummy help screen. You can add FAQs, contact information,
          troubleshooting steps, or any support-related content here.
        </Text>

        <View style={[styles.box, { backgroundColor: theme.cardBackground }]}>
          <Text style={[styles.boxText, { color: theme.text }]}>
            ✔ App Usage Guide
          </Text>
        </View>

        <View style={[styles.box, { backgroundColor: theme.cardBackground }]}>
          <Text style={[styles.boxText, { color: theme.text }]}>
            ✔ Troubleshooting Tips
          </Text>
        </View>

        <View style={[styles.box, { backgroundColor: theme.cardBackground }]}>
          <Text style={[styles.boxText, { color: theme.text }]}>
            ✔ Contact Support
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default HelpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? height * 0.07 : height * 0.05,
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  backIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: width * 0.045,
    fontWeight: '700',
    fontFamily: 'Figtree-Bold',
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 15,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 22,
  },
  box: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  boxText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
