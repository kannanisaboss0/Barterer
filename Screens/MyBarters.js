import React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,FlatList,Modal,ScrollView } from 'react-native';
import {ListItem,Card} from 'react-native-elements'
//import *as Progress from 'react-native-progress'
import db from '../config.js'
import firebase from 'firebase'

export default class Barters extends React.Component{
    constructor(){
        super();
        this.state={
            email:firebase.auth().currentUser.email,
            AllBarters:[],
            iconText:'Exchange',
            i:'hf'
        }
        this.requestRef=null
    }
    getBarters=()=>{
       this.requestRef= db.collection('Barters').where("email","==",this.state.email).get().then((snapshot)=>{
           var i=null
         var AllBarters=   snapshot.docs.map((document)=>
            document.data(),
            
            
        )
        this.setState({
            AllBarters:AllBarters,
            
        })
        })
    }
    
   
    componentDidMount(){
        this.getBarters()
    }
   componentWillMount(){
       this.requestRef=null
   }
   renderItem=({item,i})=>{
    return(
        <ListItem
        key={i}
        title={item.item}
        subTitile={"Exchanger:"+item.name}
        leftElement={item.status==="Available"?
        (<TouchableOpacity onPress={()=>{
            db.collection('requests').where("Name","==",item.name).get().then((snapshot)=>{
                snapshot.forEach((document)=>{
                    var doc=document.data()
                    this.setState({
                        i:doc.id
                    })
                })
            })
            db.collection('requests').doc(this.state.i).update({
                "status":"Not Available"
            })
            this.props.navigation.navigate('Main')
        }
        } style={{alignItems:"center",alignSelf:"center",borderWidth:2,borderColor:"darkgreen",height:40,justifyContent:"space-between"}}>
            <Text style={{alignSelf:"center",fontSize:32,justifyContent:"space-around",marginTop:-5,color:"darkgreen"}}>Exchange</Text>
        </TouchableOpacity>):
        
        <Text style={{fontSize:20,color:"darkgreen",fontWeight:"bold"}}>Request Sent</Text>
        
    }
    rightTitle={item.contact}
   bottomDivider
        />
     ) }

    render(){
        return(
            <View>
            {this.state.AllBarters.length===0?(
                <View>
                <Text style={{color:"grey",alignSelf:"center",fontSize:25}}>No Barters Requested Currently,</Text>
                <Text onPress={()=>{this.props.navigation.navigate('Main')}} style={{color:"grey",alignSelf:"center"}}>Click here to seach for Barters</Text>
                </View>
            ):
            <FlatList
            data={this.state.AllBarters}
            renderItem={this.renderItem}
            keyExtractor={(item,index)=>{
                index.toString()
            }}
            ></FlatList>

            }
            
        </View>
        )
    }
}