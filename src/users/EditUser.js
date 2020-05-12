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

import { useHistory } from 'react-router-dom';

export default function EditUser(props) {
	const history = useHistory()

	const [editUserInfo, setEditUserInfo] = useState({
	    zip_code: props.currentUser.zip_code,
	    bio: props.currentUser.bio
	})

	const [allUsers, setAllUsers] = useState([])


	useEffect(() => {
		// getAllUsers()
		console.log('all users in USE EFFECT', allUsers);
	}, [])



	// const getAllUsers = async () => {
	// 	try {

	// 		const url = process.env.REACT_APP_API_URL + '/users/all'

	// 		const getAllUsersResponse = await fetch (url, {
	// 			credentials: 'include',
	// 			method: 'GET',
	// 			headers: {
	// 				'Content-Type': 'application/json'
	// 			}
	// 		})

	// 		// console.log('getAllUsersResponse', getAllUsersResponse);

	// 		const getAllUsersJson = await getAllUsersResponse.json()
	// 		// console.log('getAllUsersJson', getAllUsersJson);
	// 		// console.log('getAllUsersJson.data', getAllUsersJson.data);


	// 		if(getAllUsersJson.status === 200){
	// 			console.log('get all users called !!!');

	// 			setAllUsers(
	// 				getAllUsersJson.data.forEach((user) => {
	// 					allUsers.push(user)
	// 				})
	// 			)

	// 			console.log('allUsers in getAllUsers', allUsers);

	// 		} else {
	// 			console.log('getAllUsersJson.status ---- ', getAllUsersJson.status);
	// 			console.log('getAllUsersJson.message ---- ', getAllUsersJson.message);
	// 		}
			
	// 	} catch (error) {
			
	// 		console.error(error)
	// 	}
	// }


	const handleChange = (event) => {
		// console.log("event", event);
		setEditUserInfo({
		  ...editUserInfo,
		  [event.target.name]: event.detail.value
		})

		// await console.log("user info from change", userInfo);
	}


	const handleSubmit =  (event) => {

			event.preventDefault()

			setEditUserInfo({
				  ...editUserInfo,
			    zip_code: props.currentUser.zip_code,
			    bio: props.currentUser.bio
			})

			editUser(editUserInfo)
			// getAllUsers()
			console.log('ALL USERS in HANDLE SUBMIT', allUsers);
			

	}



	const editUser = async (editInfo) => {
		console.log('EDIT USER CALLED');
		console.log('all users in EditUser', allUsers);
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
				props.setCurrentUser(editUserJson.data)
				history.push('/')



			} else {
				console.log('editUserJson.message --->', editUserJson.message);
				console.log('editUserJson.status --->', editUserJson.status);
			}

		} catch (error) {
			console.error('ERROR in EDITUSER')
			console.error(error)
		}

	}



	// destroy -- put inside edit user page
		// delete user and all user posts


	// console.log('props in EditUser', props);
	// console.log('props.currentUser from EditUser', props.currentUser);
	// console.log('loggedin from EditUser', props.loggedIn);
	// console.log('editUserInfo', editUserInfo);
	// // const url = process.env.REACT_APP_API_URL + '/users/' + props.currentUser.id

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
								<IonButton onClick={ handleSubmit }>Edit Account</IonButton>
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