import React, {useState, useEffect} from "react";
import {auth, chatDatabase, realtimeDatabase} from "../firebase";
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert} from 'react-native'
import {useNavigation} from "@react-navigation/native";

//Functional component which render a users friend list, friend request list, and handle the creation of chats
export function FriendsScreen({route}) {
    //Declaring necesarry states
    const navigation = useNavigation();
    const [chatName, setChatName] = useState({checker: false});
    const [render, setRender] = useState(false);
    const node = realtimeDatabase.ref("users");
    const [friendList, setFriendList] = useState(getFriendList)
    const [requestList, setRequestList] = useState(getRequestList)

    //A useEffect which listens for changes in the two states chatName and render
    useEffect(() => {

        if (chatName.checker === true) {
            navigation.navigate('Chat', {chatName});
            setChatName({checker: false})
        }
        
    }, [chatName, render]);

    //Creates chat room or enters chat rrom
    function messageRoom(friend) {
        //This creates a unique key name for the chatroom
        const serverName = [auth.currentUser.uid, friend.friendId].sort().join("")
        const chatRef = chatDatabase.collection('Chatroom').doc(serverName).collection('chats')

        chatRef.limit(1).get().then((snapshot) => {
            //If the chat room does not exist push the title name of the chat room to the firestore database
            if (snapshot.size <= 0) {
                (chatRef
                    .add({
                        text: `${auth.currentUser.displayName} and ${friend.name}`,
                        createdAt: new Date().getTime(),
                        system: true,
                        name: auth.currentUser.displayName + friend.name,
                    }))
            }
        }).catch(error => alert(error.message))
        //Enter chat room regardless
        setChatName({serverName: serverName, friendName: friend.name, checker: true})
    }

    //Function to create the request list
    function getRequestList() {
        const currentNode = node.child(auth.currentUser.displayName);
        const requestzList = [];
        currentNode.child("friendRequests").child("received").once('value', snapshot => {
            snapshot.forEach(child => {
                //Push necessary data of the request user to an array
                requestzList.push({ name: child.key, friendId: child.val()[0] });
            });
        });
        return requestzList;
    }

    //Function to get friend list
    function getFriendList() {
        const currentNode = node.child(auth.currentUser.displayName);
        const friendsList = [];
        currentNode.child("friendList").on('value', function(snapshot) {
            snapshot.forEach(child => {
                //Push necessary data of the friend to an array
                friendsList.push({ name: child.key, friendId: child.val()[0] });
            });
        });
        return friendsList
    }

    //Handles acceptance of the friend request 
    function acceptRequest(request) {
        node.child(auth.currentUser.displayName).child("friendList").child(request.name).set([request.friendId])
        node.child(request.name).child("friendList").child(auth.currentUser.displayName).set([auth.currentUser.uid])
        //Calls reject request to remove the request from the database as the user is now in friendsList
        rejectRequest(request);
    }

    //Function to remove a friend from a users friendList
    function removeFriend(friendName) {
        node.child(auth.currentUser.displayName).child("friendList").child(friendName).remove()
        node.child(friendName).child("friendList").child(auth.currentUser.displayName).remove()
        //Calls this function to remove the users sharedLocation if it was being shared
        removeFriendLocation(friendName)
    }

    ////Handles rejection of friend request
    function rejectRequest(request) {
        node.child(auth.currentUser.displayName).child("friendRequests").child("received").child(request.name).remove();
        //Resets friend list and request list
        setRequestList(getRequestList());
        setFriendList(getFriendList());
    }

    //Hadnels a friend removal
    function removeFriendLocation(friendName) {
        node.child(auth.currentUser.displayName).child("sharedLocations").child(friendName).remove();
        //Resets friend list
        setFriendList(getFriendList());
    }

    //The next three functions will set alerts to users warning them of the consequences that could occur if they wish to continue
    function addFriendAlert(request) {
        Alert.alert(
            "Alert",
            "By clicking 'Continue' this user will be able to access your location at any time, are you sure you would like to continue?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Continue",
                    onPress: () => acceptRequest(request)
                }
            ]
        )
    }

    function rejectFriendAlert(request) {
        Alert.alert(
            "Alert",
            "By clicking 'Continue' you will remove this users friend request, are you sure you want to continue?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Continue",
                    onPress: () => rejectRequest(request)
                }
            ]
        )
    }

    function removeFriendAlert(friendName) {
        Alert.alert(
            "Alert",
            "By clicking 'Continue' you will no longer be friends with this user nor will you be able to acess thier location, are you sure you would like to continue?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Continue",
                    onPress: () => removeFriend(friendName)
                }
            ]
        )
    }

    return (
        <ScrollView>
            <View style={styles.wrapper}>{friendList.map((friend) => <View key={friend.name} style={styles.container}><Text style={styles.nameText}>{friend.name}</Text><TouchableOpacity title ="Remove Friend" onPress={() => removeFriendAlert(friend.name)}style={styles.button}><Text style={styles.texts}>Remove Friend</Text></TouchableOpacity><TouchableOpacity title ="Message" onPress={() => messageRoom(friend)}style={styles.button}><Text style={styles.texts}>Message</Text></TouchableOpacity></View>)}</View>
            <View style={styles.wrapper}>{requestList.map((request) => <View key={request.name} style={styles.container}><Text style={styles.nameText}>{request.name}</Text><TouchableOpacity title ="Accept" onPress={() => addFriendAlert(request)}style={styles.button}><Text style={styles.texts}>Accept</Text></TouchableOpacity><TouchableOpacity title ="Reject" onPress={() => rejectFriendAlert(request)}style={styles.button}><Text style={styles.texts}>Reject</Text></TouchableOpacity></View>)}</View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({

        texts: {
            alignItems: "center",
            color: 'black',
            fontSize: 20,
        },

        nameText: {
            alignItems: "center",
            color: 'black',
            fontSize: 24,
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
            alignItems: 'center',


        },

        container: {
            flex: 1,
            padding: 10,
            alignItems: 'center',
            borderRadius: 15,
            borderWidth: 6,
            width: 350,
            backgroundColor: 'white',
            borderColor: 'black',
            marginBottom: 10,

        },

        wrapper: {
            justifyContent: "center",
            alignItems: 'center',

        },

    }
);