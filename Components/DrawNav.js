import {DrawerItems} from 'react-navigation-drawer'
import {TouchableOpacity,View,Text,Image} from 'react-native'
import firebase from 'firebase'
import db from '../config.js'
import *as React from 'react'

export default class SideBarComponent extends React.Component{
    constructor(){
        super();
        this.state={
         h:firebase.auth().currentUser.email,
         id:''   
        }
    }
   getName=()=>{
    db.collection('users').where("emailID","==",this.state.h).onSnapshot((snapshot)=>{
        var IDEmail=snapshot.docs.map((document)=>
        document.data()

        )
        this.setState({
            id:document.data().ID
        })
    })
   }
   componentDidMount(){
       this.getName
   }
    
    render(){
        
        return(
            <View>
            <View style={{backgroundColor:"darkgreen"}}>
                <Text style={{fontSize:50,}}>{firebase.firestore.Timestamp.now().toDate().toTimeString().slice(0,5)}</Text>
                <Text>Your email is:{this.state.h}</Text>
            </View>   
                <View>
            <DrawerItems {...this.props}>
            
            </DrawerItems>
            <View style={{marginTop:690,fontSize:35,fontWeight:"bold",borderWidth:3,borderRadius:25,height:50,backgroundColor:"darkgreen"}} >
            <TouchableOpacity style={{width:320}} onPress={()=>{
                window.alert("Signing out")
                firebase.auth().signOut()
                this.props.navigation.navigate('Login')
            }}>
                <Text style={{fontSize:35,fontWeight:"bold",paddingLeft:"30%"}}>Logout</Text>
            </TouchableOpacity>
            </View>
            </View>
            </View>
        )
    }
}