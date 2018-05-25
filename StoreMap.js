import React, { Component } from "react";
import { MapView } from "expo";

class StoreMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stores: [
        {
          latitude: 13.019995,
          longitude: 80.185405,
          title: "Bay Store",
          id: "s1"
        },
        {
            latitude: 13.040172,
            longitude: 80.184968,
            title: "Pep Store",
            id: "s2"
        },
        {
            latitude: 12.990172,
            longitude: 80.183968,
            title: "Dry Store",
            id: "s3"
          }
      ]
    };
  }
  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: this.state.stores[0].latitude,
          longitude: this.state.stores[0].longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
       {this.state.stores.map(s => (<MapView.Marker
          coordinate={{
            latitude: s.latitude,
            longitude: s.longitude
          }}
          title={s.title}
          key={s.id}
        />
      ))}
      </MapView>
    );
  }
}

export default StoreMap;
