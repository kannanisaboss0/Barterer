import React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,FlatList,Modal,ScrollView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker'
import {ListItem,Card} from 'react-native-elements'
//import *as Progress from 'react-native-progress'
import db from '../config.js'
import firebase from 'firebase'

export default class Notifications extends React.Component{
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
        db.collection("Notifications").where("ExchangerEmail","==",this.state.email).get().then((snapshot)=>{
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
            title={item.RequesterEmail +" is interested in exchanging "+item.itemName}
            subtitle={item.ReasonForRequest}
            rightElement={
                (
                    
                <DropDownPicker
                style={{height:10}}
                items={[
                    {label:'Accept',value:'Accept'},
                    {label:'Decline',value:'Decline'},
                   
                ]}
                onChangeItem={(item)=>{
                    this.setState({
                        choice:item.value
                    })
                }}
                itemStyle={{borderBottomwidth:2,borderBottomColor:"darkgreen",color:"darkgreen"}}
                placeholder="Accept or Decline Offer"
                >
                    </DropDownPicker>
                   
                )
}
            rightAvatar={<TouchableOpacity onPress={()=>{
                db.collection("Desicions").add({
                    "RequesterEmail":item.RequesterEmail,
                    "ExchangerEmail":firebase.auth().currentUser.email,
                    "Declined":this.state.choice
                })
            }}><Text>Send</Text></TouchableOpacity>}
            bottomDivider
            />        )
        
    }
    render(){
        return(
            <View>
                {this.state.AllNotifications.length===0?(
                    <Text style={{color:"grey",alignSelf:"center",fontSize:32}}>No New Notifications</Text>
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