import {DrawerItems,} from 'react-navigation-drawer'
import {Badge, ListItem,Avatar} from 'react-native-elements'
import {TouchableOpacity,View,Text,Image,TextInput,FlatList,ScrollView,} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import *as ImagePicker from 'expo-image-picker'


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
         type:'Account',
         AvatarImage:'',
         userFullname:''
        }
        this.request=null
    }
    getUserId=()=>{
        db.collection('users').where("emailID","==",this.state.h).get().then((snapshot)=>{
            var UserId=snapshot.forEach((doc)=>{
                var data=doc.data();
                this.setState({
                    id:data.ID,
                    userFullname:data.Fullname
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
   openImageLibrary=async()=>{
       const {canceled,uri}= await ImagePicker.launchImageLibraryAsync({
           mediaTypes:ImagePicker.MediaTypeOptions.All,
           aspect:[4,3],
           allowsEditing:true,
           quality:1
       })
       if(!canceled){
           this.uploadSelectionToFirebaseStorage(uri,this.state.h)
       }
    }

   uploadSelectionToFirebaseStorage=async(URL,ImageSelector)=>{
    var UnBlobbedImage=  await fetch (URL)
    var BlobbedImage=await UnBlobbedImage.blob()
    try{
        var UploadedImage=firebase.storage().ref().child("User_Profile_Pictures/"+ImageSelector).put(BlobbedImage).then(()=>{
            this.fetchSelectedImageFromFirebaseStorage(ImageSelector)
        })
    }
    catch(error){
        window.alert(error.code)
    }
    db.collection("UserImages").doc(this.state.h).set({
        "Email":this.state.h,
        "Image":this.state.AvatarImage
    })
  
   }    
   fetchSelectedImageFromFirebaseStorage=async(UserImageSelector)=>{
       try{
        var RecievedURL=firebase.storage().ref().child("User_Profile_Pictures/"+UserImageSelector).getDownloadURL().then((DownloadedURL)=>{
            this.setState({
                AvatarImage:DownloadedURL
            })
        })
       }
       catch(error){
           window.alert(error.code)
       }
    
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
           leftAvatar={
               <TouchableOpacity onPress={()=>{
                db.collection("Friends").doc(item.emailID+this.state.id).set({
                    "FriendsEmail":item.emailID,
                    "YourEmail":this.state.h,
                })
                this.props.navigation.navigate('Friends')
               }} style={{borderWidth:1,borderColor:"darkgreen",alignItems:"center"}}>
                   <Text style={{alignSelf:"center",color:"darkgreen"}}>Add</Text>
               </TouchableOpacity>
           }
           bottomDivider
            
           
           />
               
           
       )
   }
  componentDidMount(){
      this.getUserId()
      firebase.storage().ref().child('User_Profile_Pictures/'+this.state.h).getDownloadURL().then((UploadedImage)=>{
        this.setState({
            AvatarImage:UploadedImage
        })
      })
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
                    <Badge
                    
                     onPress={()=>{
                        this.openImageLibrary()
                       
                    }}
                    status="error"
                    value="Change profile picture"
                    
                    />
                    <Avatar
                    title="Profile picture"
                    avatarStyle={{width:200,height:200,borderWidth:2,borderColor:"darkgreen",alignSelf:"center",borderRadius:100}}
                    activeOpacity={0.5}
                    containerStyle={{width:200,height:200,alignSelf:"center"}}
                    source={{uri:this.state.AvatarImage}}
                  
                    
                    rounded
        
                    size={'medium'}
                    />
                    <Badge
                    
                    onPress={()=>{
                       this.props.navigation.navigate('Settings')
                      
                   }}
                   status="error"
                   value="Change name"
                   />
                    <Text style={{fontWeight:"bold",color:"darkgreen",alignSelf:"center",fontSize:30}}> {this.state.userFullname}</Text>
                
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