import React, { useState, useEffect } from 'react'
import { IonContent, IonPage, IonTitle, IonList, IonItem, IonImg, IonHeader } from '@ionic/react'
import GoogleApiWrapper from './GoogleMap'
import '../index.css'

export default function MapContainer(props) {

	const [allStreetArt, setAllStreetArt] = useState([])
	const [loading, setLoading] = useState(true)
	const [idOfMockInfoWindowToShow, setIdOfMockInfoWindowToShow] = useState('')

	let listStreetArt;

	useEffect(() => {
		getAllStreetArt()
		// console.log("USE EFFECT IS GETTING CALLED FROM MAP.js RIGHT NOOOOW");
		// findBrowserLocation()
		// console.log('idOfMockInfoWindowToShow {{{{ ', idOfMockInfoWindowToShow, " }}}}");
		// console.log('allStreetArt.length in useEffect', allStreetArt.length);
	}, [loading, idOfMockInfoWindowToShow])

	 useEffect(() => {
	    return () => {
	      console.log("cleaned up");
	    };
	  }, []);

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
		<IonContent>
			
					{
						loading === true
						?
						<div>nooo</div>
						:
						<div className="mapContainer">
							{	
								allStreetArt.length > 0
								&&
				         		<GoogleApiWrapper 
				         			allStreetArt={allStreetArt} 
				         			currentUser={props.currentUser}
				         			loading={loading} 
				         			currentLoc={props.currentLoc}
				         			idOfMockInfoWindowToShow={idOfMockInfoWindowToShow}
				         			setIdOfMockInfoWindowToShow={setIdOfMockInfoWindowToShow}
				         			setStreetArtToUpdate={props.setStreetArtToUpdate}
				         		/>
							}
			        	</div>	 
					}
		
		</IonContent>
	)
}
