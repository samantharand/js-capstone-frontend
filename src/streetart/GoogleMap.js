import React, { useState, useEffect } from 'react'
import { Map as ReactMap, GoogleMapsReact, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'
import {
  IonPopover,
  IonPage,
  IonModal,
  IonContent,
  IonTitle
} from '@ionic/react';
import '../index.css'

function GoogleMap(props) {
	// console.log('props in google maps', props);
	console.log('currentLoc from inside googlemaps.js', props.currentLoc);

	// useEffect(() => {
	// 	props.findBrowserLocation()	
	// }, [props.currentLoc])

	const [mockInfoWindow, toggleMockInfoWindow] = useState(false)

	// id of mock info window to show in state
	const [idOfMockInfoWindowToShow, setIdOfMockInfoWindowToShow] = useState('')

	const containerStyle = {
		height: "75%",
		width: "75%"
	}

	const streetArtMarkers = props.allStreetArt.map((streetArt, i) => {
		const lng = streetArt.longitude
		const lat = streetArt.latitude

		return (
			<Marker
				class='marker'
				key = {streetArt.id}
				position={{
					lat: lat,
					lng: lng
				}}
				onClick={ () => toggleMockInfoWindow(true) }
				// Label={streetArt.name[0]}
				// onMouseover={ () => toggleMockInfoWindow(true) }
			/>
		)
		
	})

	// const infowindow = new InfoWindow({
	// 	content: "AAHHHH"
	// })

	return (
		<React.Fragment>
			<IonPage>
				<IonContent>
				<IonTitle> Map </IonTitle>

					<ReactMap 
						id="map"
						google={props.google} 
						zoom={14} 
						initialCenter={{
							lat: props.currentLoc.lat, 
							lng: props.currentLoc.lng
						}}
						containerStyle={containerStyle}
					>

						{ streetArtMarkers }


						<IonPopover
								isOpen={mockInfoWindow}
								id='confirmDelete'
								onDidDismiss={ () => toggleMockInfoWindow(false) }
						> hihihi </IonPopover>


					</ReactMap>

				</IonContent>
			</IonPage>
		</React.Fragment>
	)
}




					// {
					// 	props.currentLoc == undefined
					// 	?
					// 	<ReactMap 
					// 		id="map"
					// 		google={props.google} 
					// 		zoom={14} 
					// 		initialCenter={{
					// 			lat: 39.9526, 
					// 			lng: -75.1652
					// 		}}
					// 		containerStyle={containerStyle}
					// 	>

					// 		{ streetArtMarkers }

					// 		<IonPopover
					// 				isOpen={mockInfoWindow}
					// 				id='confirmDelete'
					// 				onDidDismiss={ () => toggleMockInfoWindow(false) }
					// 		> hihihi </IonPopover>

					// 	</ReactMap>
					// 	:
					// 	<ReactMap 
					// 		id="map"
					// 		google={props.google} 
					// 		zoom={14} 
					// 		initialCenter={{
					// 			lat: props.currentLoc.lat, 
					// 			lng: props.currentLoc.lng
					// 		}}
					// 		containerStyle={containerStyle}
					// 	>

					// 		{ streetArtMarkers }

					// 		<IonPopover
					// 				isOpen={mockInfoWindow}
					// 				id='confirmDelete'
					// 				onDidDismiss={ () => toggleMockInfoWindow(false) }
					// 		> hihihi </IonPopover>

					// 	</ReactMap>
					// }





// adding API key to .env disabled the map, would like to find a way to hide the key
export default GoogleApiWrapper((props) => ({
	apiKey: 'AIzaSyB7G8yZAkGYtf2QQzkS1n0E1gZtpPF_h8w',
	// LoadingContainer: GoogleMap
}))(GoogleMap)