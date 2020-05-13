import React, { useState, useEffect } from 'react'
import { IonPage, IonTitle, IonList, IonItem, IonImg, IonHeader } from '@ionic/react'
import GoogleApiWrapper from './GoogleMap'
import '../index.css'

export default function MapContainer(props) {

	const [allStreetArt, setAllStreetArt] = useState([])
	const [loading, setLoading] = useState(true)
	const [currentLoc, setCurrentLoc] = useState({
		lat: '',
		lng: ''
	})
	let listStreetArt;

	useEffect(() => {
		getAllStreetArt()
		// findBrowserLocation()
		console.log("USE EFFECT IS GETTING CALLED RIGHT NOOOOW");
		console.log('allStreetArt.length in useEffect', allStreetArt.length);
	}, [])


	const findBrowserLocation = async () => {
		console.log('!!!!!!!! findBrowserLocation !!!!!!!');
		
		try {

			const success = (position) => {
				console.log('successss');
				console.log('position', position);
				setCurrentLoc({
					lat: position.coords.latitude,
					lng: position.coords.longitude
				})
				console.log('currentLoc !!!!!!!!',currentLoc);
			}

			const error = () => {
				console.log(error);
			}
			if(!navigator.geolocation) {
				console.log("error");
			} else {
				const currentLocation = navigator.geolocation.getCurrentPosition(success, error)
				console.log('cuuuuurent looooocation', currentLocation)
				// setCurrentLoc({
				// 	lat: currentLocation.coords.latitude,
				// 	lng: currentLocation.coords.longitude
				// })
			}
			
		} catch (error) {
			console.error(error)
		}

		console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
	}

	findBrowserLocation()


	const getAllStreetArt = async () => {
		console.log("GET ALL STREET ART BEING CALLED");
		try {
			const url = process.env.REACT_APP_API_URL + '/streetart/map'

			const getAllStreetArtResponse = await fetch(url, {
				credentials: 'include'
			})

			const getAllStreetArtJson = await getAllStreetArtResponse.json()	

			if(getAllStreetArtJson.status === 200) {
				setAllStreetArt(getAllStreetArtJson.data)
				setLoading(false)
				// console.log('loadingggg', loading);
				console.log("getAllStreetArtJson.message --> ", getAllStreetArtJson.message);
			} else {
				console.log("getAllStreetArtJson.message --> ", getAllStreetArtJson.message);
        		console.log("getAllStreetArtJson.status --> ", getAllStreetArtJson.status);
			}
		} catch (error) {
			console.error('ERROR in GETALLSTREETART')
			console.error(error)
		}
	}



	if(allStreetArt.length > 0) {
		// console.log('ALL STREET ART LENGTH', allStreetArt.length);
		listStreetArt = allStreetArt.map((art, i) => {
			return (
				<IonItem key={i}> 
					{allStreetArt[i].name} {allStreetArt[i].latitude}, {allStreetArt[i].longitude} 
				</IonItem>
			)
		})
	}
					// <img src={allStreetArt[i].image} />



	return (
		<IonPage className="MapPage">
		{
			loading === true
			?
			<div>nooo</div>
			:
			<IonPage>
				<div className="mapContainer">
					{	
						allStreetArt.length > 0
						&&
		         		<GoogleApiWrapper allStreetArt={allStreetArt} loading={loading} currentLoc={currentLoc}/>
					}
	        	</div>	 
				<IonList>
					
				</IonList>	
	        </IonPage>
		}
		</IonPage>
	)
}
