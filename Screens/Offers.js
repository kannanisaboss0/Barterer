import React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,FlatList,Modal,ScrollView,Image } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker'
import {ListItem,Card,Badge} from 'react-native-elements'
//import *as Progress from 'react-native-progress'
import db from '../config.js'
import firebase from 'firebase'

export default class Offers extends React.Component{
    constructor(){
        super();
        this.state={
            AllNotifications:[],
            email:firebase.auth().currentUser.email,
            choice:'Accept'

        }
        this.requestNotifications=null
    }
   
    getAllNotifications=()=>{
        db.collection("Desicions").where("RequesterEmail","==",this.state.email).get().then((snapshot)=>{
            var AllNotifications=snapshot.docs.map((document)=>
                document.data()
            )
            this.setState({
                AllNotifications:AllNotifications
            })
        })
    }
    componentDidMount(){
        this.requestNotifications=this.getAllNotifications()
    }
    componentWillMount(){
        this.requestNotifications=null
    }
    renderItem=({item,i})=>{
        return(
            <ListItem
            
            key={i}
            
        title={item.Declined==="Decline"?(<Text>{item.ExchangerEmail} +has declined</Text>):<Text>{item.ExchangerEmail } + has accetped</Text>}
            subtitle={item.Statement?
                <Text>{item.Statement}</Text>:
        <Text style={{fontWeight:"bold",color:"darkgreen"}}>No Statement</Text>
        
        }
            
         
          
            bottomDivider
            />        )
        
    }
    render(){
        return(
            <View>
                {this.state.AllNotifications.length===0?(
                    <View>
                        <Image
                    style={{alignSelf:"center",height:200,width:200}}
                    source={require('../assets/Nothing.PNG')}
                    />
                    <Text style={{color:"grey",alignSelf:"center",fontSize:32}}>No New Notifications</Text>
                    </View>
                ):
                <FlatList
                
                data={this.state.AllNotifications}
                renderItem={this.renderItem}
                keyExtractor={(item,index)=>{
                    index.toString()
                }}
                ></FlatList>

                }
                
            </View>
        )
    }
}