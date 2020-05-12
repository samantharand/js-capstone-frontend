import React, { useState } from 'react'
import { IonRouterOutlet, IonInput, IonItem, IonTabs, IonTabBar, IonLabel, IonTabButton, IonPage, IonApp, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonSegment, IonSegmentButton } from '@ionic/react'

export default function NewStreetArt(props) {
	const [newArtInfo, setNewArtInfo] = useState({
			name: '',
			location: '',
			year: '',
			image: '',
			artist: '',
			description: ''
		})

	const addArt = async (artInfo) => {
		const url = process.env.REACT_APP_API_URL + '/streetart/add'
		// console.log('newArtInfo.location.split("").join(+)', newArtInfo.location.split(' ').join('+'));
		// const geocodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + newArtInfo.location.split(' ').join('+') + '&key=AIzaSyB7G8yZAkGYtf2QQzkS1n0E1gZtpPF_h8w'
		// console.log(geocodeUrl);

		// const geocodeResponse = await fetch(geocodeUrl, {
		// 	method: 'GET'
		// })
		// const geocodeJson = await geocodeResponse.json()
		// console.log(geocodeJson);
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
			props.routeProps.history.push('/map')
		} else {
			console.log("addArtJson.message --> ", addArtJson.message);
        	console.log("addArtJson.status --> ", addArtJson.status);
		}
	}

	const handleSelectedFile = async (event) => {

		const files = event.target.files[0]
	    const data = new FormData()
	    const url = 'https://api.cloudinary.com/v1_1/samantharand/image/upload'
	    
	    data.append('file', files)
	    data.append('upload_preset', 'streetartmap')

	    console.log({
	    	event,
	    	files,
	    	url,
	    });

	    const uploadImageResponse = await fetch(url, {
	      method: 'POST',
	      body: data
	    })

	    const file = await uploadImageResponse.json()

	    setNewArtInfo({
	    	...newArtInfo,
	    	image: file.secure_url
	    })

	}
	
	const handleChange = async (event) => {
		// console.log("event", event);
		setNewArtInfo({
		  ...newArtInfo,
		  [event.target.name]: event.detail.value
		})

		// await console.log("art info from change", newArtInfo);
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		addArt(newArtInfo)
		// console.log('art info from submit', newArtInfo);
	
		setNewArtInfo({
		  ...newArtInfo,
			name: '',
			location: '',
			year: '',
			image: '',
			artist: '',
			description: ''
		})
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
							<IonLabel position='stacked'> Image </IonLabel>
							<input 
								type='file'
								name='image'
								onChange={handleSelectedFile}
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
