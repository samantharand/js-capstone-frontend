import React, { useState } from 'react'
import {
  IonContent,
  IonPage,
  IonTitle,
  IonHeader,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonButton
} from '@ionic/react';

export default function EditUser(props) {

	const [editUserInfo, setEditUserInfo] = useState({
		username: props.currentUser.username,  
	    password: props.currentUser.username,
	    email: props.currentUser.email,
	    zip_code: props.currentUser.zip_code,
	    bio: props.currentUser.bio
	})

	const handleChange = async (event) => {
		// console.log("event", event);
		setEditUserInfo({
		  ...editUserInfo,
		  [event.target.name]: event.detail.value
		})

		// await console.log("user info from change", userInfo);
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		props.editUser(editUserInfo)
		// console.log('user info from submit', userInfo);
	
		setEditUserInfo({
		  ...editUserInfo,
		username: props.currentUser.username,  
	    password: props.currentUser.username,
	    email: props.currentUser.email,
	    zip_code: props.currentUser.zip_code,
	    bio: props.currentUser.bio
	})
	}

	console.log('props in EditUser', props);
	console.log('props.currentUser from EditUser', props.currentUser);
	console.log('loggedin from EditUser', props.loggedIn);
	console.log('editUserInfo', editUserInfo);
	// const url = process.env.REACT_APP_API_URL + '/users/' + props.currentUser.id

	// console.log(url);
	// edit -- remeber to add a lil button that triggers this page 

	const editUser = async (editInfo) => {
		console.log('EDIT USER CALLED');
		try {
			const url = process.env.REACT_APP_API_URL + '/users/' + props.currentUser.id
			
			const editUserResponse = await fetch(url, {
				credentials: 'include',
				method: 'PUT',
				body: JSON.stringify(editInfo),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			console.log('editUserResponse', editUserResponse);

			const editUserJson = await editUserResponse.json()
			console.log('editUserJson', editUserJson);



		} catch (error) {
			console.error('ERROR in EDITUSER')
			console.error(error)
		}
	}

	// update
		// submit updates

	// destroy -- put inside edit user page
		// delete user and all user posts


	return (
		<IonPage>
			{
					props.loggedIn
					?
					<IonPage>
						<IonContent>
							<IonButton 
								onClick={ () => editUser(editUserInfo) } 
							> Edit Your Account </IonButton>
						</IonContent>
					</IonPage>
					:
					<IonContent>
						<IonTitle> Must be logged in to access account details </IonTitle>
					</IonContent>

			}
		</IonPage>
	)
}