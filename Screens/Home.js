import React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,FlatList,Modal,ScrollView } from 'react-native';
import {ListItem} from 'react-native-elements'
//import *as Progress from 'react-native-progress'
import db from '../config.js'
import firebase from 'firebase'

export default class HomeScreen extends React.Component{
constructor(){
    super();
    this.state={
        x:firebase.auth().currentUser.email,
        modalVisible:true,
        Requests:[],
        nameFilter:''
       
    }
    this.requestRef=null
}
    recieveRequests=()=>{
        this.requestRef=db.collection('requests').onSnapshot((snapshot)=>{
            var RequestList=snapshot.docs.map(document=>
                document.data()
                
            
               
            
 
             )
             
             this.setState({
                 Requests:RequestList
              })
         }
        
         )
    }
    filterbyPrice=()=>{
        db.collection('requests').where("Name","==",this.state.nameFilter).onSnapshot((snapshot)=>{
            var FilteredRequestedList=snapshot.docs.map((document)=>
                document.data()
            )
            this.setState({
                Requests:FilteredRequestedList
            })
        })
    }
    componentDidMount(){
        this.recieveRequests()
        
        
    }
    componentWillUnmount(){
        this.requestRef()
    }
    renderItem=({item,i})=>{
        return(
            <ScrollView>
            <ListItem
            key={i}
            title={item.Name}
            subtitle={item.Description}
            rightSubtitle={item.Price}
            
            
            titleStyle={{color:"black",fontWeight:"bold"}}
        rightElement={<Text style={{color:"darkgreen"}}>Date added:{item.Time}</Text>}
            bottomDivider
            />
            </ScrollView>
        )

    }
    showModal=()=>{
     var UserStatus=this.props.navigation.getParam('id')
     if(this.state.modalVisible===true&&UserStatus===true){
     return(
         <Modal
         style={{flex:1,width:"25%",marginLeft:"35%",backgroundColor:"white",marginTop:200,height:500,borderRadius:25,borderWidth:2,borderColor:"darkgreen",position:"absolute",}}
         >
             <View>
            <Text style={{fontSize:30,alignItems:"center",marginLeft:"36%",color:"darkgreen"}}>Welcome!</Text>
     <Text style={{color:"darkgreen",fontSize:15,fontWeight:"bold"}}>Hello,{this.state.x}</Text>
            <Text>Welcome to Barterer. Here you can exchange items using the barter system!</Text>
     
            <Text style={{color:"darkgreen",fontSize:15,fontWeight:"bold"}}>What is the barter system?  </Text>
            <Text>The barter system was followed thousands of years ago, before money and currency was invented.People exchanged goods for other goods in this system. Such as, 1 hen can be traded for 
                10 spindles of wool. However, over time, due to varying excahnge rates, money was created.
            </Text>
            <Text style={{color:"darkgreen",fontSize:15,fontWeight:"bold"}}>What is the relation between this app and the barter system? </Text>
            <Text>Barterer revives the Barter System, but on another medium..the internet</Text>
            <Text style={{color:"darkgreen",fontSize:15,fontWeight:"bold"}}>How it works:</Text>
            <Text>There are two pages,Home and Exchange</Text>
            <Text style={{fontWeight:"bold"}}>Home:</Text>
            <Text>In this page, you can view all the offers for exchange</Text>
            <Text style={{fontWeight:"bold"}}>Exchange:</Text>
            <Text>In this page, you can put the name and description of your item for sale</Text>
            <Text>A side menu can be activated from by dragging to the right, where you can logout and change your settings</Text>
            <Text>That's all you need to know. If you have found or encountered any bugs, please report it.</Text>
            <TouchableOpacity onPress={()=>{
                this.setState({
                    modalVisible:false
                })
            }} style={{width:100,height:25,borderRadius:25,borderWidth:2,borderColor:"darkgreen",marginTop:50}}>
            <Text style={{fontSize:25,marginTop:-7,marginLeft:25,color:"green"}}>OK</Text>

            </TouchableOpacity>
            
            </View>
         </Modal>
       
     )
     }
 }   

    render(){
        return(
            <View style={{}}>
                <TextInput
                style={{justifyContent:"center",alignSelf:"center",color:"darkgreen",borderWidth:1,borderColor:"darkgreen",height:30,marginLeft:"-80%",marginTop:100}}
                placeholder="Search"
                placeholderTextColor="darkgreen"
                value={this.state.nameFilter}
                onChangeText={(name)=>{
                    this.setState({
                        nameFilter:name
                    })
                   
                }}
                />
               
                
                <FlatList data={this.state.Requests} renderItem={this.renderItem} keyExtractor={(item,index)=>
                     index.toString()
                    } ></FlatList>
                    {this.showModal()}
                    <TouchableOpacity style={{marginLeft:23,marginTop:100,borderBottomWidth:3,borderBottomRadius:25,borderBottomColor:"darkgreen",height:30,position:"absolute"}} onPress={()=>{
           this.filterbyPrice()
       }}>
           <Text>Apply</Text>
       </TouchableOpacity>
       <TouchableOpacity style={{marginLeft:65,marginTop:100,borderBottomWidth:3,borderBottomRadius:25,borderBottomColor:"darkgreen",height:30,position:"absolute"}} onPress={()=>{
           this.setState({
               Requests:[]
           })
       }}>
           <Text>Clear</Text>
       </TouchableOpacity>
       <TouchableOpacity style={{marginLeft:310,marginTop:100,borderBottomWidth:3,borderBottomRadius:25,borderBottomColor:"darkgreen",height:30,position:"absolute"}} onPress={()=>{
          this.recieveRequests()
          
       }}>
           <Text>Refresh</Text>
       </TouchableOpacity>
       
            </View>
        )
    }
}