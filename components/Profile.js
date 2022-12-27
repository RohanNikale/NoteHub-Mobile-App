import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Component, useEffect, useState } from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity,ActivityIndicator, Alert } from 'react-native'
export default ({ navigation }) => {
  const [user,setUser]=useState({name:'rohan nikale',email:'rohan@gmail.com'})
  const [loading, setLoading] = useState(false)

  const getuserData = async () => {
    const token = await AsyncStorage.getItem('authToken')
    try{
      setLoading(true)
      const data=await fetch('https://note-hub-backend.vercel.app/geteuserdata', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: token
        }
      })
      const parse=await data.json()
      setLoading(false)
      setUser(parse)
    }
    catch(err){
      console.log(err)
      setLoading(false)
      Alert.alert("Please check your internet connection")
    }
  }
  useEffect(() => {
    getuserData()
  },[])
  const logout = async () => {
    setLoading(true)
    await AsyncStorage.removeItem("authToken")
    .then(() => {
        setLoading(false)
        navigation.replace('Login')
      })
  }
  return (
    <View style={styles.container}>
    {
      loading?(<View style={[styles.containerLoading, styles.horizontal]}>
        <ActivityIndicator size="large" color="blue" />
  </View>):
  <View>

      <Image style={styles.img} source={require('../assets/bg/user.png')} />
      <Text style={styles.info}><Text>Name:      </Text>  <Text style={{ backgroundColor: 'white', width: '100' }}>{user.name}</Text> </Text>
      <Text style={styles.info}><Text>email:        </Text> <Text style={{ backgroundColor: 'white', width: '100' }}>{user.email}</Text> </Text>
      <Text style={styles.info}><Text>Password: </Text> <Text style={{ backgroundColor: 'white', width: '100' }}>*********</Text>  </Text>
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <TouchableOpacity onPress={logout} style={styles.logoutbtn}>
          <Text style={{ color: "white", textAlign: "center", paddingVertical: 10 }}>Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{navigation.replace('Home')}} style={styles.backbtn}>
          <Text style={{ color: "white", textAlign: "center", paddingVertical: 10 }}>Back</Text>
        </TouchableOpacity>
      </View>
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
  container: {
    height:690,
    marginHorizontal: 20,
    marginTop: 30
  },
  img: {
    alignSelf: 'center',
    width: 160,
    height: undefined,
    aspectRatio: 1,
    borderRadius: 100,
    marginBottom: 40
  },
  info: {
    marginVertical: 9,
    fontSize: 20
  },
  logoutbtn: {
    backgroundColor: 'black',
    width: 100,
    marginTop: 50

  },
  backbtn: {
    backgroundColor: 'black',
    width: 100,
    marginTop: 50

  }

})