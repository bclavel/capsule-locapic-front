import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { Location, Permissions } from 'expo';

class PageA extends React.Component {
  constructor() {
  super();
  this.state = {
    userLat : 0,
    userLon : 0,
    logPosition : [],
    displayHistorique : true,
    isMapReady: false,
    region: {
      latitude: 48.866667,
      longitude: 2.333333,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }
  };
}

  componentWillMount() {
    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    var { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    Location.watchPositionAsync({distanceInterval: 1},
        (location) => {
          console.log(location);
          this.setState({
            userLat : location.coords.latitude,
            userLon : location.coords.longitude
          });
          var ctx = this
          fetch('https://locapic-capsule-bc.herokuapp.com/logPosition', {
           method: 'POST',
           headers: {'Content-Type':'application/x-www-form-urlencoded'},
           body: `facebookId=${this.props.user.facebookId}&userLat=${this.state.userLat}&userLon=${this.state.userLon}`
          })
          .then(function(response) {
            return response.json()
          })
          .then(function(data) {
            console.log('PAGE A - fetch data >>', data);
            ctx.setState({
              logPosition : data.user.historiquePosition
            })
            console.log('PAGE A - Fetch Then - this state logPosition >>>', ctx.state.logPosition);
          })
          .catch(function(error) {
          console.log('There has been a problem with your fetch operation mec: ' + error.message);
            throw error;
          });
        })
  }

  onMapLayout = () => {
    this.setState({ isMapReady: true });
  }

 render() {
   console.log('PAGE A - props user >>>', this.props.user);
   console.log('PAGE A - Render - this state logPosition >>>', this.state.logPosition);
   var positionList = []
   if (this.state.displayHistorique) {
     positionList = this.state.logPosition.map((pin, i) => (
       <MapView.Marker key={i} pinColor='blue' title="Hello" description={pin.latitude + ' ' + pin.latitude} coordinate={{latitude: pin.latitude, longitude: pin.longitude}}/>
     ))
   }
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        region={this.state.region}
        onLayout={this.onMapLayout}
      >
      <Marker title="Hello" coordinate={{latitude: this.state.userLat, longitude: this.state.userLon}}/>
      {positionList}
      </MapView>
      <View
        style={{
            position: 'absolute',//use absolute position to show button on top of the map
            top: '90%',
            alignSelf: 'center' //for align to right
        }}
        >
      <Button large title="Historique" backgroundColor='#3498db' textStyle={styles.homeBtn} containerViewStyle={{margin: 20}} onPress={() => this.setState({displayHistorique : !this.state.displayHistorique})} />
    </View>
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
