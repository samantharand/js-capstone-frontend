import React, { useState, useEffect } from 'react'
import { IonPage, IonTitle, IonList, IonItem } from '@ionic/react'

export default function Map(props) {

	const [allStreetArt, setAllStreetArt] = useState('')
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
		listStreetArt = allStreetArt.map((art, i) => {
					return (
						<IonItem key={i}> {allStreetArt[i].name}, {allStreetArt[i].artist} </IonItem>
					)
		})
	}



	return (
		<IonPage className="MapPage">
		<IonTitle> map :) </IonTitle>
		{
			allStreetArt.length > 0
			&&
			<IonList>
				<IonItem> hi </IonItem>
				{ listStreetArt }
			</IonList>	
		}
		</IonPage>
	)
}
