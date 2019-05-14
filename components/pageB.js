import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

class PageB extends React.Component {
 render() {
   console.log('PAGE B - props user >>>', this.props.user);
  return (
    <View style={styles.homeContainer}>
      <Text style={{fontSize : 30}}>Bonjour {this.props.user.lastName}</Text>
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
  console.log('PAGE B - dispatch : state UserData >>', state.userData);
 return { user: state.userData }
}

export default connect(mapStateToProps, null)(PageB);
