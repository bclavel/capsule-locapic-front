import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, ScrollView } from 'react-native';
import { List, ListItem, FormInput, Button } from 'react-native-elements'
import { connect } from 'react-redux';

import socketIOClient from "socket.io-client";

class PageB extends React.Component {
  constructor() {
  super();
  this.state = {
    messageToSend : '',
    messageList : []
    }
  };

  componentDidMount(){
    this.socket = socketIOClient("https://locapic-capsule-bc.herokuapp.com");
    this.socket.on('sendMessageFromBack', (message)=> {
      console.log('PAGE B - Message from back', message);
      messageListCopy = [...this.state.messageList]
      messageListCopy.push(message)
      this.setState({messageList : messageListCopy})
      console.log('PAGE B - state messageList', this.state.messageList);
    });
  };

handleSubmit = () => {
    this.socket.emit(
      "sendMessage", {
        message : this.state.messageToSend,
        user : this.props.user.firstName,
        picture : this.props.user.picture
      });
    this.setState({messageToSend : ''});
  }
 render() {
   var messageList = this.state.messageList.map((message, i) => (
       <ListItem
       roundAvatar
       hideChevron
       key={i}
       avatar={{uri : message.picture}}
       title={message.user}
       subtitle={message.message}
      />
     ))
  return (
    <ScrollView>
      <List containerStyle={{marginBottom: 20}}>
          <ListItem
            roundAvatar
            hideChevron
            avatar={{uri:"https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"}}
            title='Bernard Doe'
            subtitle='Message'
          />
          {messageList}
      </List>
      <KeyboardAvoidingView behavior="padding" enabled>
        <FormInput
        onChangeText={(value) => this.setState({messageToSend : value})}
        value={this.state.messageToSend}
        containerStyle={styles.formBorder}
        placeholder='Saisissez votre message'
        />
        <Button
        large
        title="Envoyer"
        backgroundColor='#3498db'
        textStyle={styles.homeBtn}
        containerViewStyle={{margin: 20}}
        onPress={this.handleSubmit}/>
      </KeyboardAvoidingView>
    </ScrollView>
  );
 }
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
  homeBtn: {
    textTransform: 'lowercase',
  },
  formBorder : {
    borderBottomColor: '#c4c4c4',
    borderBottomWidth: 1,
  }
});


function mapStateToProps(state) {
  console.log('PAGE B - dispatch : state UserData >>', state.userData);
 return { user: state.userData }
}

export default connect(mapStateToProps, null)(PageB);
