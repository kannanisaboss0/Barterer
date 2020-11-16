import {createSwitchNavigator,createAppContainer} from 'react-navigation'
import React from 'react';
import { StyleSheet, Text, View,TextInput,Header,TouchableOpacity} from 'react-native';
import firebase from 'firebase'
import db from '../config'



export default class RequestScreen extends React.Component{
    constructor(){
        super();
        this.state={
            itemName:'',
            itemDescription:'',
            price:''
        }
    }
  addRequest=()=>{
      db.collection('requests').add({
          "Name":this.state.itemName,
          "Description":this.state.itemDescription,
          "Price":this.state.price,
          "Time":firebase.firestore.Timestamp.now().toDate().toString().slice(0,21)
      })

  }
    render(){
        return(
            <View style={{backgroundColor:this.props.navigation.getParam('Colour_Choosing_string')}}>
               
                <TextInput
                style={{ width:"75%",height:55,alignSelf:"center",borderColor:"darkgreen",borderWidth:1,marginTop:20,padding:10,}}
                placeholder="Item Name"
               placeholderTextColor="darkgreen"                
               value={this.state.itemName}
                onChangeText={(item)=>{
                    this.setState({
                        itemName:item
                    })
                }}
              
                />
                 <TextInput
                style={{ width:"75%",height:200,alignSelf:"center",borderColor:"darkgreen",borderWidth:1,marginTop:20,padding:10,}}
                multiline={true}
                placeholder="Item Description"
                placeholderTextColor="darkgreen" 
                value={this.state.itemDescription}
                onChangeText={(item)=>{
                    this.setState({
                        itemDescription:item
                    })
                }}
              
                />
                
                <TextInput
                style={{ width:"25%",height:55,alignSelf:"center",borderColor:"darkgreen",borderWidth:1,marginTop:20,marginRight:"50%"}}
                value={this.state.cost}
                placeholder="Item Price"
                placeholderTextColor="darkgreen" 
                onChangeText={(cost)=>{
                    this.setState({
                        price:cost
                    })
                }}
              
                />
                <TouchableOpacity onPress={this.addRequest} style={{position:"absolute",marginLeft:"50%",marginTop:315,borderWidth:1,borderColor:"darkgreen",width:"37.5%",height:55,backgroundColor:"darkgreen"}}>
                    <Text style={{fontSize:32,marginLeft:"35%",color:"white"}}>Add Item</Text>
                </TouchableOpacity>

            </View>
        )
    }
}