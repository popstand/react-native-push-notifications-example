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

class PushNotificationsExample extends Component {
  render() {

    PushNotificationIOS.requestPermissions();

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
    PushNotificationIOS.addEventListener('register', function(token){
      console.log('You are registered and the device token is: ',token)
    });
    // Add listener for push notifications
    PushNotificationIOS.addEventListener('notification', this.onNotification);
    // Add listener for local notifications
    PushNotificationIOS.addEventListener('localNotification', this.onLocalNotification);
  }

  componentWillUnmount() {
    // Remove listener for push notifications
    PushNotificationIOS.removeEventListener('notification', this.onNotification);
    // Remove listener for local notifications
    PushNotificationIOS.removeEventListener('localNotification', this.onLocalNotification);
  }

  onNotification(notification) {
    console.log("onNotification");
    AlertIOS.alert(
      'Push Notification Received',
      'Alert message: ' + notification.getMessage(),
      [{
        text: 'Dismiss',
        onPress: null,
      }]
    );
  }

  onLocalNotification(notification) {
    console.log("onLocalNotification");
    AlertIOS.alert(
      'Local Notification Received',
      'Alert message: ' + notification.getMessage(),
      [{
        text: 'Dismiss',
        onPress: null,
      }]
    );
  }
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
