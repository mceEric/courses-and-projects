import React, {useState, useEffect, useLayoutEffect} from 'react'
import {View, StyleSheet, ActivityIndicator, TouchableOpacity} from 'react-native'
import {auth, chatDatabase, realtimeDatabase} from "../firebase";
import {GiftedChat, Bubble, Send, SystemMessage} from 'react-native-gifted-chat'
import {IconButton} from 'react-native-paper';
import {useNavigation} from "@react-navigation/native";
import {Icon} from "react-native-elements";


//Functional component whihc handles all chatroom related procedures
export function ChatScreen({route}) {
    //Declaring necessary states
    const [messages, setMessages] = useState([]);
    const {chatName} = route.params
    const navigation = useNavigation();
    const node = realtimeDatabase.ref("users");
    let locationCheck = false
    node.child(auth.currentUser.displayName).child("sharedLocations").once('value', function(snapshot) {
        //Checks if user is currently tracking other users location
        if (snapshot.hasChild(chatName.friendName)) {
            locationCheck = true
        }
    })
    const [render, setRender] = useState(locationCheck)

    //Asynchronous function
    async function handleSend(messages) {
        const text = messages[0].text;

        //Pushes new text message with other necessary data to the firestore database
        chatDatabase
            .collection('Chatroom')
            .doc(chatName.serverName)
            .collection('chats')
            .add({
                text,
                createdAt: new Date().getTime(),
                user: {
                    _id: auth.currentUser.uid,
                    email: auth.currentUser.email
                }
            });
    }

    //Layout effect to set correct pararmeters for the location button
    useLayoutEffect(() => {
        render === true ?
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={{marginRight: 30}} onPress={() => removeFriendLocation()}>
                    <Icon name="location-pin" color={"#daa520"}/>
                </TouchableOpacity>
            ),
        })
        :
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={{marginRight: 30}} onPress={() => getFriendLocation()}>
                    <Icon name="location-pin" color={"black"}/>
                </TouchableOpacity>
            ),
        })

    }, [render])

    //A useEffect which listens for updates within the firestore (listens if a new message has been sent)
    useEffect(() => {

        //Creates listener for the current chat room server
        const messagesListener = chatDatabase
            .collection('Chatroom')
            .doc(chatName.serverName)
            .collection('chats')
            .orderBy('createdAt', 'desc')
            .onSnapshot(querySnapshot => {
                //A query which recieves all messages from the firestore database
                const messages = querySnapshot.docs.map(doc => {
                    const firebaseData = doc.data();

                    //Sets necessary data for the message
                    const data = {
                        _id: doc.id,
                        text: '',
                        createdAt: new Date().getTime(),
                        ...firebaseData
                    };

                    //If message is being sent by an actual user and not the firestore system
                    if (!firebaseData.system) {
                        data.user = {
                            ...firebaseData.user,
                            name: firebaseData.user.email
                        };
                    }

                    return data;
                });
                setMessages(messages);
            });

        // Stop listening for updates whenever the component unmounts
        return () => messagesListener();
    }, []);

    //Function which retrieves the friends Location 
    function getFriendLocation() {
        node.child(auth.currentUser.displayName).child("sharedLocations").child(chatName.friendName).set({isLocationShared: true})
        setRender(!render)
    }

    //Function which removes the friends Location
    function removeFriendLocation() {
        node.child(auth.currentUser.displayName).child("sharedLocations").child(chatName.friendName).remove();
        setRender(!render)
    }

    //A function which creates the bubble around each text message
    function renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#daa520'
                    }
                }}
                textStyle={{
                    right: {
                        color: 'black'
                    }
                }}
            />
        );
    }

    //Renders loading animation
    function renderLoading() {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size='large' color='#daa520' />
            </View>
        );
    }

    //Function which will render the send of the inputted text
    function renderSend(props) {
        return (
            <Send {...props}>
                <View style={styles.sendingContainer}>
                    <IconButton icon='send' size={32} color='#daa520' />
                </View>
            </Send>
        );
    }

    function scrollToBottomComponent() {
        return (
            <View style={styles.bottomComponentContainer}>
                <IconButton icon='send' size={36} color='#6646ee' />
            </View>
        );
    }

    //Function which renders messages from the firestore system
    function renderSystemMessage(props) {
        return (
            <SystemMessage
                {...props}
                wrapperStyle={styles.systemMessageWrapper}
                textStyle={styles.systemMessageText}
            />
        );
    }


    return (
        <GiftedChat
            messages={messages}
            onSend={handleSend}
            user={{ _id: auth.currentUser.uid }}
            placeholder='Type your message here...'
            alwaysShowSend
            showUserAvatar
            scrollToBottom
            renderBubble={renderBubble}
            renderLoading={renderLoading}
            renderSend={renderSend}
            scrollToBottomComponent={scrollToBottomComponent}
            renderSystemMessage={renderSystemMessage}

        />
    )
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    sendingContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomComponentContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    systemMessageWrapper: {
        backgroundColor: '#daa520',
        borderRadius: 4,
        padding: 5
    },
    systemMessageText: {
        fontSize: 14,
        color: 'black',
        fontWeight: 'bold'
    }
});