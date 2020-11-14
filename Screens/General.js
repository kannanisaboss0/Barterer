import React from 'react';
import {  Text, View,TextInput,TouchableOpacity,Alert,Image,Modal,ScrollView, } from 'react-native';
import db from '../config'
import firebase from 'firebase'

export default class GeneralScreen extends React.Component{
    constructor(){
        super();
        this.state={
            test:firebase.auth().currentUser.email
        }
        
    }
    render(){
        return(
        <View>
            
        </View>)
    }
}