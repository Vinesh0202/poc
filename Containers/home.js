import React from 'react';
import { View, StyleSheet, Text, Platform, TouchableHighlight, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class Home extends React.Component<Props> {

  scan_action = () => {
    //alert("Load Scan Screen!!");
    Actions.qrcode();
  }

  enter_action = () => {
    Actions.contents();
  }

//B4CEF3
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight underlayColor="#B4CEF3" onPress={() => this.scan_action()} style={styles.scan_button}>
          <View style={styles.scan_button}>
            <Text style={[styles.button_text, {fontSize: 35}]}>Scan</Text>
          </View>
        </TouchableHighlight>
        <Text style={{fontSize: 24, color: 'grey', fontWeight: '400', padding: 30}}>(OR)</Text>
        <TouchableHighlight underlayColor="#B4CEF3" onPress={() => this.enter_action()} style={styles.enter_button}>
          <View style={styles.enter_button}>
            <Text style={[styles.button_text, {fontSize: 22}]}>Enter Details</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(242, 243, 246, 1)',
  },
  scan_button: {
    //2271E3
    width: 200, height: 200, borderRadius: 300/2, backgroundColor: 'rgba(128, 158, 180, 1)', justifyContent:'center'
  },
  enter_button:{
    width: 300, height: 50, borderRadius: 8, backgroundColor: 'rgba(128, 158, 180, 1)', justifyContent:'center'
  },
  button_text: {
    color: '#fff', fontWeight: '400', textAlign: 'center'
  }
});
