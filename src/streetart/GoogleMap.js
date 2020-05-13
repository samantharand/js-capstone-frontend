import React, {useState } from 'react'
import { Map as ReactMap, GoogleMapsReact, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'
import {
  IonPopover,
  IonPage,
  IonModal,
  IonContent
} from '@ionic/react';

function GoogleMap(props) {

	console.log('props in google maps', props);

	const [mockInfoWindow, toggleMockInfoWindow] = useState(false)

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
				onClick={ () => toggleMockInfoWindow(true) }
			/>
		)
		
	})

	return (
		<React.Fragment>
			<IonPage>
				<IonContent>

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

					<IonPopover
							isOpen={mockInfoWindow}
							id='confirmDelete'
							onDidDismiss={ () => toggleMockInfoWindow(false) }
					> hihihi </IonPopover>


				</IonContent>
			</IonPage>
		</React.Fragment>
	)
}

// adding API key to .env disabled the map, would like to find a way to hide the key
export default GoogleApiWrapper((props) => ({
	apiKey: 'AIzaSyB7G8yZAkGYtf2QQzkS1n0E1gZtpPF_h8w',
	// LoadingContainer: GoogleMap
}))(GoogleMap)