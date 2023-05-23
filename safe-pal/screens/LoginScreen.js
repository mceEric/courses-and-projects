import React, {useEffect, useState} from 'react'
import {View, StyleSheet, Image,TouchableOpacity,Text} from 'react-native'
import {Input} from 'react-native-elements'
import {auth} from "../firebase";

//Functional component which will log a user into their account, this is the begining screen
export function LoginScreen({navigation}) {
    //Declaring necesarry states
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    //function which uses firebase database to authorize whether user credentials exist within the database
    function signIn() {
        auth.signInWithEmailAndPassword(userEmail, userPassword).then(() => {
            navigation.replace('NavigateTabs');
        })
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage);
            });
    }

    return (
        <View style={styles.container}>
            <Image
                style={styles.Logo}
                source={require('C:/projectpog/2022-ca326-travel-guide/MapDisplay/images/safepal2.png')}
            />
            <Input
                placeholder="Enter your email"
                label="Email"
                leftIcon={{type: 'material', name: 'email'}}
                value={userEmail}
                onChangeText={text=> setUserEmail(text)}
            />

            <Input
                placeholder="Enter your password"
                label="Password"
                leftIcon={{type: 'material', name: 'lock'}}
                value={userPassword}
                onChangeText={text=> setUserPassword(text)}
                secureTextEntry
            />

            <TouchableOpacity title ="Log in" onPress={signIn} style={styles.button}><Text style={styles.texts}>Login</Text></TouchableOpacity>
            <TouchableOpacity title ="Register" style={styles.button} onPress={() => navigation.navigate('Register')}><Text style={styles.texts}>Register</Text></TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create
({
    texts: {
        justifyContent: "center",
        alignItems: "center",
        color: 'black',
        fontSize: 20
    },

    Logo: {
        width: 250,
        height: 250,
        marginBottom: 60,
    },
    button: {
        backgroundColor: '#daa520',
        height: 50,
        width: 200,
        marginTop: 10,
        borderRadius: 15,
        borderWidth: 5,
        justifyContent: "center",
        alignItems: 'center'

    },
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 10
    }


}
)

