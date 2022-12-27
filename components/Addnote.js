import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Component, useState } from 'react'
import { Text, View, TextInput,StyleSheet,TouchableOpacity, Alert,ActivityIndicator } from 'react-native'

export default ({navigation}) => {
    const [loading, setLoading] = useState(false)

    const [title,setTitle]=useState('')
    const [description,setText]=useState('')
    const add=async()=>{
        setLoading(true)
        const token=await AsyncStorage.getItem("authToken")
        await fetch('https://note-hub-backend.vercel.app/addnote', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization:token
            },
            body: JSON.stringify({
              title:title,
              description:description,
            })
          })
          .then((res)=>res.json())
          .then(async(res)=>{
            try {
                setLoading(false)
                navigation.replace('Home')
                
            } catch (e) {
                  setLoading(false)
                console.log('this is erro')
              }
          }).catch((e)=>{
            setLoading(false);
            Alert.alert('please check your internet connection')
          })
    }
    return (
        <View style={{height:700}}>
        {loading ? (<View style={[styles.containerLoading, styles.horizontal]}>
            <ActivityIndicator size="large" color="blue" />
        </View>) :
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>{navigation.replace('Home')}} style={styles.back}>
                <Text style={{color:'white',fontWeight:'bold',fontSize:15,textAlign:'center',padding:10}}>Back</Text>
            </TouchableOpacity>
            <Text style={{marginTop:30,marginBottom:20,fontSize:24,fontWeight:"bold"}}> Write your Note </Text>
            <TextInput style={{marginBottom:20,backgroundColor:"white",height:46,padding:10}}
            placeholder="Enter Your Title"               
                onChangeText={(e)=>{setTitle(e)}}
                value={title}/>
            <TextInput style={styles.textInput}
            placeholder="Write Your Note"
                multiline={true}
                numberOfLines={4}
                onChangeText={(e)=>{setText(e)}}
                value={description}
                 />
                 <TouchableOpacity onPress={add} style={{marginVertical:20}}>
                    <Text style={styles.btn}>Add</Text> 
                 </TouchableOpacity>
        </View>
}
        </View>
    )
}
const styles = StyleSheet.create({
    containerLoading: {
        flex: 1,
        height:690,
        justifyContent: "center",
        alignItems:'center',
      },
    container:{
        marginHorizontal:20
    },
    textInput:{
        backgroundColor:"white",
        height:200,
        textAlignVertical: 'top',
        padding:10
    },
    btn:{
        backgroundColor:'black',
        width:79,
        textAlign:'center',
        padding:10,
        color:'white',
        fontWeight:'bold'
    },
    back:{
        backgroundColor:'black',
        width:70,
        marginTop:20
    }
})
