import {createSwitchNavigator,createAppContainer} from 'react-navigation'
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase'
import Signup from './Screens/Signup'
import Signin from './Screens/Signin'
import WelcomeScreen from './Screens/Welcome'

export default class App extends React.Component {
  render(){
    return (
      <View >
        <Container/>
      </View>
    );
  }
  }
 const Navigator=createSwitchNavigator({
  Login:Signin,
  Logup:Signup,
  Welcome:WelcomeScreen
 })
const Container = createAppContainer(Navigator)



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
