import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TextInput, ImageBackground, TouchableOpacity, Alert,ActivityIndicator } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from "react-native-gesture-handler";
const Login = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const submit = async () => {
        console.log(email, password)
        setLoading(true)
        fetch('https://note-hub-backend.vercel.app/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then((res) => res.json())
            .then(async (res) => {
                try {
                    await AsyncStorage.setItem('authToken', res.token)
                    setLoading(false)
                    navigation.replace('Home')
                } catch (e) {
                    console.log('error1')
                    setLoading(false)
                    Alert.alert("Invalid credentials")

                }
            }).catch((e) => {
                setLoading(false)
                Alert.alert("please check your internet connection")})
    }
    const validate = (email) => {
        const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return expression.test(String(email).toLowerCase()) && !password<1
    }
    return (
    <ScrollView>

        {loading?(<View style={[styles.containerLoading, styles.horizontal]}>
            <ActivityIndicator size="large" color="blue" />
      </View>):
        <ImageBackground source={require('../assets/bg/bg2.jpg')} resizeMode="cover" style={styles.image}>
            <View style={styles.heding}>
                <Text style={styles.hedinginside}>Login</Text>
                <Text style={styles.text}>Please Log in to continue</Text>
            </View>
            <View style={styles.container}>
                <View style={styles.form}>
                    <Text style={{ marginLeft: 5, marginBottom: 10, color: '#a9b0ba' }}>Email</Text>
                    <TextInput style={styles.input} placeholder="Email" onChangeText={(e) => setEmail(e)} value={email} />
                    <Text style={{ marginLeft: 5, marginBottom: 10, color: '#a9b0ba' }}>Password</Text>
                    <TextInput style={styles.input} placeholder="Password" onChangeText={(e) => setPassword(e)} secureTextEntry={true} value={password} />
                    {(!validate(email)) ?

                        (
                            <TouchableOpacity disabled={!validate(email)} onPress={submit} style={[styles.btn, { backgroundColor: "grey" }]}>
                                <Text style={{ textAlign: 'center', color: 'white', fontSize: 15 }}>Log in</Text>
                            </TouchableOpacity>
                        ) 
                        
                        :

                        <TouchableOpacity disabled={!validate(email)} onPress={submit} style={[styles.btn]}>
                            <Text style={{ textAlign: 'center', color: 'white', fontSize: 15 }}>Log in</Text>
                        </TouchableOpacity>
                    }
                </View>
                <TouchableOpacity
                    onPress={() => { navigation.replace("SignUp") }}>
                    <Text style={{ color: '#a9b0ba', textAlign: 'center' }}>
                        Don't have an account?
                        <Text style={{ color: 'blue' }}> Sign up</Text>
                    </Text>
                </TouchableOpacity>
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
        height: 600,
        paddingHorizontal: 20
    },
    heding: {
        marginTop: 100,
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
export default Login