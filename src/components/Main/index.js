import React from "react";
import Selector from "./../Selector";

import "./Main.css";

const COORDS = {
  "Europe/Berlin": { lat: 52.518611, lng: 13.408333 },
};

const SelectorProps = {
  options: [
    { name: "Pizza", value: "Pizza" },
    { name: "Burger", value: "Burger" },
    { name: "Sushi", value: "Sushi" },
  ],
  defaultValue: "Pizza",
  label: "What would you like to eat?",
};

let markers = [];

class Main extends React.Component {
  state = {
    businesses: [],
  };

  mapsApiLoaded = null;
  mapInstance = null;

  componentDidMount() {
    this.getRestaurants();
    this.mapsApiLoaded = window.setTimeout(this.checkMapsApi.bind(this), 200);
  }

  getRestaurants = (term) => {
    this.cleanMarker();
    this.fetchRestaurants(term)
      .then((res) => this.setState({ businesses: res.businesses || [] }))
      .catch((err) => console.log(err));
  };

  fetchRestaurants = async (term = SelectorProps.defaultValue) => {
    const query = {
      limit: 50,
      location: "Berlin, Germany",
      term: term,
    };
    const urlParams = new URLSearchParams(query);
    const response = await fetch(`/-/search?${urlParams}`);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  checkMapsApi() {
    if (window.google && window.google.maps) {
      window.clearTimeout(this.mapsApiLoaded);
      this.initMap();
    }
  }

  initMap() {
    const mapEl = document.getElementById("places-map");
    if (mapEl && !this.mapInstance) {
      this.mapInstance = new window.google.maps.Map(mapEl, {
        center: COORDS["Europe/Berlin"],
        zoom: 12,
      });
    }
  }
  addMarker(coordinates, name) {
    let marker = new window.google.maps.Marker({
      position: {
        lat: coordinates.latitude,
        lng: coordinates.longitude,
      },
      map: this.mapInstance,
      label: name,
    });
    markers.push(marker);
  }
  cleanMarker() {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
  }

  render() {
    return (
      <main>
        <div id="places-map" className="places-map"></div>
        <Selector {...SelectorProps} onChange={this.getRestaurants} />
        {this.state.businesses.map((business) => {
          this.addMarker(business.coordinates, business.name);
          return (
            <div className="card" key={business.id}>
              <img src={business.image_url} alt={business.name} />
              <div className="container">
                <h4>
                  <a href={business.url}>{business.name}</a>
                </h4>
                {business.location && business.location.display_address && (
                  <p>
                    {business.location.display_address[0]}
                    <br />
                    {business.location.display_address[1]}
                  </p>
                )}
                <p>{business.display_phone}</p>
              </div>
            </div>
          );
        })}
      </main>
    );
  }
}

export default Main;
