import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

class PageA extends React.Component {
 render() {
   console.log('PAGE A - props user >>>', this.props.user);
  return (
    <View style={styles.homeContainer}>
      <Text style={{fontSize : 30}}>Bonjour {this.props.user.firstName}</Text>
    </View>
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
  }
});


function mapStateToProps(state) {
  console.log('PAGE A - dispatch : state UserData >>', state.userData);
 return { user: state.userData }
}

export default connect(mapStateToProps, null)(PageA);
