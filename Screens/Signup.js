import React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,FlatList } from 'react-native';
//import *as Progress from 'react-native-progress'
import db from '../config.js'
import firebase from 'firebase'

export default class Signup extends React.Component{
    constructor(){
        super();
        this.state={
            email:'',
            password:'',
            allowed:false,
            passColor:"green",
            text:'Password valid',
            array:[
            Math.random(1000000000,1000000000000)*2345,
            Math.random(1000000000,99999999999)*234,
             Math.random(1000000000,99999999999)*432,
             Math.random(1000000000,99999999999)*324,
             Math.random(1000000000,99999999999)*789,
             
            ]
        }
    }
    VerifyUserforSignUp= async(mail,pass)=>{
        if(mail&&pass){
            try{
            const Log= await firebase.auth().createUserWithEmailAndPassword(mail,pass)
            if(Log){
                this.props.navigation.navigate("Welcome",{id:this.state.email})
            }
            else{
                window.alert("Invalid password, try using suggested passwords below")
            }
        }
        catch(error){
            switch(error.code){
                case 'auth/account-already-exists':window.alert("Account already exists, try using the suggested passwords below")
            }
        }
        }
    }

    render(){
        return(
        <View>
              
                <TextInput
                placeholder="Email Address"
                placeholderTextColor="darkgreen"
                style={{borderBottomWidth:2,borderBottomColor:"darkgreen",width:300,height:40,marginLeft:800,marginTop:400,position:"absolute"}}
                value={this.state.email}
                keyboardType={"email-address"}
                onChangeText={(x)=>{
                    this.setState({
                       email:x
                    })
                    
                }}
                />
           <TextInput
           placeholder="Password"
           placeholderTextColor="darkgreen"
           style={{borderBottomWidth:2,borderBottomColor:this.state.passColor,width:300,height:40,marginLeft:800,marginTop:450,position:"absolute",borderRadius:0,backgroundColor:"white"}}
           value={this.state.password}
           onChangeText={(x)=>{
               this.setState({
                   password:x
            })
            if(this.state.password.length<8){
                this.setState({
                    passColor:"red",
                    allowed:false,
                    text:'Password must at minimum be 8 characters long'
                })
            
             }
             else{
                this.setState({
                    passColor:"green",
                    allowed:true,
                    text:'Password valid'
                })   
            }   
           }
        
        }
        
           />
           <TouchableOpacity style={{position:"absolute",marginTop:500,marginLeft:845,borderWidth:3,borderRadius:10,opacity:this.state.opacity}} onPress={()=>{
                   this.VerifyUserforSignUp(this.state.email,this.state.password)
               }}>
                   <Text style={{fontSize:32}}>Create Account</Text>

                   </TouchableOpacity> 
                   
                   
                   <Text style={{color:this.state.passColor,marginLeft:800,marginTop:440,position:"absolute",fontSize:10}}>{this.state.text}</Text>
               <View style={{height:200,width:200,marginTop:600,position:"absolute",marginLeft:850}}>
                   <Text style={{color:"darkgreen"}}>Suggested Passwords</Text>
                   
                   <FlatList style={{borderBottomWidth:2,borderBottomColor:"darkgreen"}} data={this.state.array} renderItem={({index})=>(
                      <View>
                          <Text  style={{borderBottomWidth:2}}>{index+1}{this.state.array[1]}</Text>
                          <Text>{this.state.array[2]}</Text>
                          <Text>{this.state.array[3]}</Text>
                          <Text>{this.state.array[4]}</Text>
                          <Text>{this.state.array[5]}</Text>
                          
                      </View>
                   )

                   } onEndReachedThreshold={0.3} >
                       
                   </FlatList>
                   </View>
        </View>
        )
    }
}