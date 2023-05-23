import React, {useState} from "react";
import {auth, realtimeDatabase} from "../firebase";
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import {useNavigation} from "@react-navigation/native";
import{Input} from 'react-native-elements'

//Functional component to handle numerous procedures related to settings
export function SettingScreen() {
    //Declaring necessary states
    const navigation = useNavigation();
    const [friendName, setFriendName] = useState("")

    //This function will handle the sign out of a logged in user
    function handleSignOut() {
        auth
            .signOut()
            .then(() => {
                navigation.replace("Login")
            })
            .catch(error => alert(error.message))
    }

    //This function sends a friend request to another user
    const addFriend = () => {
        const friendNode = realtimeDatabase.ref("users");
        friendNode.once('value', function(snapshot) {
            //This if statement checks if the inputed user name exists within the database and that the inputed user name is not the current users name
            if (snapshot.hasChild(friendName) && friendName !== auth.currentUser.displayName) {
                friendNode.child(friendName).child("friendRequests").child("received").once('value', function(snapshot) {
                    //Checks if user that wants to added doesnt already have a request from the current user
                    if (!snapshot.hasChild(auth.currentUser.displayName)) {
                        friendNode.child(friendName).child("friendRequests").child("received").child(auth.currentUser.displayName).set({accepted: false, friendId: auth.currentUser.uid})
                    }
        
                });
            }
        })
    }

    return (
        <View style={styles.container}>
            <Input
                placeholder="Type username!"
                label="Friend"
                leftIcon={{type: 'material', name: 'group-add'}}
                value={friendName}
                onChangeText={text => setFriendName(text)}
            />
            <TouchableOpacity title ="Add" onPress={addFriend} style={styles.button}><Text style={styles.texts}>Add Friend</Text></TouchableOpacity>
            <TouchableOpacity title ="SignOut" onPress={handleSignOut} style={styles.button}><Text style={styles.texts}>Sign Out</Text></TouchableOpacity>
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
            width: 200,
            height: 200,
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
        friend: {
            marginTop: 22,
            padding: 25,
            backgroundColor: 'blue',
            fontSize: 22,
        },

        container: {
            flex: 1,
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center'
        },

        acceptButton: {
            backgroundColor: 'red',
        }
    


    }
)