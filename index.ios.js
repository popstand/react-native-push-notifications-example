/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  PushNotificationIOS,
  AlertIOS
} from 'react-native';
import OneSignal from 'react-native-onesignal';

var pendingNotifications = [];
// var _navigator; // If applicable, declare a variable for accessing your navigator object to handle payload.
// function handleNotification (notification) { // If you want to handle the notifiaction with a payload.
    // _navigator.to('main.post', notification.data.title, {
    //  article: {
    //    title: notification.data.title,
    //    link: notification.data.url,
    //    action: notification.data.actionSelected
    //  }
    //});
// }

class PushNotificationsExample extends Component {
  render() {
    OneSignal.configure({
      onNotificationOpened: function(message, data, isActive) {
        var notification = {message: message, data: data, isActive: isActive};
        console.log('NOTIFICATION OPENED: ', notification);
        // if (!_navigator) { // Check if there is a navigator object. If not, waiting with the notification.
        //   console.log('Navigator is null, adding notification to pending list...');
        pendingNotifications.push(notification);
        //   return;
        // }
        handleNotification(notification);
      }
    });

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }

  componentWillMount() {
    // configure OneSignal
    OneSignal.configure({
        onNotificationOpened: function(message, data, isActive) {
            var notification = {message: message, data: data, isActive: isActive};
            console.log('NOTIFICATION OPENED: ', notification);
            //if (!_navigator) { // Check if there is a navigator object. If not, waiting with the notification.
            //    console.log('Navigator is null, adding notification to pending list...');
                pendingNotifications.push(notification);
            //    return;
            // }

            AlertIOS.alert(
              'Push Notification Received',
              'Alert message: ' + notification,
              [{
                text: 'Dismiss',
                onPress: null,
              }]
            );

            handleNotification(notification);
        }
    });
    // PushNotificationIOS.addEventListener('register', function(token){
    //   console.log('You are registered and the device token is: ',token)
    // });
    // // Add listener for push notifications
    // PushNotificationIOS.addEventListener('notification', this.onNotification);
    // // Add listener for local notifications
    // PushNotificationIOS.addEventListener('localNotification', this.onLocalNotification);
  }

  // componentWillUnmount() {
  //   // Remove listener for push notifications
  //   PushNotificationIOS.removeEventListener('notification', this.onNotification);
  //   // Remove listener for local notifications
  //   PushNotificationIOS.removeEventListener('localNotification', this.onLocalNotification);
  // }

  // onNotification(notification) {
  //   console.log("onNotification");
  //   AlertIOS.alert(
  //     'Push Notification Received',
  //     'Alert message: ' + notification.getMessage(),
  //     [{
  //       text: 'Dismiss',
  //       onPress: null,
  //     }]
  //   );
  // }
  //
  // onLocalNotification(notification) {
  //   console.log("onLocalNotification");
  //   AlertIOS.alert(
  //     'Local Notification Received',
  //     'Alert message: ' + notification.getMessage(),
  //     [{
  //       text: 'Dismiss',
  //       onPress: null,
  //     }]
  //   );
  // }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('PushNotificationsExample', () => PushNotificationsExample);
