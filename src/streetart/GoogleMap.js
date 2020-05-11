import React, {useState } from 'react'
import { Map as ReactMap, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'

function GoogleMap(props) {
	return (
		<React.Fragment>
			<ReactMap 
				google={props.google} 
				zoom={14} 
				initialCenter={{
					lat: 41.8781, 
					lng: -87.6298
				}}
			>

				<Marker 
					position={{
						lat: 41.8781, 
						lng: -87.6298
					}}
				/>
				
			</ReactMap>
		</React.Fragment>
	)
}

// adding API key to .env disabled the map, would like to find a way to hide the key
export default GoogleApiWrapper({
	apiKey: 'AIzaSyB7G8yZAkGYtf2QQzkS1n0E1gZtpPF_h8w',
	LoadingContainer: GoogleMap
})(GoogleMap)