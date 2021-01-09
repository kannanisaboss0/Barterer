import React from 'react';
import {  Text, View,TextInput,TouchableOpacity,Alert,Image,Modal,ScrollView,Dimensions } from 'react-native';
import {CheckBox,} from 'react-native-elements'
import DropDownPicker from 'react-native-dropdown-picker'
import db from '../config'
import firebase from 'firebase'

export default class GeneralScreen extends React.Component{
    constructor(){
        super();
        this.state={
            test:firebase.auth().currentUser.email,
            askforPasswordVerification:true,
            appColor:''

        }
        
    }
    render(){
        return(
            <View style={{backgroundColor:this.state.appColor}}>
                

             
                <View>
                <DropDownPicker
                items={
                    [
                        {label:"Red",value:"red"},
                        {label:"Green",value:"green"},
                        {label:"Blue",value:"blue"},
                        {label:"Yellow",value:"yellow"},
                        {label:"Dark Green",value:"darkgreen",disabled:true},
                        {label:"White(Default)",value:"white"}
                    ]
                }
                style={{width:"25%",alignSelf:"center"}}
                itemStyle={{width:"25%",}}
                activeItemStyle={{backgroundColor:"darkgreen",}}
                placeholder="Background color[default white]"
                onChangeItem={(item)=>{
                    this.setState({
                        appColor:item.value
                    })
                }}
                >
                    
                </DropDownPicker>
                </View>
        <TouchableOpacity onPress={()=>{
                    this.props.navigation.navigate('User',{'Password_Verification_boolean':this.state.askforPasswordVerification,'Colour_Choosing_string':this.state.appColor})
                    this.props.navigation.navigate('Exchange',{'Password_Verification_boolean':this.state.askforPasswordVerification,'Colour_Choosing_string':this.state.appColor})
                    this.props.navigation.navigate('Home',{'Password_Verification_boolean':this.state.askforPasswordVerification,'Colour_Choosing_string':this.state.appColor})
                }}  style={{marginTop:215,borderWidth:1,borderColor:"darkgreen",width:"37.5%",height:55,backgroundColor:"darkgreen",justifyContent:"space-evenly",alignItems:"center",alignSelf:"center"}}>
                    <Text style={{fontSize:32,color:"white",justifyContent:"space-around",alignSelf:"center"}}>Save Changes</Text>
                </TouchableOpacity>
        </View>)
    }
}