import {DrawerItems,} from 'react-navigation-drawer'
import {Badge, ListItem,} from 'react-native-elements'
import {TouchableOpacity,View,Text,Image,TextInput,FlatList,ScrollView} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'

import firebase from 'firebase'
import db from '../config.js'
import *as React from 'react'



export default class SideBarComponent extends React.Component{
    constructor(){
        super();
        this.state={
         h:firebase.auth().currentUser.email,
         id:'',
         search:'' ,
         userholder:[],
         type:'Account'
        }
        this.request=null
    }
    getUserId=()=>{
        db.collection('users').where("emailID","==",this.state.h).get().then((snapshot)=>{
            var UserId=snapshot.forEach((doc)=>{
                var data=doc.data();
                this.setState({
                    id:data.ID
                })
            })
        })
    }
    getUsersByEmail=()=>{
        this.request=db.collection('users').where("emailID","==",this.state.search).limit(10).onSnapshot((snapshot)=>{
            var Users=snapshot.docs.map((document)=>
            document.data()
    
            )
            this.setState({
                userholder:Users
            })
        })
       }
    getUsersByContact=()=>{
        this.request=db.collection('users').where("contact","==",this.state.search).limit(10).onSnapshot((snapshot)=>{
            var Users=snapshot.docs.map((document)=>
            document.data()
    
            )
            this.setState({
                userholder:Users
            })
        })
       }
   getUsersByAccount=()=>{
    this.request=db.collection('users').where("Account","==",this.state.search).limit(10).onSnapshot((snapshot)=>{
        var Users=snapshot.docs.map((document)=>
        document.data()

        )
        this.setState({
            userholder:Users
        })
    })
   }
   getUsers=()=>{
    this.request=db.collection('users').limit(10).onSnapshot((snapshot)=>{
        var Users=snapshot.docs.map((document)=>
        document.data()

        )
        this.setState({
            userholder:Users
        })
    })
   }
   renderItem=({item,i})=>{
       return(
           <ListItem
           key={i}
           title={item.Account}
           subtitle={item.emailID}
           rightSubtitle={item.contact}
           rightTitle={item.Fullname}
           rightTitleStyle={{color:"black"}}
           bottomDivider
            
           
           />
               
           
       )
   }
  componentDidMount(){
      this.getUserId()
  }
    
    render(){
        
        return(
            <View>
            <View style={{backgroundColor:"darkgreen"}}>
                <Text style={{fontSize:50,}}>{firebase.firestore.Timestamp.now().toDate().toTimeString().slice(0,5)}</Text>
                <Text>Email:{this.state.h}</Text>
                <Text>Id:{this.state.id}</Text>
            </View>   
                <View>
                
            <DrawerItems {...this.props}
            
            >
                
                       </DrawerItems>
            <ScrollView  style={{height:400}}>
            <View >
            <TextInput
            style={{width:200,borderBottomWidth:1,borderBottomColor:"darkgreen",height:40}}
            placeholder="Search users"
            placeholderTextColor="darkgreen"
            value={this.state.search}
            onChangeText={(x)=>{
                this.setState({
                    search:x
                })
            }}
            />
            <DropDownPicker
            items={[
                {label:'Account',value:'Account'},
                {label:'Email',value:'Email'},
                {label:'Contact Number',value:'Contact'}
                
            ]}
            onChangeItem={(item)=>{
                this.setState({
                    type:item.value
                })
            }}
            itemStyle={{borderBottomwidth:2,borderBottomColor:"darkgreen",color:"darkgreen"}}
            placeholder="Sort By:Account(default)"
            >

            </DropDownPicker>
            <TouchableOpacity onPress={()=>{
                if(this.state.type==='Account'){
                    this.getUsersByAccount()
                }
                if(this.state.type==='Email'){
                    this.getUsersByEmail()
                }
                if(this.state.type==='Contact'){
                    this.getUsersByContact()
                }
                if(this.state.search===""){
                    this.getUsers()
                }
               
            }} style={{position:"absolute",width:90,marginLeft:210,borderWidth:1,borderColor:"darkgreen",height:40}}>
                <Text style={{alignSelf:"center",marginTop:5,fontSize:21,color:"darkgreen"}}>Search</Text>
            </TouchableOpacity>
            <FlatList
            data={this.state.userholder}
            renderItem={this.renderItem}
            keyExtractor={(item,index)=>{
                index.toString()
            }}
            >

            </FlatList>
           
            </View>
            </ScrollView>
            <View style={{marginTop:120,fontSize:35,fontWeight:"bold",borderWidth:3,borderRadius:25,height:50,backgroundColor:"darkgreen"}} >
            <TouchableOpacity style={{width:320}} onPress={()=>{
                window.alert("Signing out")
                firebase.auth().signOut()
                this.props.navigation.navigate('Login')
            }}>
                <Text style={{fontSize:35,fontWeight:"bold",paddingLeft:"30%"}}>Logout</Text>
            </TouchableOpacity>
            
            </View>
            </View>
            </View>
        )
    }
}