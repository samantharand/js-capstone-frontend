import React, { useState } from 'react'
import { IonPage, IonTitle, IonButton } from '@ionic/react'

export default function Map(props) {

	const [allStreetArt, setAllStreetArt] = useState([])

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

	return (
		<IonPage className="MapPage">
			<IonTitle> map :) </IonTitle>
			<IonButton onClick={getAllStreetArt}> click to get art </IonButton>
		</IonPage>
	)
}
