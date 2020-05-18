import React, { useState, useEffect } from 'react'
import { map, Map as ReactMap, GoogleMapsReact, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'
import {
  IonPopover,
  IonPage,
  IonModal,
  IonContent,
  IonTitle,
  IonButton
} from '@ionic/react';
import PopoverInfo from './PopoverInfo'
// import '../index.css'

function GoogleMap(props) {

	const [mockInfoWindow, toggleMockInfoWindow] = useState(false)

	const containerStyle = {
		height: "65%",
		width: "65%",
		border: '4px solid black',
		filter: 'grayscale(1) contrast(1.1)',
	}
	
	const findArtToShowInPopover = async (id) => {
		console.log('artToShowInPopover being called rn');
		console.log('id argument in findArtToShowInPopover', id);

		props.setIdOfMockInfoWindowToShow(id)
	}
	
	let artIndex = props.allStreetArt.findIndex(art => art.id === props.idOfMockInfoWindowToShow)

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
				onClick={ async () => {

					console.log('idOfMockInfoWindowToShow in streetArtMarkers', props.idOfMockInfoWindowToShow);
					findArtToShowInPopover(streetArt.id)

				}}
				// Label={streetArt.name}
				icon={{
					url: 'https://i.imgur.com/ITTuJu8.png'
				}}

			/>
		)
		
	})

	return (
		<div className='MapDivContainer'>
			<div className='MapDiv'>
				{
					props.currentLoc.lat !== ""
					?
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

						{
							props.idOfMockInfoWindowToShow !== ""
							&&
							<IonPopover
									isOpen={true}
									id='confirmDelete'
									onDidDismiss={ () => {
										// toggleMockInfoWindow(false)
										props.setIdOfMockInfoWindowToShow('')
									} }
							> 

								<PopoverInfo 
									artIndex={artIndex}
									allStreetArt={props.allStreetArt}
									currentUser={props.currentUser}
									setStreetArtToUpdate={props.setStreetArtToUpdate}
								/> 

							</IonPopover>
						}


					</ReactMap>
					:
					<ReactMap 
						id="map"
						google={props.google} 
						zoom={14} 
						initialCenter={{
							lat: 41.8757,
							lng: -87.6243
						}}
						containerStyle={containerStyle}
					>

						{ streetArtMarkers }

						{
							props.idOfMockInfoWindowToShow !== ""
							&&
							<IonPopover
									isOpen={true}
									id='confirmDelete'
									onDidDismiss={ () => {
										// toggleMockInfoWindow(false)
										props.setIdOfMockInfoWindowToShow('')
									} }
							> 

								<PopoverInfo 
									artIndex={artIndex}
									allStreetArt={props.allStreetArt}
									currentUser={props.currentUser}
									setStreetArtToUpdate={props.setStreetArtToUpdate}
								/> 

							</IonPopover>
						}


					</ReactMap>
				}
			</div>
		</div>
	)
}

// adding API key to .env disabled the map, would like to find a way to hide the key
export default GoogleApiWrapper((props) => ({
	apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
	// LoadingContainer: GoogleMap
}))(GoogleMap)