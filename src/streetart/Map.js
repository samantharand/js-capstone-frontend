import React, { useState, useEffect } from 'react'
import { IonPage, IonTitle, IonList, IonItem, IonImg } from '@ionic/react'
import GoogleApiWrapper from './GoogleMap'

export default function MapContainer(props) {

	const [allStreetArt, setAllStreetArt] = useState('')
	const [loading, setLoading] = useState(true)
	let listStreetArt;

	useEffect(() => {
		getAllStreetArt()
		console.log('allStreetArt.length in useEffect', allStreetArt.length);
	}, [])

	const getAllStreetArt = async () => {
		try {
			const url = process.env.REACT_APP_API_URL + '/streetart/map'

			const getAllStreetArtResponse = await fetch(url, {
				credentials: 'include'
			})

			const getAllStreetArtJson = await getAllStreetArtResponse.json()	

			if(getAllStreetArtJson.status === 200) {
				setAllStreetArt(getAllStreetArtJson.data)
				setLoading(false)
				console.log('loadingggg', loading);
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
		console.log('ALL STREET ART LENGTH', allStreetArt.length);
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
					<p>map should be here vvv </p>
					{	
						allStreetArt.length > 0
						&&
		         		<GoogleApiWrapper allStreetArt={allStreetArt} loading={loading}/>
					}
	        	</div>	 
				<IonList>
					{ listStreetArt }
				</IonList>	
	        </IonPage>
		}
		<IonTitle> map :) </IonTitle>
		</IonPage>
	)
}
