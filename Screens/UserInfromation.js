import React from 'react';
import {  Text, View,TextInput,TouchableOpacity,Alert,Image,Modal,ScrollView, } from 'react-native';
import db from '../config'
import firebase from 'firebase'
import {Card} from 'react-native-elements'

export default class InfoScreen extends React.Component{
    constructor(){
        super();
        this.state={
            m:firebase.auth().currentUser.email,
            email:'',
            Account:'',
            Fullname:'',
            password:'',
            contact:'',
            address:'',
            CardVisible:false,
            id:'',
            idTry:'',
            passwordNotVisible:true,
            Document:''

        }
       
    }
    getUserDetails=()=>{
        db.collection('users').where("emailID","==",this.state.m).get().then((snapshot)=>{
            snapshot.forEach((document)=>{
                var data=document.data()
                this.setState({
                    email:data.emailID,
                    Account:data.Account,
                    Fullname:data.Fullname,
                    password:data.password,
                    contact:data.contact,
                    address:data.Address,
                    id:data.ID.toString(),
                    Document:document.id.toString()

                    
                   


                })
            })

            })
        
        }
        returnCard=()=>{
            if(this.state.CardVisible===true){
                return(
                    <View>
                         
                    </View>
                )
               
            }
            
        }
        updateUser=()=>{
            var Doc=this.state.Document
            db.collection("users").doc(Doc).update({
                "Account":this.state.Account,
                "address":this.state.address,
                "contact":this.state.contact,
                "password":this.state.password,
                "Fullname":this.state.Fullname
                
            })
        }
        
        componentDidMount(){
            this.getUserDetails()
        }
    render(){
        return(
            
        <View style={{marginLeft:"40%",position:"relative"}}>
    
            <Text>{this.state.Document}</Text>
            <Image 
            source={require('../assets/UserSettings.PNG')}
            style={{height:200,width:200,marginLeft:50}}
            />
            {this.state.CardVisible===true?
            (
                <View style={{position:"absolute",marginTop:200,width:500,marginLeft:-100}}>
                <Card
                         
                title="View Password"
                titleStyle={{fontWeight:"bold",color:"darkgreen"}}
                
                
               
            >
                <Text style={{fontWeight:"bold",color:"darkgreen"}}>Please type in your User Id here:</Text>
                <TextInput
                placeholder="User Id"
                placeholderTextColor="darkgreen"
                style={{height:40,borderBottomColor:"darkgreen",borderBottomWidth:2,width:"50%"}}
                value={this.state.idTry}
            
                onChangeText={(x)=>{
                   this.setState({
                       idTry:x
                   })
                }}
                />
                <TouchableOpacity onPress={()=>{
                    if(this.state.idTry===this.state.id){
                        this.setState({
                            passwordNotVisible:false,
                            CardVisible:false
                        })
                        window.alert("Recovery succesful")
                    }
                    if(this.state.id!==this.state.idTry){
                        window.alert(this.state.idTry+"  is invalid ")
                    }
                    
                }} style={{width:"50%",borderWidth:1,borderColor:"darkgreen",height:40,borderTopWidth:2,marginTop:10}}>
                    <Text style={{alignSelf:"center",justifyContent:"space-evenly",fontSize:32,color:"darkgreen",marginTop:-5}}>Submit</Text>
                </TouchableOpacity>
                </Card>
                </View>
            ):
            null}
            

                        
                           
                
              <TextInput
              
              value={this.state.Account}
              style={{borderColor:"darkgreen",width:"25%",borderWidth:2,height:40}}
              onChangeText={(x)=>{
                  this.setState({
                      Account:x
                  })
              }}
              />
              <TextInput
              value={this.state.Fullname}
              style={{borderColor:"darkgreen",width:"25%",borderWidth:2,height:40,marginTop:25}}
              onChangeText={(x)=>{
                this.setState({
                    Fullname:x
                })
            }}
              />
              <TextInput
              value={this.state.email}
              style={{borderColor:"darkgreen",width:"25%",borderWidth:2,height:40,marginTop:25}}
              onChangeText={(x)=>{
                window.alert("You cannot change your email!")
            }}
              />
              
              <TextInput 
              value={this.state.password}
              secureTextEntry={this.state.passwordNotVisible}
              style={{borderColor:"darkgreen",width:"25%",borderWidth:2,height:40,marginTop:25}}
              onChangeText={(x)=>{
                this.setState({
                    password:x
                })
            }}
              />
              <TouchableOpacity onPress={()=>{
                  this.setState({
                      CardVisible:true
                  })
              }}>
                  <Text>View</Text>
              </TouchableOpacity>
              <TextInput
              value={this.state.contact}
              style={{borderColor:"darkgreen",width:"25%",borderWidth:2,height:40,marginTop:25}}
              onChangeText={(x)=>{
                this.setState({
                    contact:x
                })
            }}
              />
              
              <TextInput
              value={this.state.address}
              style={{borderColor:"darkgreen",width:"25%",borderWidth:2,height:40,marginTop:25}}
              onChangeText={(x)=>{
                this.setState({
                    address:x
                })
            }}
              />
                <TouchableOpacity onPress={()=>{
                    this.updateUser()
                }}  style={{position:"absolute",marginLeft:"50%",marginTop:315,borderWidth:1,borderColor:"darkgreen",width:"37.5%",height:55,backgroundColor:"darkgreen"}}>
                    <Text style={{fontSize:32,marginLeft:"35%",color:"white",justigyContent:"space-evenly"}}>Save Changes</Text>
                </TouchableOpacity>
              
        </View>)
    }}
/*

*/