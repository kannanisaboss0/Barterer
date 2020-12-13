import React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,FlatList,Modal,ScrollView,Image } from 'react-native';
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
            i:'hf',
            cardVisible:false,
            docid:'Please type in the barter id',
            deleteDocid:'',
            barterFilter:''
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
        db.collection('Barters').where("ident","==",this.state.docid).get().then((snapshot)=>{
            snapshot.docs.forEach((doc)=>{
            var data=doc.data()
            this.setState({
                deleteDocid:doc.id.toString()
            })
        })
    })
    }
    filterBarters=()=>{
        db.collection('Barters').where("item","==",this.state.barterFilter).get().then((snapshot)=>{
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
        leftElement={item.UserStatus!=="Undecided"?
        (item.UserStatus==="Decline"?
        <Text style={{color:"red"}}>User has rejected</Text>:
        <Text style={{color:"green"}}>User has accepted</Text>
        )
        :
       <Text>Request Sent</Text>
    
    }
    rightTitle={item.contact}
    rightSubtitle={"Id: "+item.ident}
    rightSubtitleStyle={{fontWeight:"bold"}}
    
   bottomDivider
        />
     ) }

    render(){
        return(
            <View>
            {this.state.AllBarters.length===0?(
                <View>
                    <TouchableOpacity style={{borderRadius:25,alignItems:"center",width:75,borderWidth:1,borderColor:"darkgreen",height:30}}>
               <Text style={{color:"darkgreen",marginTop:5}}>Delete</Text>
               
            </TouchableOpacity>
            <TextInput
                style={{justifyContent:"center",alignSelf:"center",color:"darkgreen",borderWidth:1,borderColor:"darkgreen",height:30,marginLeft:"-83%",marginTop:-29,borderRadius:25}}
                placeholder="Search Barters"
                placeholderTextColor="darkgreen"
                value={this.state.barterFilter}
                onChangeText={(name)=>{
                    this.setState({
                        barterFilter:name
                    })
                   
                }}
                />
                 
                   
                    <TouchableOpacity style={{borderRadius:25,height:30,borderWidth:1,width:75,borderColor:"darkgreen"}} onPress={()=>{
           this.filterBarters()
       }}>
           <Text style={{color:"darkgreen",alignSelf:"center",marginTop:5}}>Apply</Text>
       </TouchableOpacity>
                     
                    <Image
                   style={{alignSelf:"center",height:200,width:200}}
                   source={require('../assets/Nothing.PNG')}
                   />
                <Text style={{color:"grey",alignSelf:"center",fontSize:25}}>No Barters Requested Currently,</Text>
                <Text onPress={()=>{this.props.navigation.navigate('Main')}} style={{color:"grey",alignSelf:"center"}}>Click here to seach for Barters</Text>
                </View>
            ):
            <View>
                  <TouchableOpacity onPress={()=>{
                      this.setState({
                          cardVisible:true
                      })
                  }} style={{borderRadius:25,alignItems:"center",width:75,borderWidth:1,borderColor:"darkgreen",height:30}}>
               <Text style={{color:"darkgreen",marginTop:5}}>Delete</Text>
               
            </TouchableOpacity>
            <TextInput
                style={{justifyContent:"center",alignSelf:"center",color:"darkgreen",borderWidth:1,borderColor:"darkgreen",height:30,marginLeft:"-83%",marginTop:-29,borderRadius:25}}
                placeholder="Search Barters"
                placeholderTextColor="darkgreen"
                value={this.state.barterFilter}
                onChangeText={(name)=>{
                    this.setState({
                        barterFilter:name
                    })
                   
                }}
                />
                 
                   
                    <TouchableOpacity style={{borderRadius:25,height:30,borderWidth:1,width:75,borderColor:"darkgreen"}} onPress={()=>{
           this.filterBarters()
       }}>
           <Text style={{color:"darkgreen",alignSelf:"center",marginTop:5}}>Apply</Text>
       </TouchableOpacity>
           
            <FlatList
            data={this.state.AllBarters}
            renderItem={this.renderItem}
            keyExtractor={(item,index)=>{
                index.toString()
            }}
            ></FlatList>
            {
                this.state.cardVisible===true?
                    (<View style={{position:"absolute"}}>
                        <Card  title="Delete"titleStyle={{fontSize:32,fontWeight:"bold",alignSelf:"center",width:1000}}>
                            <Text onPress={()=>{
                                this.setState({
                                    cardVisible:false
                                })
                            }} style={{color:"grey"}}>Cancel</Text>
                            <Text style={{color:"darkgreen",fontWeight:"bold"}}>Please type in the id of the barter. The barter id can be found on the right bottom corner of the barter. </Text>
                            <TextInput
                            value={this.state.docid}
                            onChangeText={(x)=>{
                                this.setState({
                                    docid:x
                                })
                                
                            }}
                            style={{height:40,width:"25%",borderWidth:1,borderColor:"darkgreen"}}
                            />
                        
                        <TouchableOpacity onPress={()=>{
                            if(this.state.docid==='Please type in the barter id'){
                                window.alert("Please enter a valid id")
                            }
                           else{
                            window.alert("Please press once more to delete it")
                            this.getBarters()
                               if(this.state.deleteDocid!==''){
                               
                               db.collection('Barters').doc(this.state.deleteDocid).delete()
                               }
                           }
                         
                          
                        }} style={{borderWidth:1,borderColor:"darkgreen",alignSelf:"center",alignItems:"center",height:40,width:"15%",borderRadius:25}}>
                            <Text style={{fontSize:25,alignSelf:"center",color:"darkgreen"}}>Delete</Text>
                        </TouchableOpacity>
                    <Text>{this.state.deleteDocid}</Text>
                        </Card>
                    </View>):null
                
            }
            </View>

            }
            
        </View>
        )
    }
}