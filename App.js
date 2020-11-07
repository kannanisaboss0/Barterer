import {createSwitchNavigator,createAppContainer} from 'react-navigation'
import {createMaterialTopTabNavigator,} from 'react-navigation-tabs'
import {createDrawerNavigator} from 'react-navigation-drawer'
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase'
import Signup from './Screens/Signup'
import Signin from './Screens/Signin'
import HomeScreen from './Screens/Home'
import RequestScreen from './Screens/RequestScreen.js'
import SideBarComponent from './Components/DrawNav.js'
import SettingScreen from './Screens/Settings.js'
import { TouchableOpacity,Image } from 'react-native';

export default class App extends React.Component {

  
  render(){
    return (
      <View style={{flex:1}}>
                <Container/>
        
      </View>
    );
  }
  }



 

const TabNavigator=createMaterialTopTabNavigator(
 
  {
  
  Home:{screen:HomeScreen,navigationOptions:{tabBarIcon:'Home'}},
  Exchange:{screen:RequestScreen,navigationOptions:{tabBarIcon:'Exchange Items'}}
 },{
   swipeEnabled:false
 }
 ) 
 const DrawerNavigator=createDrawerNavigator(
 
  {
  Main:{screen:TabNavigator,navigationOptions:{drawerIcon:<Image source={require('./assets/Homeicon.PNG')} style={{width:20,height:20}}/>,drawerLabel:'Home'}},
  Settings:{screen:SettingScreen,navigationOptions:{drawerIcon:<Image source={require('./assets/Settings.PNG')} style={{width:20,height:20}}/>,drawerLabel:'Settings'}}
  
},
{contentComponent:SideBarComponent,},

)
const Navigator=createSwitchNavigator({
  Login:{screen:Signin},
  MainPage:{screen:DrawerNavigator}
  

 

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

