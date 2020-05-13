import React, { useState } from 'react'
import { IonTextarea, IonRouterOutlet, IonInput, IonItem, IonTabs, IonTabBar, IonLabel, IonTabButton, IonPage, IonApp, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonSegment, IonSegmentButton } from '@ionic/react'
import { useHistory } from 'react-router-dom';

export default function UpdateStreetArt(props) {

	const history = useHistory()
	console.log('props in updateStreetArt', props);
	const [updatedArtInfo, setUpdatedArtInfo] = useState({
			name: props.streetArtToUpdate.name,
			// location: props.streetArtToUpdate.location,
			year: props.streetArtToUpdate.year,
			image: props.streetArtToUpdate.image,
			artist: props.streetArtToUpdate.artist,
			description: props.streetArtToUpdate.description
		})

	// deal with file upload and cloudinary
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

	    setUpdatedArtInfo({
	    	...updatedArtInfo,
	    	image: file.secure_url
	    })

	}
	
	const handleChange = async (event) => {
		// console.log("event", event);
		setUpdatedArtInfo({
		  ...updatedArtInfo,
		  [event.target.name]: event.detail.value
		})

		// await console.log("art info from change", updatedArtInfo);
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		updateStreetArt(updatedArtInfo)
		// console.log('art info from submit', updatedArtInfo);
	
		// setUpdatedArtInfo({
		//   ...updatedArtInfo,
		// 	name: '',
		// 	location: '',
		// 	year: '',
		// 	image: '',
		// 	artist: '',
		// 	description: ''
		// })
	}


	//update 
	const updateStreetArt = async (infoToUpdate) => {
		const url = process.env.REACT_APP_API_URL + '/streetart/' + props.streetArtToUpdate.id
		console.log(url);
		try {
			
			const updateStreetArtResponse = await fetch(url, {
				credentials: 'include',
				method: 'PUT',
				body: JSON.stringify(infoToUpdate),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const updateStreetArtJson = await updateStreetArtResponse.json()

			console.log({
				infoToUpdate,
				updateStreetArtResponse,
				updateStreetArtJson
			});

			if(updateStreetArtJson.status === 200) {
				console.log('updated!');
			} else {
				console.log('updateStreetArtJson.message -->', updateStreetArtJson.message);
				console.log('updateStreetArtJson.status -->', updateStreetArtJson.status);
			}

		} catch (error) {
			console.error('ERROR in UPDATESTREETART')
			console.error(error)
		}
	}
	// delete 

	return (
		<IonPage className="UpdateArtPage">
			<IonHeader translucent>
				<IonToolbar>
					<IonTitle> Update Your Post </IonTitle>
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
								value={updatedArtInfo.name}
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
								value={updatedArtInfo.year}
								onIonChange={handleChange}
							/>
						</IonItem>
						<IonItem>
							<IonLabel position='stacked'> Artist </IonLabel>
							<IonInput
								type='text'
								name='artist'
								value={updatedArtInfo.artist}
								onIonChange={handleChange}
							/>
						</IonItem>
						<IonItem>
							<IonLabel position='stacked'> Description </IonLabel>
							<IonTextarea
								type='text'
								name='description'
								onIonChange={handleChange}
								value={updatedArtInfo.description}
							/>
						</IonItem>

						<IonButton onClick={ handleSubmit }>Update Post</IonButton>
					</form>
				</IonContent>
				:
				<IonContent>
					<IonTitle> Must be logged in to update artwork </IonTitle>
				</IonContent>

			}
		</IonPage>
	)

}