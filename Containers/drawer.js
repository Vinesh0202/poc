import React from 'React';
import { Platform, PropTypes, AsyncStorage, ScrollView, StyleSheet, Text, View, Image,TouchableHighlight, TouchableOpacity, Alert} from 'react-native';
import { Container, Content, Header, Left, Body, Right, Button, CheckBox, Title, Subtitle, Card, CardItem, H1, H2, H3, Picker, Form,  Item, Label, Input, Item as FormItem } from 'native-base';
import Icon from 'react-native-vector-icons/dist/FontAwesome.js';
import { Actions } from 'react-native-router-flux';

export default class ControlPanel extends React.Component {

  constructor(props){
    super(props);

  }

  componentWillMount(){
    console.log("Vendor Home Screen!!");
  }

  render() {
    let {closeDrawer} = this.props
    console.log("DRAWER PROPS: ", this.props);
    return (
      <ScrollView style={styles.container}>
        <View style={{backgroundColor:'white', paddingTop: 20}}>
          <TouchableOpacity onPress={() => Actions.home()}>
            <View style={{flexDirection: 'row', padding: 20, borderBottomWidth: 1, borderColor: 'lightgrey'}}>
              <Icon name='home' size={25} color={'rgba(50, 50, 50, 1)'} />
              <Text style={{paddingLeft:10, fontWeight: 'bold'}}>Home</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{flexDirection: 'row', padding: 20, borderBottomWidth: 1, borderColor: 'lightgrey'}}>
              <Icon name='language' size={25} color={'rgba(50, 50, 50, 1)'} />
              <Text style={{paddingLeft:10, fontWeight: 'bold'}}>Language</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity >
            <View style={{flexDirection: 'row', padding: 20, borderBottomWidth: 1, borderColor: 'lightgrey'}}>
              <Icon name='rocket' size={25} color={'rgba(50, 50, 50, 1)'} />
              <Text style={{paddingLeft:10, fontWeight: 'bold'}}>Version v1.0</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity >
            <View style={{flexDirection: 'row', padding: 20, borderBottomWidth: 1, borderColor: 'lightgrey'}}>
              <Icon name='info-circle' size={25} color={'rgba(50, 50, 50, 1)'} />
              <Text style={{paddingLeft:10, fontWeight: 'bold'}}>About Us</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
  },
  controlText: {
    color: 'white',
  },
  button: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
  }
});

//Profile View
// <View style={{flexDirection:'row', backgroundColor:'lightblue', paddingLeft:10, paddingTop:40, paddingBottom:25}}>
//   <View style={{width: 75, height: 75 , borderRadius: 75/2, backgroundColor:'white'}}>
//   </View>
//   <View style={{flex:1,justifyContent:'center', alignItems:'flex-start', padding:10}}>
//     <H3>Home</H3>
//     <Text style={{padding:5}}>4.89 <Icon name="star" style={{fontSize:16}} color="#900" /></Text>
//   </View>
// </View>



//<Image source={require('../assets/vendor_profile_icon.png')} style={{flexGrow:1, height:75, width: 75, borderRadius:75/2, justifyContent:'center'}} resizeMode='cover'/>
