import React, { useState } from 'react'
import { IonPopover, IonTextarea, IonRouterOutlet, IonInput, IonItem, IonTabs, IonTabBar, IonLabel, IonTabButton, IonPage, IonApp, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonSegment, IonSegmentButton } from '@ionic/react'
import { useHistory } from 'react-router-dom';

export default function UpdateStreetArt(props) {

	const history = useHistory()
	console.log('props in updateStreetArt', props);
	const [confirmDeleteOpen, changeConfirmDeleteOpen] = useState(false)
	const [updatedArtInfo, setUpdatedArtInfo] = useState({
			name: props.streetArtToUpdate.name,
			location: props.streetArtToUpdate.location,
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

	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		updateStreetArt(updatedArtInfo)
	}


	//update 
	const updateStreetArt = async (infoToUpdate) => {
		const url = process.env.REACT_APP_API_URL + '/streetart/' + props.streetArtToUpdate.id
		// console.log(url);
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

			// console.log({
			// 	infoToUpdate,
			// 	updateStreetArtResponse,
			// 	updateStreetArtJson
			// });

			if(updateStreetArtJson.status === 201) {
				console.log('updated!');
				props.routeProps.history.push('/map')
			} else {
				console.log('updateStreetArtJson.message -->', updateStreetArtJson.message);
				console.log('updateStreetArtJson.status -->', updateStreetArtJson.status);
			}

		} catch (error) {
			console.error('ERROR in UPDATESTREETART')
			console.error(error)
		}
	}


	// destroy
	const deleteStreetArt = async () => {
		const url = process.env.REACT_APP_API_URL + '/streetart/' + props.streetArtToUpdate.id
		console.log(url);
		console.log('deleteStreetArt');
		try {
				
			const deleteStreetArtResponse = await fetch(url, {
				credentials: 'include',
				method: 'DELETE'
			})

			const deleteStreetArtJson = await deleteStreetArtResponse.json()

			if(deleteStreetArtJson.status === 200) {
				console.log('deleteStreetArtJson.message -->', deleteStreetArtJson.message);
				props.routeProps.history.push('/map')
			} else {
				console.log(deleteStreetArtJson.message, deleteStreetArtJson.status);
			}


		} catch (error) {
			console.error(error)
		}
	}

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
							<IonLabel position='stacked'> Location </IonLabel>
							<IonInput
								type='text'
								name='location'
								value={updatedArtInfo.location}
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
					<IonButton 
							color="danger"
							onClick={() => changeConfirmDeleteOpen(true)}
							>Delete Post</IonButton>
					<IonPopover
							isOpen={confirmDeleteOpen}
							id='confirmDelete'
							backdropDismiss={false}
						>
							<IonContent>
									<IonTitle>
										You sure?
									</IonTitle>
									<IonButton 
										color='danger'
										onClick={deleteStreetArt}> DELETE </IonButton>
									<IonButton
										onClick={() => changeConfirmDeleteOpen(false)}> NVM </IonButton>
							</IonContent>
						</IonPopover>
				</IonContent>
				:
				<div className="RistrictedAuthContent">
					<IonTitle> Must be logged in to access account details </IonTitle>
					<IonContent> <a href='/login'>LOGIN</a> || <a href='/register'>REGISTER</a> </IonContent>
				</div>

			}
		</IonPage>
	)

}