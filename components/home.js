import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, ImageBackground, Button } from 'react-native';
import { Avatar, Divider } from 'react-native-elements'
import { AuthSession } from 'expo';
import { connect } from 'react-redux';


class HomeScreen extends React.Component {
  constructor() {
  super();
  this.state = {
    userLocalStorage : null
    };
  }

  componentDidMount() {
    var ctx = this
    AsyncStorage.getItem("user", function(error, data) {
      var userData = JSON.parse(data)
      console.log('HOME - Result userData DidMount', userData);
      if (userData) {
        ctx.props.handleUserValid(userData.firstName, userData.lastName, userData.email, userData.userId, userData.picture)
        ctx.setState({userLocalStorage : userData})
      }
    })
  }

 render() {
   var userProfile
   if (this.state.userLocalStorage) {
     console.log('existing user from reducer');
     buttonTitle = `Welcome back ${this.state.userLocalStorage.firstName}`
     userProfile = <View style={styles.homeContainer}>
     <Avatar
        large
        rounded
        source={{uri: this.state.userLocalStorage.picture}}
        activeOpacity={0.9}
      />
      <Divider></Divider>
      <Button large title={buttonTitle} backgroundColor='#3498db' textStyle={styles.homeBtn} containerViewStyle={{margin: 20}} onPress={() => {this.props.navigation.navigate('PageA')}} />
      <Button title="Clear ça dégage" onPress={()=> AsyncStorage.clear() }/>
     </View>
   } else {
     userProfile = <View style={styles.homeContainer}>
      <Button large title="Se connecter" backgroundColor='#3498db' textStyle={styles.homeBtn} containerViewStyle={{margin: 20}} onPress={this.handleSubmit} />
     </View>
   }
  return (
    <ImageBackground source={require('../assets/home.jpg')} style={{width: '100%', height: '100%'}}>
        {userProfile}
    </ImageBackground>
  );
 }
 handleSubmit = async () => {
   var redirectUrl = AuthSession.getRedirectUrl();
   console.log('redirect URL >>>', redirectUrl);

   var result = await AuthSession.startAsync({
     authUrl:
     'https://locapic-capsule-bc.herokuapp.com/auth/facebook?redirectUrl='+redirectUrl
   });

   if (result.type == 'success') {
     AsyncStorage.setItem("user", JSON.stringify(result.params))
     this.props.handleUserValid(result.params.firstName, result.params.lastName, result.params.email, result.params.userId, result.params.picture)
     this.props.navigation.navigate('PageA')
   }
  console.log('HOME - result handleSubmit >>', result);
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
    margin : '20px'
  }
});

function mapDispatchToProps(dispatch) {
  console.log('Dispatch Home >>', dispatch);
 return {
  handleUserValid : function(firstNameUser, lastNameUser, emailUser, idUser, pictureUser) {
    dispatch( {
      type: 'signin',
      firstName : firstNameUser,
      lastName : lastNameUser,
      email : emailUser,
      userId : idUser,
      picture : pictureUser
    })
  }
 }
}

export default connect(null, mapDispatchToProps)(HomeScreen);
