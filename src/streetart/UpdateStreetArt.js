import React, { useState } from 'react'
import { IonToast, IonPopover, IonTextarea, IonRouterOutlet, IonInput, IonItem, IonTabs, IonTabBar, IonLabel, IonTabButton, IonPage, IonApp, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonSegment, IonSegmentButton } from '@ionic/react'
import { useHistory } from 'react-router-dom';

export default function UpdateStreetArt(props) {

	const history = useHistory()
	const [toastOpen, setToastOpen] = useState(false)
	const [flashMessage, setFlashMessage] = useState('')
	const [confirmDeleteOpen, changeConfirmDeleteOpen] = useState(false)
	const [updatedArtInfo, setUpdatedArtInfo] = useState({
			name: props.streetArtToUpdate.name,
			location: props.streetArtToUpdate.location,
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

			if(updateStreetArtJson.status === 201) {
				props.routeProps.history.push('/map')
			} else {
				console.log('updateStreetArtJson.message -->', updateStreetArtJson.message);
				console.log('updateStreetArtJson.status -->', updateStreetArtJson.status);
			}

		} catch (error) {
	    	setFlashMessage('Please fill out the required forms!')
	    	setToastOpen(true)
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
		<IonContent>
			{
				props.loggedIn
				?
				<div className='UpdateStreetArtDiv'>
					<div className='UpdateStreetArtDivInfo'>
						<form className="UpdateStreetArtForm">
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

						</form>
						<IonButton 
							fill='outline' 
							size='small'
							color='dark'
							onClick={ handleSubmit }>Update Post</IonButton>
						<IonButton 
								color='danger'
								fill='outline' 
								size='small'
								onClick={() => changeConfirmDeleteOpen(true)}
								>Delete Post</IonButton>
						<IonPopover
								isOpen={confirmDeleteOpen}
								id='confirmDelete'
								// backdropDismiss={false}
								onDidDismiss={ () => changeConfirmDeleteOpen(false) }
							>
							<div className='DeleteConfirmDiv'>
									<IonTitle>
										You sure?
									</IonTitle>
									<div>
										<IonButton 
											color='danger'
											fill='outline' 
											size='small'
											onClick={deleteStreetArt}> DELETE </IonButton>
										<IonButton
											fill='outline' 
											size='small'
											color='dark'
											onClick={() => changeConfirmDeleteOpen(false)}> NVM </IonButton>
									</div>
								</div>
							</IonPopover>
					</div>
					<IonToast 
						isOpen={toastOpen}
						onDidDismiss={ () => {setToastOpen(false)} }
						message={flashMessage}
					/>
				</div>
				:
				<div className="RistrictedAuth">
						<IonTitle>Must be logged in to edit your account.</IonTitle>
						<p><a href='/login'>LOGIN</a> || <a href='/register'>REGISTER</a></p>
				</div>
			}
		</IonContent>
	)

}