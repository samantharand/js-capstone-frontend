import React, {useState } from 'react'
import { Map as ReactMap, GoogleMapsReact, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'

function GoogleMap(props) {

	console.log('props in google maps', props);

	const streetArtMarkers = props.allStreetArt.map((streetArt, i) => {
			const lng = streetArt.longitude
			const lat = streetArt.latitude

		return (
			<Marker
				key = {i}
				position={{
					lat: lat,
					lng: lng
				}}
			/>
		)
		
	})

	return (
		<React.Fragment>
			<ReactMap 
				id="map"
				google={props.google} 
				zoom={14} 
				initialCenter={{
					lat: 41.8781, 
					lng: -87.6298
				}}
			>

				{ streetArtMarkers }

			</ReactMap>
		</React.Fragment>
	)
}

// adding API key to .env disabled the map, would like to find a way to hide the key
export default GoogleApiWrapper((props) => ({
	apiKey: 'AIzaSyB7G8yZAkGYtf2QQzkS1n0E1gZtpPF_h8w',
	// LoadingContainer: GoogleMap
}))(GoogleMap)