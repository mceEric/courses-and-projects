import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import{Input} from 'react-native-elements';
import {auth, realtimeDatabase} from "../firebase";

//Functional component which will register a new user
export function RegisterScreen({navigation}) {
    //Declaring necesarry states
    const [userEmail, setUserEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const colors = ['blue', 'green', 'purple', 'teal', 'indigo', 'aqua', '#000000', '#ff69b4']

    //Function which will register a new user to the firebase authentication system
    function register() {
        auth.createUserWithEmailAndPassword(userEmail, userPassword).then(() => {
                //Creates necessary firebase nodes relative to the new user
                realtimeDatabase.ref("users").child(userName).set([auth.currentUser.uid]);
                realtimeDatabase.ref("users").child(userName).child("alertStatus").set(colors[Math.floor(Math.random() * colors.length)]);
                realtimeDatabase.ref("users").child(userName).child("friendRequests").child("received").set("");

            navigation.popToTop();
        }).catch((error) => alert(error.message))
    }


    //Function which will check that the user trying to register is inputting correct details
    function checkNameExist() {
        realtimeDatabase.ref("users").once("value", function(snapshot) {
            let checker = false
            snapshot.forEach(child => {
                //Checks if new username does not already exist within the database
                if (child.key.toLowerCase() === userName.toLowerCase()) {
                    checker = true
                }
            })
            if (checker === false) {
                //Checks if both password input fields were the same
                if (userPassword === confirmPassword) {
                    register();
                }
    
                else {
                    alert("Please make sure that userPasswords match.")
                }
            }
    
            else {
                return alert("User userName already exists")
            }
        })
    }



    return (
        <View style={styles.container}>
            <Image
                style={styles.Logo}
                source={require('C:/projectpog/2022-ca326-travel-guide/MapDisplay/images/safepal2.png')}
            />
            <Input
                placeholder="Enter User Name"
                label="User Name"
                leftIcon={{type: 'material', userName: 'badge'}}
                value={userName}
                onChangeText={text=> setUserName(text)}
            />

            <Input
                placeholder="Enter your Email"
                label="Email"
                leftIcon={{type: 'material', userName: 'userEmail'}}
                value={userEmail}
                onChangeText={text=> setUserEmail(text)}
            />

            <Input
                placeholder="Enter your Password"
                label="Password"
                leftIcon={{type: 'material', userName: 'lock'}}
                value={userPassword}
                onChangeText={text=> setUserPassword(text)}
                secureTextEntry
            />

            <Input
                placeholder="Confirm Password"
                label="Confirm Password"
                leftIcon={{type: 'material', userName: 'lock'}}
                value={confirmPassword}
                onChangeText={text=> setConfirmPassword(text)}
                secureTextEntry
            />

            <TouchableOpacity title ="Register" onPress={checkNameExist} style={styles.button}><Text style={styles.texts}>Register</Text></TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create
({
    Logo: {
        width: 250,
        height: 250,
        marginBottom: 30,
    },
    texts: {
        justifyContent: "center",
        alignItems: "center",
        color: 'black',
        fontSize: 20,
    },

    button: {
        backgroundColor: '#daa520',
        height: 50,
        width: 200,
        marginTop: 10,
        borderRadius: 15,
        borderWidth: 5,
        justifyContent: "center",
        alignItems: 'center',

    },
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
    }


}
)

