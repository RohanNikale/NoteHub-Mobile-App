import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TextInput, ImageBackground, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUP = ({ navigation }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setcPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const signup = async () => {
        console.log(email, password)
        setLoading(true)
        await fetch('https://note-hub-backend.vercel.app/createuser', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                cpassword: cpassword
            })
        })
            .then((res) => res.json())
            .then(async (res) => {
                try {
                    await AsyncStorage.setItem('authToken', res.token)
                    navigation.replace('Home')
                    setLoading(false)

                } catch (e) {
                    setLoading(false)
                    console.log('this is erro')
                    Alert.alert("this user alredy exist")
                }
            }).catch((e) => {
                console.log('err')
                setLoading(false)
                Alert.alert("Please check your internet connection")
            })
    }
    const validate = (email) => {
        const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return expression.test(String(email).toLowerCase()) && !password < 1 && !(name.length < 4) && cpassword === password
    }

    return (

        <ScrollView>
            {
                loading ?(<View style={[styles.containerLoading, styles.horizontal]}>
                    <ActivityIndicator size="large" color="blue" />
              </View>):


                    <ImageBackground source={require('../assets/bg/bg2.jpg')} resizeMode="cover" style={styles.image}>
                        <View style={styles.heding}>
                            <Text style={styles.hedinginside}>SignUP</Text>
                            <Text style={styles.text}>Please Sign Up to continue</Text>
                        </View>
                        <View style={styles.container}>
                            <View style={styles.form}>
                                <Text style={{ marginLeft: 5, marginBottom: 10, color: '#a9b0ba' }}>Name</Text>
                                <TextInput style={styles.input} placeholder="Name" onChangeText={(e) => setName(e)} value={name} />
                                <Text style={{ marginLeft: 5, marginBottom: 10, color: '#a9b0ba' }}>Email</Text>
                                <TextInput style={styles.input} placeholder="Email" onChangeText={(e) => setEmail(e)} value={email} />
                                <Text style={{ marginLeft: 5, marginBottom: 10, color: '#a9b0ba' }}>Password</Text>
                                <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} onChangeText={(e) => setPassword(e)} value={password} />
                                <Text style={{ marginLeft: 5, marginBottom: 10, color: '#a9b0ba' }}>Confirm Password</Text>
                                <TextInput style={styles.input} placeholder="Re-enter-Password" secureTextEntry={true} onChangeText={(e) => setcPassword(e)} value={cpassword} />
                                {validate(email) ? (


                                    <TouchableOpacity disabled={!validate(email)} style={styles.btn} onPress={signup}>
                                        <Text style={{ textAlign: 'center', color: 'white', fontSize: 15 }}>Sign Up</Text>
                                    </TouchableOpacity>
                                )

                                    :
                                    <TouchableOpacity disabled={!validate(email)} style={[styles.btn, { backgroundColor: "grey" }]} onPress={signup}>
                                        <Text style={{ textAlign: 'center', color: 'white', fontSize: 15 }}>Sign Up</Text>
                                    </TouchableOpacity>
                                }

                                <TouchableOpacity
                                    onPress={() => { navigation.replace("Login") }}>
                                    <Text style={{ color: '#a9b0ba', textAlign: 'center', marginTop: 20 }}>
                                        Alredy have a account?
                                        <Text style={{ color: 'blue' }}>Log in</Text>
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ImageBackground>
            }
        </ScrollView>
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
        backgroundColor: 'white',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        height: '100%',
        paddingHorizontal: 20
    },
    heding: {
        marginTop: 60,
        marginBottom: 16,
        marginLeft: 30
    },
    hedinginside: {
        color: 'white',
        fontWeight: "bold",
        fontSize: 40,

    },
    text: {
        marginBottom: 40,
        fontWeight: '30',
        color: '#a9b0ba'

    },
    input: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 6,
        height: 50,
        elevation: 7,
        shadowColor: 'grey',
    },
    btn: {
        backgroundColor: 'black',
        paddingVertical: 15,
        borderRadius: 10
    },
    form: {
        marginVertical: 70
    }

})
export default SignUP