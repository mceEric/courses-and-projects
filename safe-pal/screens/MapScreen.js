import React from "react";
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import {StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native'
import {useState, useEffect, useLayoutEffect} from "react";
import * as Location from 'expo-location';
import {GeoFire} from 'geofire';
import {realtimeDatabase, auth} from "../firebase";
import MapViewDirections from "react-native-maps-directions";
import {useNavigation} from "@react-navigation/native";

//This functional component will render the map screen
export function MapScreen() {
    //Declaring necessary states
    const [position, setPosition] = useState(null);
    const navigation = useNavigation();
    const [faultMessage, setFaultMessage] = useState(null);
    const [directions, setDirections] = useState({directions: null, name: null});
    const [friendsPosition, setFriendsPosition] = useState(getFriendsPositions());
    const colors = ['blue', 'green', 'purple', 'teal', 'indigo', 'aqua', '#000000', '#ff69b4']
    let color = '#daa520'
    realtimeDatabase.ref("users").child(auth.currentUser.displayName).child("alertStatus").once('value', function(snapshot) {
      color = snapshot.val()
      
    })
    const [alertStatus, setAlertStatus] = useState(color)

    //A layout affect that will set the alert button to correspond to the current users alert status
    useLayoutEffect(() => {
      navigation.setOptions({
          headerRight: () => (
              alertStatus !== "red" ?
                  <TouchableOpacity style={[style.button, {backgroundColor: '#daa520'}]} onPress={() => alertPrompt()}>
                    <Text>Send Alert</Text>
                  </TouchableOpacity>

                  :

                  <TouchableOpacity style={[style.button, {backgroundColor: 'red'}]} onPress={() => removeAlert()}>
                    <Text>Remove Alert</Text>
                  </TouchableOpacity>
          ),
      })
  }, [alertStatus])

    //An asynchronous useEffect
    useEffect( async() => {
        let unmounted = false;
        //Ask user for permission to access their location
        let { status } = await Location.requestForegroundPermissionsAsync();
        //If user reject permission request we will set a new state, then alert them with the following message
        if (status !== 'granted') {
          setFaultMessage('Permission to access location was denied, please go to settings and enable location access.');
          return;
        }
        
        if (!unmounted) {
          //An asyncrhonous call back function to watch current users position
          await Location.watchPositionAsync({ timeInterval : 0, enableHighAccuracy: true},
            newPosition => setPosition(newPosition.coords),
            );
          //Set new state to all shared friends locations if shared friends location has changed
          if (friendsPosition !== getFriendsPositions()) {
            setFriendsPosition(getFriendsPositions())
          }
          //If specific friend has been removed from shared location, remove the direction/route to them if it is set.
          if (friendsPosition.filter(friend => friend.friendName === directions.name).push("ds") === 1) {
            removeDirections();
          }

        }

        return () =>  {
          { unmounted = true }
        }

      }, [position]);
      
    //The alert for rejected location permission
    if (faultMessage) {
      alert(faultMessage)
    } 
    //If permission was accepted, push co-ordinates to the firebase "Location" node
    else if (position) {
          const geoFireInst = new GeoFire(realtimeDatabase.ref("users").child(auth.currentUser.displayName));
          geoFireInst.set("Location", [position.latitude, position.longitude])
      }
    
    //Cunction to get directions from current user to specefied friend
    function handleDirections(friend, newColor) {
      setDirections({directions: (<MapViewDirections
        //Current users location
        origin={{latitude: position.latitude, longitude: position.longitude}}
        //Specified users location
        destination={{latitude: friend.latitude, longitude: friend.longitude}}
        apikey="AIzaSyCTxGJm9AaJcJ_LeHTBXtkFQNIjijOuPU0"
        strokeWidth={3}
        strokeColor={newColor}
        />), name: friend.friendName})
    }

    //Function to remove directions/route
    function removeDirections() {
      setDirections({directions: null, name: null})
    }

    //This function will get all shared friends locations
    function getFriendsPositions() {
      let friendsLocations = []
        let listener = realtimeDatabase.ref("users").child(auth.currentUser.displayName).child("sharedLocations").on("value", function(snapshot) {
          snapshot.forEach(child => {
            realtimeDatabase.ref("users").child(child.key).on("value", function(snapshot) {
              friendsLocations.push({friendName: child.key, alertStatus: snapshot.child("alertStatus").val(), latitude: snapshot.child("Location").child("l").val()[0], longitude: snapshot.child("Location").child("l").val()[1]})
            })
        })
      })
      realtimeDatabase.ref("users").off("value", listener)
      return friendsLocations
    }

    //Function which will set an alert and if accepted will call alertFriends()
    function alertPrompt() {
        Alert.alert(
          "Alert",
          "Are you sure you would like to send an alert to all shared location friends?",
          [
              {
                  text: "No",
                  style: "cancel"
              },
              {
                  text: "Yes",
                  onPress: () => alertFriends()
              }
          ]
       )
    }

    //Gets a random element from the colors array(gets a random color)
    function randomColour() {
      return colors[Math.floor(Math.random() * colors.length)]
    }

    //This function will set alert status as red, in other words the current user has sent an alert as they are in a potentially dangerous situation
    function alertFriends() {
      realtimeDatabase.ref("users").child(auth.currentUser.displayName).child("alertStatus").set("red")
      setAlertStatus("red")
    }

    //removes the alert outlined above, and sets a new color relative to the user
    function removeAlert() {
      let newColor = randomColour()
      realtimeDatabase.ref("users").child(auth.currentUser.displayName).child("alertStatus").set(newColor)
      setAlertStatus(newColor)
    }

    return (
        <View style={style.container}>
            <MapView
                showsMyLocationButton={true}
                style={StyleSheet.absoluteFillObject}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                loadingEnabled={true}
                customMapStyle={mapStyle}
            >
                {friendsPosition.map((friendQ) => {
                  const friend = friendQ;
                  return(<Marker key={friend} coordinate = {{latitude:  friend.latitude, longitude: friend.longitude}} pinColor={friend.alertStatus}><Callout onPress={() => (directions.directions === null ? handleDirections(friend, friend.alertStatus) : removeDirections())}><Text>{directions.directions === null ? 'Get Directions to' : 'Remove Directions from'} {friend.friendName}</Text></Callout></Marker>)
                })}
                {directions.directions}
            </MapView>

        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center"
    },

    button: {
      height: 30,
      width: 100,
      marginTop: 5,
      marginRight: 15,
      borderRadius: 15,
      borderWidth: 3,
      justifyContent: "center",
      alignItems: 'center',
  },

})

const mapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#daa520",
      },
    ],
  },
  {
    elementType: "geometry.fill",
    stylers: [
      {
        saturation: -5,
      },
      {
        lightness: -5,
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#000000",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        color: "#262525",
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "poi.business",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#262525",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#262525",
      },
    ],
  },
  {
    featureType: "road",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#262525",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#262525",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry",
    stylers: [
      {
        color: "#262525",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#262525",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
];