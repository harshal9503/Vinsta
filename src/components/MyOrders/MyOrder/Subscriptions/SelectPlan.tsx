import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SelectPlan = () => {
  const navigation = useNavigation();

  const handleNextPress = () => {
    navigation.navigate('PlanDetails'); // make sure 'NextScreen' is defined in your navigation stack
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>SelectPlan</Text>
      <Button title="Next" onPress={handleNextPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // vertical center
    alignItems: 'center', // horizontal center
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default SelectPlan;
