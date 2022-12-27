import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ navigation }) => {
    const [loading, setLoading] = useState(false)
    const [note, setNote] = useState([])

    const getnote = async () => {
        setLoading(true)
        const token = await AsyncStorage.getItem('authToken')
        if (token === null) {
            navigation.replace('Login')
        }
        fetch('https://note-hub-backend.vercel.app/getnotes', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: token
            }
        })
            .then((res) => res.json())
            .then(async (res) => {
                try {
        setLoading(false)

                    setNote(res)
                    // console.log(res)
                } catch (e) {
                    Alert.alert("")
                }
            }).catch((e) => {
        setLoading(false)

                Alert.alert("please check your internet connection")
            })
    }

    const deletenote=async(id)=>{
        const token = await AsyncStorage.getItem('authToken')

        await fetch('https://note-hub-backend.vercel.app/deletenote', {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: token
            },
            body: JSON.stringify({
                id:id
            })
        })
        .then((res)=>{
            navigation.replace('Home')
            res.json})

    }

    useEffect(() => {
        getnote()
    }, [])


    return (
        <View style={{height:700}}>
            {loading ? (<View style={[styles.containerLoading, styles.horizontal]}>
                <ActivityIndicator size="large" color="blue" />
            </View>) :
        <View style={styles.container}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.logo}>
                        Notes
                    </Text>
                    <TouchableOpacity onPress={() => {
                        navigation.replace('Profile')
                    }}>
                        <Image style={styles.img} source={require('../assets/bg/user.png')} />
                    </TouchableOpacity>
                </View>

                <FlatList showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false} style={{ marginVertical: 30 }} keyExtractor={(index) => { return index._id }} data={note} renderItem={({ item }) => {
                        return (
                            <View style={styles.note}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 5 }}>{item.title}</Text>
                                <Text style={styles.note_text}>
                                    {item.description}
                                </Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text>{item.time}</Text>
                                    <TouchableOpacity onPress={()=>{deletenote(item._id)}} style={styles.deletbtn}>
                                        <Text style={{ color: 'white', marginHorizontal: 30, paddingVertical: 10 }}>
                                            Delete
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }} />
                <TouchableOpacity onPress={() => { navigation.replace('Addnote') }} style={styles.addbtn}>
                    <Text style={{ textAlign: 'center', padding: 30, color: 'white', fontWeight: "bold" }}>Add</Text>
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
    container: {
        marginHorizontal: 20,
        marginTop: 20,
        height: '100%'
    },
    logo: {
        fontWeight: 'bold',
        fontSize: 29
    },
    note: {

        height: undefined,
        backgroundColor: 'white',
        padding: 20,
        marginTop: 15,
        borderRadius: 20
    },
    note_text: {
        paddingBottom: 30
    },
    deletbtn: {
        backgroundColor: 'black',
    },
    addbtn: {
        backgroundColor: 'black',
        borderRadius: 50,
        width: 86,
        position: "absolute",
        bottom: 70,
        right: 0
    },
    img: {
        width: 45,
        height: undefined,
        aspectRatio: 1,
        borderRadius: 100,
        marginRight: 3

    }
})

export default Home