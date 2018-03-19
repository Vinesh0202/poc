import React from 'react';
import { View, Text, Alert, TextInput, ActivityIndicator, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import SMTP from '../smpt/smtp.js';
import { Container, Header, Content, Form, Item, Input, Label, Card, CardItem } from 'native-base';
import EventEmitter from "react-native-eventemitter";
import { Router, Scene, Drawer, Actions } from 'react-native-router-flux';
import Modal from "react-native-modal";

let title_data = [{
    value: 'Preventive Maintenance',
  }, {
    value: 'Functional Error',
  }, {
    value: 'Improvement',
  },
  {
    value: 'Deterioration',
  },
  {
    value: 'Alarm',
  },
  {
    value: 'Leakage',
  },
  {
    value: 'Not Starting',
  },
  {
    value: 'Breakdown',
  },
  {
    value: 'Other',
  },
];

let work_data = [{
      value: 'Disturbance',
    }, {
      value: 'Stoppage',
    }, {
      value: 'PM reviewed error',
    },
    {
      value: 'Precautionary',
    }
  ];

let priority_data = [{
          value: 'Not prioritised',
        }, {
          value: 'Safety',
        }, {
          value: 'Environment',
        },
        {
          value: 'Quality',
        },
        {
          value: 'Delivery',
        }
      ];

export default class ScannerContents extends React.Component {

  constructor(props){
    super(props);
    console.log("PROPS COntents: ", this.props.contents);
    if(this.props.contents != undefined || this.props.contents != null){
      this.state = {
                      title: "",
                      work_type: "",
                      priority: "",
                      entity_id: this.props.contents.entity_id,
                      order_type: this.props.contents.order_type,
                      information: "",
                      issuer: "",
                      showProgress: false,
                      isModalVisible: false
                    }
    }else{
      this.state = {
                      title: "",
                      work_type: "",
                      priority: "",
                      entity_id: "",
                      order_type: "",
                      information: "",
                      issuer: "",
                      showProgress: false,
                      isModalVisible: false
                    }
    }
  }

  componentWillMount(){
    EventEmitter.on("email_sent", ()=>{
            this.setState({showProgress: false});
            Alert.alert(
              'Maintenance Request Sent',
              'Request for the Entity ID: ' + this.state.entity_id + ' has been sent successfully',
              [
                {text: 'Ok', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              ],
              { cancelable: false }
            )
            //Actions.email_sent();
            //alert("SENT IS THE EMAIL!!");
        });
  }

  componentWillUnmount() {
     EventEmitter.removeAllListeners("email_sent");
   }

  inputOnChange = (input_value, input_type) => {
    this.setState({[input_type]: input_value});
  }

  sendDetails = () => {
    console.log("Send Email Pressed!!");

    if(this.state.title.length > 0 && this.state.entity_id.length > 0 && this.state.work_type.length > 0 && this.state.priority.length > 0){
      this.setState({showProgress: true});
      var subject = "Volvo Group Support"

      var body = "Title: " + this.state.title + "\n" + "Work Type: " + this.state.work_type + "\n" + "Priority: " + this.state.priority + "\n" + "Entity ID: " + this.state.entity_id + "\n" + "Order Type: " + this.state.order_type + "\n" + "Information: " + this.state.information + "\n" + "Issuer " + this.state.issuer + "\n";

      console.log(body);

        Email.send("nvineshkumar@gmail.com",
                    "nvineshkumar@gmail.com",
                    subject,
                    body,
                    "smtp.gmail.com",
                    "vce.globalsc60@gmail.com",
                    "volvo@123",
                    function done(message) {
                      EventEmitter.emit("email_sent");
                    }

                  );
    }else{
      alert("Please enter all the mandatory fields");
    }
  }

  clearallfields = () => {
    this.setState({
      title: "",
      work_type: "",
      priority: "",
      entity_id: "",
      order_type: "",
      information: "",
      issuer: "",
      showProgress: false
    });
    Actions.pop();
  }

  handle_progress = () => {
    console.log("Handle Progress calledSS");
    this.setState({showProgress: false});
  }

  render(){
    return(
      <Container style={styles.container}>
        <Content>
          <View style={{padding: 20, flex: 1, justifyContent:'center'}}>
            <Item floatingLabel style={{marginTop:10}}>
              <Label style={{fontSize: 16, color:'rgba(50, 50, 50, 1)', fontWeight:'bold'}}>Entity ID <Text style={{color:'red'}}> *</Text></Label>
              <Input value={this.state.entity_id} onChangeText={(entity) => {this.inputOnChange(entity, 'entity_id')}}/>
            </Item>
            <Dropdown
              label={<Text style={{color:'rgba(50, 50, 50, 1)', fontWeight:'bold'}}>Title <Text style={{color:'red'}}> *</Text></Text>}
              data={title_data}
              baseColor="rgba(83, 85, 86, 1)"
              labelFontSize={16}
              style={{width: Dimensions.get('window').width,fontSize: 18, color: 'black'}}
              value={this.state.title}
              onChangeText={(title) => {this.inputOnChange(title, 'title')}}
            />
            <View style={{flexDirection:'row', flex: 1}}>
              <View style={{flex: 5}}>
                <Dropdown
                  label={<Text style={{color:'rgba(50, 50, 50, 1)', fontWeight:'bold'}}>Work Type <Text style={{color:'red'}}> *</Text></Text>}
                  data={work_data}
                  baseColor="rgba(83, 85, 86, 1)"
                  labelFontSize={16}
                  style={{fontSize: 18, color: 'black'}}
                  value={this.state.work_type}
                  onChangeText={(work_type) => {this.inputOnChange(work_type, 'work_type')}}
                />
              </View>
              <View style={{flex: 5}}>
                <Dropdown
                  label={<Text style={{color:'rgba(50, 50, 50, 1)', fontWeight:'bold'}}>Prority <Text style={{color:'red'}}> *</Text></Text>}
                  data={priority_data}
                  baseColor="rgba(83, 85, 86, 1)"
                  labelFontSize={16}
                  style={{fontSize: 18, color: 'black'}}
                  value={this.state.priority}
                  onChangeText={(priority) => {this.inputOnChange(priority, 'priority')}}
                />
              </View>
            </View>
            <Item floatingLabel style={{marginTop:10}}>
              <Label style={{fontSize: 16, color: 'black', fontWeight:'bold'}}>Issuer</Label>
              <Input value={this.state.issuer} onChangeText={(issuer) => {this.inputOnChange(issuer, 'issuer')}}/>
            </Item>
            <Item floatingLabel style={{marginTop:10}}>
              <Label style={{fontSize: 16, color: 'black', fontWeight:'bold'}}>Information</Label>
              <Input multiline={true} value={this.state.information} onChangeText={(information) => {this.inputOnChange(information, 'information')}} style={{height: 150}} style={{height: 150}}/>
            </Item>
            <ActivityIndicator style={{opacity: this.state.showProgress ? 1.0 : 0.0, paddingTop:15}} animating={true} size="large" color="#2271E3" />
          </View>
        </Content>
        <View style={{flexDirection:'row', background:'#fff', padding:5}}>
          <TouchableOpacity onPress={() => this.clearallfields()} style={{flex:5, height: 50, alignItems: 'center', justifyContent: "center", backgroundColor: 'rgba(128, 158, 180, 1)', borderRightWidth:1, borderColor:'#fff'}}>
            <View>
              <Text style={[styles.button_text, {fontSize: 18}]}>Cancel</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.sendDetails()} style={{flex:5, height: 50, alignItems: 'center', justifyContent: "center", backgroundColor: 'rgba(128, 158, 180, 1)'}}>
            <View>
              <Text style={[styles.button_text, {fontSize: 18}]}>Send Details</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(242, 243, 246, 1)',
  },
  button_text: {
    color: '#fff', textAlign: 'center'
  }
});

// <TouchableOpacity onPress={() => this.sendDetails()}>
//   <View style={{height: 50, alignItems: 'center', justifyContent: "center", backgroundColor: '#2271E3', borderRadius: 8, marginTop: 50}}>
//     <Text style={[styles.button_text, {fontSize: 18}]}>Send Details</Text>
//   </View>
// </TouchableOpacity>
