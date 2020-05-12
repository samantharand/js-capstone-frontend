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
  IonTextarea,
  IonModal
} from '@ionic/react';

import { useHistory } from 'react-router-dom';

export default function UpdateUser(props) {
	const history = useHistory()

	const [updateUserInfo, setUpdateUserInfo] = useState({
	    zip_code: props.currentUser.zip_code,
	    bio: props.currentUser.bio
	})

	const [allUsers, setAllUsers] = useState([])

	const [confirmDeleteOpen, changeConfirmDeleteOpen] = useState(false)

	useEffect(() => {
		// getAllUsers()
		console.log('all users in USE EFFECT', allUsers);
	}, [])


	const handleChange = (event) => {
		// console.log("event", event);
		setUpdateUserInfo({
		  ...updateUserInfo,
		  [event.target.name]: event.detail.value
		})

		// await console.log("user info from change", userInfo);
	}


	const handleSubmit =  (event) => {

			event.preventDefault()

			setUpdateUserInfo({
				  ...updateUserInfo,
			    zip_code: props.currentUser.zip_code,
			    bio: props.currentUser.bio
			})

			updateUser(updateUserInfo)
			// getAllUsers()
			console.log('ALL USERS in HANDLE SUBMIT', allUsers);
			

	}



	const updateUser = async (editInfo) => {
		console.log('EDIT USER CALLED');
		console.log('all users in updateUser', allUsers);
		try {
			const url = process.env.REACT_APP_API_URL + '/users/' + props.currentUser.id
			
			const updateUserResponse = await fetch(url, {
				credentials: 'include',
				method: 'PUT',
				body: JSON.stringify(editInfo),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			console.log('updateUserResponse', updateUserResponse);

			const updateUserJson = await updateUserResponse.json()
			console.log('updateUserJson', updateUserJson);

			if(updateUserJson.status === 201) {
				
				console.log('updateUserJson.message --->', updateUserJson.message);
				props.setCurrentUser(updateUserJson.data)
				history.push('/myaccount')



			} else {
				console.log('updateUserJson.message --->', updateUserJson.message);
				console.log('updateUserJson.status --->', updateUserJson.status);
			}

		} catch (error) {
			console.error('ERROR in updateUSER')
			console.error(error)
		}

	}

	// destroy -- put inside edit user page
	const deleteUser = () => {
		console.log('delete user!!!');
		// delete user and all user posts
	}

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
									value={updateUserInfo.zip_code}
								></IonInput>
							</IonItem>
							<IonItem>
								<IonLabel position='stacked'> Bio </IonLabel>
								<IonTextarea
									type='text'
									name='bio'
									onIonChange={handleChange}
									value={updateUserInfo.bio}
								/>
							</IonItem>
							<IonButton onClick={ handleSubmit }>Update Account</IonButton>
						</form>
						<IonButton 
							color="danger"
							onClick={() => changeConfirmDeleteOpen(true)}
							>Delete Account</IonButton>
						<IonModal isOpen={confirmDeleteOpen}>
							<IonContent>
								<IonTitle>
									Are you sure you want to delete your account?
								</IonTitle>
								<IonButton 
									color='danger'
									onClick={deleteUser}> DELETE </IonButton>
								<IonButton
									onClick={() => changeConfirmDeleteOpen(false)}> NVM </IonButton>
							</IonContent>
						</IonModal>
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