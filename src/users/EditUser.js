import React, { useState, useEffect } from 'react'
import {
  IonContent,
  IonPage,
  IonTitle,
  IonHeader,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonButton,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea
} from '@ionic/react';

export default function EditUser(props) {

	const [editUserInfo, setEditUserInfo] = useState({
		username: props.currentUser.username,  
	    password: props.currentUser.username,
	    email: props.currentUser.email,
	    zip_code: props.currentUser.zip_code,
	    bio: props.currentUser.bio
	})

	const [allUsers, setAllUsers] = useState([])


	useEffect(() => {
		getAllUsers()
	}, [])



	const getAllUsers = async () => {
		const url = process.env.REACT_APP_API_URL + '/users/all'

		const getAllUsersResponse = await fetch (url, {
			credentials: 'include',
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})

		console.log('getAllUsersResponse', getAllUsersResponse);

		const getAllUsersJson = await getAllUsersResponse.json()
		console.log('getAllUsersJson', getAllUsersJson);
		console.log('getAllUsersJson.data', getAllUsersJson.data);


		if(getAllUsersJson.status === 200){

			setAllUsers(
				getAllUsersJson.data.forEach((user) => {
					allUsers.push(user)
				})
			)

		} else {
			console.log('getAllUsersJson.status ---- ', getAllUsersJson.status);
			console.log('getAllUsersJson.message ---- ', getAllUsersJson.message);
		}
	}


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
	
		setEditUserInfo({
			  ...editUserInfo,
			username: props.currentUser.username,  
		    password: props.currentUser.username,
		    email: props.currentUser.email,
		    zip_code: props.currentUser.zip_code,
		    bio: props.currentUser.bio
		})
	}



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

			if(editUserJson.status === 201) {
				
				console.log('editUserJson.message --->', editUserJson.message);


			} else {
				console.log('editUserJson.message --->', editUserJson.message);
				console.log('editUserJson.status --->', editUserJson.status);
			}

		} catch (error) {
			console.error('ERROR in EDITUSER')
			console.error(error)
		}

	}

	// update
	const updateUser = async (updateInfo) => {
		
	}
		// find index of current user
		// replace with new info 
		// submit updates


	// destroy -- put inside edit user page
		// delete user and all user posts


	console.log('props in EditUser', props);
	console.log('props.currentUser from EditUser', props.currentUser);
	console.log('loggedin from EditUser', props.loggedIn);
	console.log('editUserInfo', editUserInfo);
	// const url = process.env.REACT_APP_API_URL + '/users/' + props.currentUser.id

	return (
		<IonPage>
			{
					props.loggedIn
					?
					<IonPage className="editPage">
						<IonHeader translucent>
							<IonToolbar>
								<IonTitle> edit </IonTitle>
							</IonToolbar>
						</IonHeader>
						<IonContent>
							<form className="editForm" onSubmit={handleSubmit}>
								<IonItem>
									<IonLabel position='stacked'> Email </IonLabel>
									<IonInput
										type='text'
										name='email'
										onIonChange={handleChange}
										value={editUserInfo.email}
									></IonInput>
								</IonItem>
								<IonItem>
									<IonLabel position='stacked'> Username </IonLabel>
									<IonInput
										type='text'
										name='username'
										onIonChange={handleChange}
										value={editUserInfo.username}
									></IonInput>
								</IonItem>
								<IonItem>
									<IonLabel position='stacked'> Password </IonLabel>
									<IonInput
										type='password'
										name='password'
										onIonChange={handleChange}
										value={editUserInfo.password}
									></IonInput>
								</IonItem>
								<IonItem>
									<IonLabel position='stacked'> Zipcode </IonLabel>
									<IonInput
										type='text'
										name='zip_code'
										onIonChange={handleChange}
										value={editUserInfo.zip_code}
									></IonInput>
								</IonItem>
								<IonItem>
									<IonLabel position='stacked'> Bio </IonLabel>
									<IonTextarea
										type='text'
										name='bio'
										onIonChange={handleChange}
										value={editUserInfo.bio}
									/>
								</IonItem>
								<IonButton onClick={ handleSubmit }>Create Account</IonButton>
							</form>
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