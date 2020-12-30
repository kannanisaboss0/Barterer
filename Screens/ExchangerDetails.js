import React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,FlatList,Modal,ScrollView, } from 'react-native';
import {ListItem,Card,} from 'react-native-elements'
//import *as Progress from 'react-native-progress'
import db from '../config.js'
import firebase from 'firebase'

export default class ExchangerDetailsScreen extends React.Component{
    constructor(){
        super();
        this.state={
            contact:'',
            address:'',
            name:'User',
            date:'',
            description:'',
            object:'',
            price:'',
            id:'',
            email:firebase.auth().currentUser.email,
            email2:'',
            reasonForRequest:''
            




        }
    }
getExchangerDetails=()=>{
    var email=this.props.navigation.getParam('Item')["Email"]
    var name=this.props.navigation.getParam('Item')["Name"]
    
    db.collection('users').where("emailID","==",email).get().then((snapshot)=>{
        snapshot.forEach((document)=>{
            var data=document.data();
            this.setState({
                contact:data.contact,
                address:data.Address,
                name:data.Account,
                email2:email
               

            })
        })
    })
    db.collection('requests').where("Name","==",name).get().then((snapshot)=>{
        snapshot.forEach((document)=>{
            var data=document.data();
            this.setState({
                description:data.Description,
                object:name,
                price:data.Price,
                date:data.Time,
                id:document.id
            })
        })
    })
}
Idgenerator=()=>{
    return(
        Math.random().toString(36).substring(1,36)
    )
}

componentDidMount(){
    this.getExchangerDetails()
    if(this.state.reasonForRequest.length>=200){
        window.alert("Word limit exceeded")
        
    }
}

    render(){
        return(
            <View>
                {this.state.email!==this.state.email2?(
          <Card
            title={this.state.object}
            titleStyle={{fontSize:32,fontWeight:"bold",color:"darkgreen"}}
            
          >
              <Text onPress={()=>{this.props.navigation.navigate('Main')}} style={{color:"grey"}}>Return to main menu</Text>
              <Text style={{fontSize:17,color:"darkgreen"}}>By:{this.state.name}</Text>

              <Text style={{color:"darkgreen",}} onPress={()=>{
                    this.props.navigation.navigate('Friends')
                    db.collection("Friends").doc(this.state.name).set({
                    "FriendsEmail":this.state.name,
                    "YourEmail":this.state.email,
                   })
             
                 
              }} >Add to friends</Text>

              <Text style={{fontSize:17,color:"darkgreen"}}>Contact:{this.state.contact}</Text>
              <Text style={{fontSize:17,color:"darkgreen"}}>Address:{this.state.address}</Text>
              <Text style={{fontSize:17,color:"darkgreen"}}>Date Added:{this.state.date}</Text>   
              <ScrollView style={{height:100,borderColor:"darkgreen",borderWidth:1,width:500}}> 
           <Text style={{fontSize:15,color:"darkgreen"}}>{this.state.description}</Text>   
           </ScrollView> 
           <TextInput
            style={{ width:"75%",height:50,alignSelf:"center",borderColor:"darkgreen",borderWidth:1,padding:10,}}
            numberOfLines={5}
            maxLength={200}
            clearButtonMode={"while-editing"}
            multiline={true}
           placeholder="Reason for requesting"
           value={this.state.reasonForRequest}
           onChangeText={(x)=>{
               this.setState({
                reasonForRequest:x
               })
            
           }}
           />
           <Text style={{color:"darkgreen",fontWeight:"bold"}}>Words written:{this.state.reasonForRequest.length}/200</Text>
           <TouchableOpacity onPress={()=>{
               db.collection('Barters').add({
                   "name":this.state.name,
                   "date":firebase.firestore.Timestamp.now().toDate(),
                   "item":this.state.object,
                   "status":"Not Available",
                   "contact":this.state.contact,
                   "email":this.state.email,
                   "UserStatus":"Undecided",
                   "ident":this.Idgenerator()
                   
                   
               })
               db.collection('requests').doc(this.state.id).update({
                "status":"Not Available"
               })
               var email=this.props.navigation.getParam('Item')["Email"]
               var name=this.props.navigation.getParam('Item')["Name"]
               db.collection('Notifications').add({
                   "RequesterEmail":firebase.auth().currentUser.email,
                   "ExchangeEmail":email,
                   "Date":firebase.firestore.Timestamp.now().toDate().toString().slice(0,21),
                   "Item":this.state.object,
                   "Reason":this.state.reasonForRequest,
                   "Contact":this.state.contact,
                   "ident":this.Idgenerator(),
                   "status":"unread"
                   
                   


               })
               this.props.navigation.navigate('Exchanged')
           }}  style={{alignItems:"center",alignSelf:"center",width:"25%",borderWidth:2,borderColor:"darkgreen",height:40,justifyContent:"space-between"}}>
            <Text style={{alignSelf:"center",fontSize:32,justifyContent:"space-around",marginTop:-5,color:"darkgreen"}}>
                Exchange
            </Text>
            </TouchableOpacity >            
           
             
            </Card>
                ):
                <Card title="User Info">
                    <Text>Barter actions conducted between users of same identity is not possible.</Text>
                    <Text onPress={()=>{
                        this.props.navigation.navigate('Main')
                    }}>Back to main menu</Text>

                </Card>
    }
            </View>
        )
    }
}