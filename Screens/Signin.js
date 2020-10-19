import React from 'react';
import {  Text, View,TextInput,TouchableOpacity,Alert,Image, } from 'react-native';
import db from '../config'
import firebase from 'firebase'

export default class Signin extends React.Component{
    constructor(){
        super();
        this.state={
            email:'',
            password:'',
            visual:true,
            opacity:1
            
        }
    }
    componentDidMount(){
        if(this.state.email===''&&this.state.password===''){
            this.setState({
                opacity:1
            })
        }
    }
    VerifyUserforLogin=async(emailParameter,passwordParameter)=>{
        if(emailParameter&&passwordParameter){
        try{
            const Log= await firebase.auth().signInWithEmailAndPassword(emailParameter,passwordParameter)
            if(Log){
                this.props.navigation.navigate("Welcome")
               
            }

        }
        catch(error){
            switch (error.code){
                case 'auth/user-not-found' :window.alert("User not found"),Alert.alert('Sign-up','Do not have an account yet?',[{text:"Sign-up",onPress:()=>this.props.navigation.navigate("Login")},{text:"Cancel",onPress:()=>{window.alert("Dismissed")}}])
                break
                case 'auth/wrong-password':window.alert("Invalid passowrd")
                break
                case 'auth/invalid-email':window.alert("Invalid email")
            }

        }
       
        }
        else{
            this.setState({
                opacity:1
            })
        }
    }
        
    
    render(){
        return(
            <View  >
                <Image
                source={require('./Capture.PNG')}
                style={{width:500,height:300,position:"absolute",marginLeft:650}}
                />
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
                 style={{borderBottomWidth:2,borderBottomColor:"darkgreen",width:300,height:40,marginLeft:800,marginTop:450,position:"absolute",borderRadius:0,backgroundColor:"white"}}
                 secureTextEntry={this.state.visual}
                value={this.state.password}
                 onChangeText={(x)=>{
                     this.setState({
                        password:x
                     })
                 }}
                
                />
                <TouchableOpacity onPressIn={()=>{
                    this.setState({
                        visual:false
                    })
                }} onPressOut={()=>{
                    this.setState({
                        visual:true
                    })
                }}>
                <Image
                
                    style={{width:25,height:25,position:"absolute",marginLeft:1100,marginTop:460,}}
                    source={require("./See.png")}
                    />
                    </TouchableOpacity>
                
               <TouchableOpacity style={{position:"absolute",marginTop:500,marginLeft:900,borderWidth:3,borderRadius:10,opacity:this.state.opacity}} onPress={()=>{
                   this.VerifyUserforLogin(this.state.email,this.state.password)
               }}>
                   <Text style={{fontSize:32}}>Login</Text>

                   </TouchableOpacity> 
                   <Text onPress={()=>{
                       this.props.navigation.navigate("Logup")
                   }} style={{position:"absolute",marginTop:575,marginLeft:825,color:"grey"}}>Don't have an account yet? Sign-up here</Text>
                   
            </View>
        )
    }
}
