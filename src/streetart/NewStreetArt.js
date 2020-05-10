import React, { useState } from 'react'
import { IonRouterOutlet, IonInput, IonItem, IonTabs, IonTabBar, IonLabel, IonTabButton, IonPage, IonApp, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonSegment, IonSegmentButton } from '@ionic/react'

export default function NewStreetArt(props) {
	const [newArtInfo, setNewArtInfo] = useState({
			name: '',
			location: '',
			year: '',
			artist: '',
			description: ''
		})

	const addArt = async (artInfo) => {
		const url = process.env.REACT_APP_API_URL + '/streetart/add'

		const addArtResponse = await fetch(url, {
			credentials: 'include',
			method: 'POST',
			body: JSON.stringify(artInfo),
			headers: {
				'Content-Type': 'application/json'
			}
		})

		const addArtJson = await addArtResponse.json()

		if(addArtJson.status === 201) {
			console.log("addArtJson.message --> ", addArtJson.message);
		} else {
			console.log("addArtJson.message --> ", addArtJson.message);
        	console.log("addArtJson.status --> ", addArtJson.status);
		}
	}
	
	const handleChange = async (event) => {
		console.log("event", event);
		setNewArtInfo({
		  ...newArtInfo,
		  [event.target.name]: event.detail.value
		})

		// await console.log("art info from change", newArtInfo);
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		addArt(newArtInfo)
		console.log('art info from submit', newArtInfo);
	
		setNewArtInfo({
		  ...newArtInfo,
			name: '',
			location: '',
			year: '',
			artist: '',
			description: ''
		})
		props.routeProps.history.push('/map')
	}

	return (
		<IonPage className="NewArtPage">
			<IonHeader translucent>
				<IonToolbar>
					<IonTitle> Add StreetArt </IonTitle>
				</IonToolbar>
			</IonHeader>
			{
				props.loggedIn
				?
				<IonContent>
					<form className="New">
						<IonItem>
							<IonLabel position='stacked'> Name </IonLabel>
							<IonInput
								type='text'
								name='name'
								value={newArtInfo.name}
								onIonChange={handleChange}
							/>
						</IonItem>
						<IonItem>
							<IonLabel position='stacked'> Location </IonLabel>
							<IonInput
								type='text'
								name='location'
								value={newArtInfo.location}
								onIonChange={handleChange}
							/>
						</IonItem>
						<IonItem>
							<IonLabel position='stacked'> Year </IonLabel>
							<IonInput
								type='number'
								name='year'
								value={newArtInfo.year}
								onIonChange={handleChange}
							/>
						</IonItem>
						<IonItem>
							<IonLabel position='stacked'> Artist </IonLabel>
							<IonInput
								type='text'
								name='artist'
								value={newArtInfo.artist}
								onIonChange={handleChange}
							/>
						</IonItem>
						<IonItem>
							<IonLabel position='stacked'> Description </IonLabel>
							<IonInput
								type='text'
								name='description'
								value={newArtInfo.description}
								onIonChange={handleChange}
							/>
						</IonItem>

						<IonButton onClick={ handleSubmit }>Add Art</IonButton>
					</form>
				</IonContent>
				:
				<IonContent>
					<IonTitle> Must be logged in to add artwork </IonTitle>
				</IonContent>

			}
		</IonPage>
	)
}
