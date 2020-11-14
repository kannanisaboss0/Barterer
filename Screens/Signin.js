import React from 'react';
import {  Text, View,TextInput,TouchableOpacity,Alert,Image,Modal,ScrollView, } from 'react-native';
import db from '../config'
import firebase from 'firebase'

export default class Signin extends React.Component{
    constructor(){
        super();
        this.state={
            email:'',
            password:'',
            visual:true,
            viewOpacity:1,
            modalVisible:false,
            signUpEmail:''+'@gmail.com',
            signUpPassword:'',
            modalOpacity:1,
            fullName:'',
            userName:'',
            contact:'',
            address:'',
            text:'Password valid',
            passColor:"green",
            confirmSignUpPassword:'',
            multiline:false,
            isUserNew:false,
           


            
        }
    }
    componentDidMount(){
        
    }
    VerifyUserforLogin=async(emailParameter,passwordParameter)=>{
        if(emailParameter&&passwordParameter){
        try{
            const Log= await firebase.auth().signInWithEmailAndPassword(emailParameter,passwordParameter)
            if(Log){
                this.setState({
                    isUserNew:false
                })
                this.props.navigation.navigate("Home",{id:this.state.isUserNew})
                db.collection("logs").add({
                    "Account":this.state.userName,
                    "Fullname":this.state.fullName,
                    "emailID":firebase.auth().currentUser,
                    "DateofLogin":firebase.firestore.Timestamp.now().toDate()

                })
               
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
        
    }
    Idgenerator=()=>{
        return(
            Math.random().toString(36).substring(1,36)
        )
    }
    VerifyUserforSignUp= async(mail,pass,confirmedPass)=>{
        if(pass!==confirmedPass){
            Alert.alert("Password does not match. Please correct and try again")
            window.alert("Password does not match. Please correct and try again.")
        }
        else{
        if(mail&&pass){
            try{
            const Log= await firebase.auth().createUserWithEmailAndPassword(mail,pass)
            if(Log){
                this.setState({
                    isUserNew:true
                })
                this.props.navigation.navigate("Home",{id:this.state.isUserNew})
                var iD=this.Idgenerator()
                db.collection("users").add({
                    "Account":this.state.userName,
                    "Fullname":this.state.fullName,
                    "emailID":this.state.signUpEmail,
                    "password":this.state.signUpPassword,
                    "contact":this.state.contact,
                    "ID":iD,
                    "Address":this.state.address,
                    "DateofLogin":firebase.firestore.Timestamp.now().toDate()

                })
            }
            else{
                window.alert("Invalid password, try using suggested passwords below")
            }
        }
        catch(error){
            switch(error.code){
                case 'auth/account-already-exists':window.alert("Account already exists, try using the suggested passwords below")
                break
            }
        }
        }
    }
}
    ShowSignUpModal=()=>{
        if(this.state.modalVisible===true){
        return(
          
            <Modal
            
            animationType="slide"
            transparent={false}
            visible={false}
            style={{flex:0,width:"200%",marginLeft:"220%",backgroundColor:"white",marginTop:400,height:500,borderRadius:25,borderWidth:2,borderColor:"darkgreen",}}
            >
             <View style={{opacity:this.state.modalOpacity}} >
                 <Text style={{justifyContent:"center",alignSelf:"center",fontSize:30,color:"darkgreen",margin:50,borderWidth:1,borderColor:"darkgreen"}}>Sign Up</Text>
                 <Text onPress={()=>{
                        this.setState({
                            multiline:true
                        })
                 }} style={{color:"grey",position:"absolute",marginTop:350,marginLeft:300}}>
                     Not enough space?
                 </Text>
                 <Text style={{position:"absolute",marginTop:120,fontWeight:"bold",color:"darkgreen"}}>________________________________________________________________________________________________________</Text>
                <Text style={{color:this.state.passColor,marginTop:260,position:"absolute",marginLeft:0,fontSize:10}}>{this.state.text}</Text>
                 <TextInput
                 a
                 placeholder="Account Name"
                 placeholderTextColor="darkgreen"
                 style={{borderBottomWidth:2,borderBottomColor:"darkgreen",width:300,height:40}}
                 value={this.state.userName}
                 onChangeText={(name)=>{
                    this.setState({
                        userName:name
                    })
                 }}
                 />
                 <TextInput
                 placeholder="Full Name"
                 placeholderTextColor="darkgreen"
                 style={{borderBottomWidth:2,borderBottomColor:"darkgreen",width:300,height:40}}
                 value={this.state.fullName}
                 onChangeText={(name)=>{
                    this.setState({
                        fullName:name
                    })
                 }}
                 />
             <TextInput
                placeholder="Email Address"
                placeholderTextColor="darkgreen"
                style={{borderBottomWidth:2,borderBottomColor:"darkgreen",width:300,height:40}}
                value={this.state.signUpEmail}
                keyboardType={"email-address"}
                onChangeText={(x)=>{
                    this.setState({
                       signUpEmail:x
                    })
                    
                }}
                />
           <TextInput
           placeholder="Password"
           placeholderTextColor="darkgreen"
           style={{borderBottomWidth:2,borderBottomColor:this.state.passColor,width:300,height:40,borderRadius:0,backgroundColor:"white"}}
           value={this.state.signUpPassword}
           
           onChangeText={(x)=>{
               this.setState({
                   signUpPassword:x
            })
            if(this.state.signUpPassword.length<8){
                this.setState({
                    passColor:"red",
                    allowed:false,
                    text:'Password must at minimum be 9 characters long'
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
            <TextInput
                 placeholder="Contact Number"
                 keyboardType={"numeric"}
                 placeholderTextColor="darkgreen"
                 style={{borderBottomWidth:2,borderBottomColor:"darkgreen",width:300,height:40}}
                 value={this.state.contact}
                 onChangeText={(number)=>{
                    this.setState({
                        contact:number
                    })
                 }}
                 />
                 <TextInput
                placeholder="Residence Address"
                placeholderTextColor="darkgreen"
                style={{borderBottomWidth:2,borderBottomColor:"darkgreen",width:300,height:40}}
                value={this.state.address}
                multiline={this.state.multiline}
                onChangeText={(live)=>{
                    this.setState({
                       address:live
                    })
                    
                }}
                />
                <TextInput
                placeholder="Confirm Password"
                placeholderTextColor="darkgreen"
                style={{borderBottomWidth:2,borderBottomColor:"darkgreen",width:300,height:40}}
                value={this.state.confirmSignUpPassword}
                onChangeText={(x)=>{
                    this.setState({
                       confirmSignUpPassword:x
                    })
                    
                }}
                />
            <Image
            source={require('../assets/CreateAccount.PNG')}
            style={{width:200,height:200,position:"absolute",marginLeft:400,marginTop:75,}}
            />
            <Text style={{position:"absolute",marginLeft:330,marginTop:285,fontWeight:"bold",color:"darkgreen"}}>Sign-up now and start trading worldwide!</Text>
           <TouchableOpacity style={{borderTopWidth:3,borderBottomRadius:25,opacity:this.state.opacity,borderColor:"darkgreen",backgroundColor:"darkgreen"}} onPress={()=>{
                   this.VerifyUserforSignUp(this.state.signUpEmail,this.state.signUpPassword,this.state.confirmSignUpPassword)
               }}>
                   <Text style={{fontSize:32,justifyContent:"center",marginLeft:"30%",color:"white"}}>Create Account</Text>

                   </TouchableOpacity> 
           <Text style={{color:"grey",position:"absolute",marginLeft:10,fontSize:15}} onPress={()=>{
               this.setState({
                   modalVisible:false,
                   viewOpacity:1
               })
           }}>Cancel</Text>      
                 
                 </View>   

            </Modal>
        
        )
    }}

        
    
    render(){
        
        return(
            <View style={{opacity:this.state.modalOpacity,position:"absolute"}}>
               {this.ShowSignUpModal()}
            <View  style={{opacity:this.state.viewOpacity,position:"absolute"}} >
                
                <Image
                source={require('./Capture.PNG')}
                style={{width:500,height:300,position:"absolute",marginLeft:670,}}
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
                
                    style={{width:25,height:25,position:"absolute",marginLeft:12,marginTop:0,marginLeft:1100,marginTop:460}}
                    source={require("./See.png")}
                    />
                    </TouchableOpacity>
                
               <TouchableOpacity style={{position:"absolute",marginTop:500,marginLeft:900,borderWidth:3,borderRadius:10,}} onPress={()=>{
                   this.VerifyUserforLogin(this.state.email,this.state.password)
               }}>
                   <Text style={{fontSize:32}}>Login</Text>

                   </TouchableOpacity> 
                   <Text onPress={()=>{
                       this.setState({
                           modalVisible:true,
                           viewOpacity:0.3,
                           modalOpacity:1
                       })
                       
                   }} style={{position:"absolute",marginTop:575,marginLeft:825,color:"grey",width:300}}>Don't have an account yet? Sign-up here</Text>
                   
                   
            </View>
            </View>
            
            
            
                

           
             
        )
       
    }
   
   
}
