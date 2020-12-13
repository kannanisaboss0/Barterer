import React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,FlatList,Modal,ScrollView,Image } from 'react-native';
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
            choice:'Accept',
            id:'h',
            RequesterEmail:'',
            cardVisible:false,
            statement:'',
            notid:'vv'

        }
        this.requestNotifications=null
    }
   
    getAllNotifications=()=>{
        db.collection("Notifications").where("ExchangeEmail","==",this.state.email).onSnapshot((snapshot)=>{
            var AllNotifications=snapshot.docs.map((document)=>
                document.data()
                
            )
            this.setState({
                AllNotifications:AllNotifications,
               


            })
            db.collection("Notifications").where("ExchangeEmail","==",this.state.email).get().then((snapshot)=>{
                snapshot.docs.forEach((document)=>{
                    var data=document.data()
                    this.setState({
                        RequesterEmail:data.RequesterEmail
                    })
                })
            })
        })
        db.collection("requests").where("email","==",this.state.RequesterEmail).get().then((snapshot)=>{
            snapshot.docs.forEach((document)=>{
                this.setState({
                    id:document.id
                })
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
            rightTitle={"Date Added: "+item.Date}
            rightTitleStyle={{color:"darkgreen"}}
            subtitle={item.Reason===''?
            <Text style={{fontWeight:"bold",color:"darkgreen"}}>No Description</Text>:
            item.Reason}
            title={item.RequesterEmail+" has requested "+item.Item}
            titleStyle={{color:"black",fontWeight:"bold"}}
            rightAvatar={(
                <View>
                       {<TouchableOpacity onPress={()=>{
                           db.collection('Notifications').where("ident","==",item.ident).get().then((snapshot)=>{
                                    snapshot.docs.forEach((doc)=>{
                                        this.setState({
                                            notid:doc.id
                                        })
                                    })
                        
                        })
                        db.collection('Notifications').doc(this.state.notid).update({
                            "status":"read"
                        })
                           if(this.state.choice==="Accept"){
                db.collection("Desicions").add({
                    "RequesterEmail":item.RequesterEmail,
                    "ExchangerEmail":firebase.auth().currentUser.email,
                    "Declined":this.state.choice,
                    "Statement":this.state.statement
                })
                this.setState({
                    cardVisible:true
                })
            }
            if(this.state.choice==="Decline"){
                db.collection("Desicions").add({
                    "RequesterEmail":item.RequesterEmail,
                    "ExchangerEmail":firebase.auth().currentUser.email,
                    "Declined":this.state.choice,
                    
                })
                this.setState({
                    cardVisible:false
                })
            }
            }}><Text>Send</Text></TouchableOpacity>}
                </View>
            )}
            rightElement={(<ScrollView style={{height:70}}>

                <DropDownPicker
               
               
                placeholder="Accept or Decline"
                items={[
                    {label:'Accept',value:'Accept',selected:true},
                    {label:'Decline',value:'Decline',}
                ]}
                onChangeItem={(item)=>{
                    this.setState({
                        choice:item.value
                    })
                }}
                defaultValue="Accept"
                activeItemStyle={{backgroundColor:"darkgreen",opacity:0.6,}}
                
                />
            </ScrollView>
            
            )}
           
            bottomDivider 
    />
        
        )
        
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
                <View>
                   
                <FlatList
                
                data={this.state.AllNotifications}
                renderItem={this.renderItem}
                keyExtractor={(item,index)=>{
                    index.toString()
                }}
                ></FlatList>
                 {this.state.cardVisible===true?
                    (<View style={{position:"absolute",alignSelf:"center",width:1000,marginTop:200}}>
                       
                        <Card
                        
                        title="Additional Statements"
                        titleStyle={{color:"darkgreen",fontWeight:"bold",fontSize:32}}
                        >
                             <Text style={{color:"darkgreen"}}>Do you want to add any statement before sending?</Text>
                            <TextInput
                            value={this.state.statement}
                            style={{width:"50%",borderBottomColor:"darkgreen",borderBottomWidth:2,alignSelf:"center",height:40}}
                            onChangeText={(text)=>{
                                this.setState({
                                    statement:text
                                })
                            }}
                            />
                            <TouchableOpacity style={{alignSelf:"center",alignItems:"center",borderWidth:1,borderColor:"darkgreen",width:200}} 
                            onPress={()=>{
                                db.collection("Barters").doc(this.state.id).update({
                                    "UserStatus":this.state.choice
                                })
                            this.setState({
                                cardVisible:false
                            })
                               

                            }}><Text style={{color:"darkgreen",marginTop:5,alignSelf:"center"}}>Send</Text></TouchableOpacity>
                        </Card>
                        </View>):null}
    </View>                }
                        <Text>{this.state.notid}</Text>
                
            </View>
        )
    }
}