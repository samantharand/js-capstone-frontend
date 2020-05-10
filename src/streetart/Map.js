import React, { useState, useEffect } from 'react'
import { IonPage, IonTitle, IonList, IonItem } from '@ionic/react'

export default function Map(props) {

	const [allStreetArt, setAllStreetArt] = useState('')

	useEffect(() => {
		getAllStreetArt()
		console.log('allStreetArt.length in useEffect', allStreetArt.length);
		console.log('listStreetArt',listStreetArt());
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

	const listStreetArt = () => {
		console.log('allStreetArt.length from listStreetArt before if', allStreetArt.length);
		if(allStreetArt.length > 0) {
			console.log('allStreetArt.length from inside if statement',allStreetArt.length);
			console.log('allStreetArt from inside if statement',allStreetArt);	
			allStreetArt.map((art, i) => {
				return (
					<IonItem key={i}> {allStreetArt[i].name} </IonItem>
				)
			})
		}
	}

	return (
		<IonPage className="MapPage">
			<IonList>
				<IonItem> hi </IonItem>
				{ listStreetArt() }
			</IonList>	
			<IonTitle> map :) </IonTitle>
		</IonPage>
	)
}
