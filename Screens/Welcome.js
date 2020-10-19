import React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,FlatList } from 'react-native';
//import *as Progress from 'react-native-progress'
import db from '../config.js'
import firebase from 'firebase'

export default class WelcomeScreen extends React.Component{
constructor(){
    super();
    this.state={
        x:''
    }
}
    
    render(){
        return(
            <View>
                <Text>Welcome to Barterer!</Text>
        <Text>{this.state.x}</Text>
            </View>
        )
    }
}