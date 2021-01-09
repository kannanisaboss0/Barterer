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
            Document:'',
           
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
            <View style={{backgroundColor:this.props.navigation.getParam('Colour_Choosing_string')}}>
        <View style={{marginLeft:"40%",position:"relative",}}>
     
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
                <TouchableOpacity onPress={()=>{
                    this.setState({
                        CardVisible:false
                    })
                     
                }}>
                    <Text style={{color:"grey",fontSize:10}}>Cancel</Text>
                </TouchableOpacity>
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
                    
                    else{
                        window.alert("Passowrd Verification is blocked, please change it in settings")
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
              
              <TouchableOpacity onPress={()=>{
                  var AskPassword=this.props.navigation.getParam('Password_Verification_boolean')
                  if(AskPassword===true){
                    this.setState({
                        CardVisible:true
                    })
                  }
                  else{
                      this.setState({
                          passwordNotVisible:false
                      })
                  }
                
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
                }}  style={{marginTop:15,borderWidth:1,borderColor:"darkgreen",width:"37.5%",height:55,backgroundColor:"darkgreen",marginLeft:-75,justifyContent:"space-evenly",alignItems:"center"}}>
                    <Text style={{fontSize:32,color:"white",justifyContent:"space-around",alignSelf:"center"}}>Save Changes</Text>
                </TouchableOpacity>
              
        </View>
        </View>)
    }}
/*

*/