import React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,FlatList,Modal,ScrollView,Image } from 'react-native';
import {ListItem,Card} from 'react-native-elements'
//import *as Progress from 'react-native-progress'
import db from '../config.js'
import firebase from 'firebase'

export default class FriendScreen extends React.Component{
    constructor(){
        super();
        this.state={
            email:firebase.auth().currentUser.email,
            AllFriends:[],
            friendsName:''

        }
        this.requestFriends=null
    }
    getAllFriends=()=>{
        db.collection('Friends').where("YourEmail","==",this.state.email).onSnapshot((snapshot)=>{
            var FriendsList=snapshot.docs.map(document=>
                document.data()
                
            
               
            
 
             )
             
             this.setState({
                AllFriends:FriendsList
              })
         }
        
         )
    }
    
    filterFriends=()=>{
        db.collection('Friends').where("FriendsEmail","==",this.state.friendsName).get().then((snapshot)=>{
            
          var AllFriends=   snapshot.docs.map((document)=>
             document.data(),
             
             
         )
         this.setState({
             AllFriends:AllFriends,
             
         })
         })
        }
   
  
      
   
    renderItem=({item,i})=>{
      
        return(
            <View>
                
               
            <ListItem
            style={{marginTop:10}}
            title={item.FriendsEmail}
            
                    
            key={i}
            bottomDivider
            />
            </View>
        )
    }
    componentDidMount(){
      this.requestFriends=this.getAllFriends()
    }
    componentWillUnmount(){
        this.requestFriends=null
    }
    render(){
        return(
            <View>
                {this.state.AllFriends==null?
                (
                    <View>
                    <Image
                    style={{alignSelf:"center",height:200,width:200}}
                    source={require('../assets/Nothing.PNG')}
                    />
                    <Text style={{color:"grey",alignSelf:"center",fontSize:32}}>You currently have no Friends :(</Text>
                    </View>):(
                        <View>
                 <TextInput
                style={{justifyContent:"center",alignSelf:"center",color:"darkgreen",borderWidth:1,borderColor:"darkgreen",height:30,marginLeft:"-83%",borderRadius:25}}
                placeholder="Search Friends"
                placeholderTextColor="darkgreen"
                value={this.state.barterFilter}
                onChangeText={(name)=>{
                    this.setState({
                        friendsName:name
                    })
                   
                }}
                />
                 <TouchableOpacity style={{borderRadius:25,height:30,borderWidth:1,width:75,borderColor:"darkgreen",marginTop:-30}} onPress={()=>{
           this.filterFriends()
       }}>
           <Text style={{color:"darkgreen",alignSelf:"center",marginTop:5}}>Apply</Text>
       </TouchableOpacity>
                <Text>{this.state.friendsName}</Text>
                <FlatList data={this.state.AllFriends} renderItem={this.renderItem} keyExtractor={(item,index)=>{
                    index.toString()
                }}>
                    
                </FlatList>
                </View>)}
            </View>
        )
    }
}