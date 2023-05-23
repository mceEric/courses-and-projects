import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {SettingScreen} from './screens/SettingScreen';
import {Text, View, Image} from 'react-native';
import {MapScreen} from "./screens/MapScreen";
import {FriendsScreen} from './screens/FriendRequestsScreen';
import React from "react";
import {auth, realtimeDatabase} from "./firebase";

const Tab = createBottomTabNavigator();
//Functional component to render the navigation menu at the bottom of the screen
export function NavigateTabs() {
    const node = realtimeDatabase.ref("users")

    //Function to create the request list
    function getRequestList() {
        const currentNode = node.child(auth.currentUser.displayName);
        const requestzList = [];
        currentNode.child("friendRequests").child("received").once('value', snapshot => {
            snapshot.forEach(child => {
                //Push necessary data of the request user to an array
                requestzList.push({ name: child.key, friendId: child.val().friendId });
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

    getFriendList()
    getRequestList()

    return(
        //Creates tab navigation menu
        <Tab.Navigator
            screenOptions={{"tabBarShowLabel": false,
            "tabBarStyle": [
                {
                    "display": "flex"
                },
                null
            ]}}>
            <Tab.Screen
            //Navigation tab formap screen
                name="Map"
                component={MapScreen}
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                            <Image
                                source={require('C:/projectpog/2022-ca326-travel-guide/MapDisplay/images/Home.png')}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                }}
                            />
                            <Text
                                style={{color: focused ? '#daa520' : 'black', fontSize: 12}}>
                                Home
                            </Text>
                        </View>
                    ),
                }}
            />

            <Tab.Screen
            //Navigation tab for friend screen
                name="Friends"
                component={FriendsScreen}
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                            <Image
                                source={require('C:/projectpog/2022-ca326-travel-guide/MapDisplay/images/friends-icon.png')}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                }}
                            />
                            <Text
                                style={{color: focused ? '#daa520' : 'black', fontSize: 12}}>
                                Friends
                            </Text>
                        </View>
                    ),
                }}
            />

            <Tab.Screen
            //Navigation tab for settings screen
                name="Settings"
                component={SettingScreen}
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                            <Image
                                source={require('C:/projectpog/2022-ca326-travel-guide/MapDisplay/images/setting.png')}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                }}
                            />
                            <Text
                                style={{color: focused ? '#daa520' : 'black', fontSize: 12}}>
                                Settings
                            </Text>
                        </View>
                    ),
                }}
            />

        </Tab.Navigator>
    )
}