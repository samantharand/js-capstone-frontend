import React, { useState, useEffect } from 'react'
import {
  IonContent,
  IonPage,
  IonTitle,
  IonHeader,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle
} from '@ionic/react';

export default function UsersAccount(props) {
	console.log('props in UsersAccount', props);
	console.log('props.currentUser from UsersAccount', props.currentUser);
	console.log('loggedin from UsersAccount', props.loggedIn);
	
	useEffect(() => {
        props.getPostsByCurrentUser()
	}, [])
	

	let userPosts;
	if(props.postsByCurrentUser) {

		userPosts = props.postsByCurrentUser.map((post) => {
			return (
				<li key={post.id}> {post.name} </li>
			)
		})

	}

	return (
		<IonPage>
		{
				props.loggedIn
				?
				<IonPage>
					<IonTitle> Your Account </IonTitle>
					<IonContent>
						<IonCard>
							<IonCardTitle>
								{props.currentUser.username}
							</IonCardTitle>
							<IonCardSubtitle>
								{props.currentUser.zip_code}
							</IonCardSubtitle>
						</IonCard>
						<ul>
							{userPosts}
						</ul>
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