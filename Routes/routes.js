import React, { Component } from 'react';
import { StyleSheet, View, PixelRatio, Alert, AsyncStorage, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Router, Scene, Drawer, Actions } from 'react-native-router-flux';
import Home from '../Containers/home.js';
import QRCodeScanner from '../Containers/qrcodeScanner.js';
import ScannerContents from '../Containers/loadScannedContents.js';
import EmailSent from '../Containers/email_sent.js';
import DrawerContent from '../Containers/drawer.js';
import Icon from 'react-native-vector-icons/dist/FontAwesome.js';

const drawerIcon = () => <Icon name='bars' size={30} color={'rgba(50, 50, 50, 1)'} />;
const nav_title = () => {
  return(
    <View style={[styles.navigationBarStyle, styles.navigationBarViewShadow, {flexDirection:'row', alignItems:'center'}]}>
      <View style={{justifyContent:'center', paddingLeft: 10}}>
        <TouchableOpacity onPress={() => Actions.drawerOpen()}>
          <Icon name='bars' size={30} color={'rgba(50, 50, 50, 1)'} />
        </TouchableOpacity>
      </View>
      <View style={{justifyContent:'center', paddingLeft: 30}}>
        <Image source={require('../assets/icon72x72.png')} style={{width: 40, height: 40}}/>
      </View>
      <View style={{alignItems:'center', justifyContent:'center', paddingLeft: ((Dimensions.get('window').width * 10)/100)}}>
        <Text style={{textAlign:'center', color: 'rgba(50, 50, 50, 1)', fontSize: 20, fontWeight: '400'}}>VCE Maintenance</Text>
        <Text style={{textAlign:'center', fontSize: 16, alignSelf: 'center', color: 'rgba(50, 50, 50, 1)'}}>Eskilstuna Plant</Text>
      </View>
    </View>
  );
}

//'Eskilstuna Plant'

const RootRouter = () => {
  return (
    <Router>
      <Scene key="root">
        <Drawer
          hideNavBar
          key="drawerMenu"
          contentComponent={DrawerContent}
          drawerIcon={drawerIcon}
          drawerWidth={300}
          drawerPosition="left"
        >
          <Scene key="home" component={Home} initial navBar={nav_title} tintColor="#fff" titleStyle={styles.navigationBarTitleStyle} navigationBarStyle={styles.navigationBarStyle}/>
          <Scene key="qrcode"
            component={QRCodeScanner}
            navBar={nav_title}
            tintColor="#fff"
            titleStyle={styles.navigationBarTitleStyle} navigationBarStyle={styles.navigationBarStyle}
          />
          <Scene
            key="contents"
            component={ScannerContents}
            navBar={nav_title}
            tintColor="#fff"
            titleStyle={styles.navigationBarTitleStyle} navigationBarStyle={styles.navigationBarStyle}
          />
          <Scene
            key="email_sent"
            component={EmailSent}
            navBar={nav_title}
            tintColor="#fff"
            titleStyle={styles.navigationBarTitleStyle} navigationBarStyle={styles.navigationBarStyle}
          />
        </Drawer>
      </Scene>
    </Router>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigationBarStyle: {
    backgroundColor:'#fff', height:60
  },
  navigationBarTitleStyle: {
    alignSelf: 'center', color: 'rgba(50, 50, 50, 1)', fontSize: 22, fontWeight: '400'
  },
  navigationBarViewShadow: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1
  }
});

export default RootRouter;
