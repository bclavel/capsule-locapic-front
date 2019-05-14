import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Button } from 'react-native';
import { AuthSession } from 'expo';
import { connect } from 'react-redux';


class HomeScreen extends React.Component {
 render() {
  const {navigate} = this.props.navigation;
  return (
    <ImageBackground source={require('../assets/home.jpg')} style={{width: '100%', height: '100%'}}>
      <View style={styles.homeContainer}>
        <Button large title="Home page" backgroundColor='#3498db' textStyle={styles.homeBtn} containerViewStyle={{margin: 20}} onPress={this.handleSubmit} />
      </View>
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
     this.props.handleUserValid(result.params.firstName, result.params.lastName, result.params.email, result.params.userId)
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
  }
});

function mapDispatchToProps(dispatch) {
  console.log('Dispatch Home >>', dispatch);
 return {
  handleUserValid : function(firstNameUser, lastNameUser, emailUser, idUser) {
    dispatch( {
      type: 'signin',
      firstName : firstNameUser,
      lastName : lastNameUser,
      email : emailUser,
      userId : idUser
    })
  }
 }
}

export default connect(null, mapDispatchToProps)(HomeScreen);
