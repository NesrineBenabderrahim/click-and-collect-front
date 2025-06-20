import React, { useEffect } from 'react';

function GoogleMap() {
  useEffect(() => {
    const googleMapsApiUrl = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA27Qr71arQ8MrgCZf7q73bgGfs5x43XbI&libraries=places`;

    // Load Google Maps API script
    const script = document.createElement('script');
    script.src = googleMapsApiUrl;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      initializeMap();
    };

    return () => {
      // Clean up - remove the script from the DOM
      document.body.removeChild(script);
    };
  }, []);

  function initializeMap() {
    // Define the coordinates for Tunisie (Tunisia)
    const tunisie = new window.google.maps.LatLng(34.0479, 100.6197); // Example coordinates, replace with actual ones
  
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: tunisie, // Center the map on Tunisie
      zoom: 8 // Adjust zoom level as needed
    });
  
    const request = {
      location: tunisie,
      radius: '50000', // Increase radius for broader search
      type: ['restaurant']
    };
  
    const service = new window.google.maps.places.PlacesService("tunisie");
    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          createMarker("tunisie", results[i]);
        }
      }
    });
  }
  

  function createMarker(map, place) {
    // Implement the function to create markers on the map
    const marker = new window.google.maps.Marker({
      map: map,
      position: place.geometry.location
    });

    const infowindow = new window.google.maps.InfoWindow({
      content: `<div>${place.name}</div>`
    });

    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
  }

  return <div id="map" style={{ width: '100%', height: '400px' }}></div>;
}

export default GoogleMap;
