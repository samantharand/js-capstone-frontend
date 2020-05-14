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
import '../index.css'

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
				<IonCard class='card' key={post.id}> 
					<img src={post.image}/>
					location: {post.name} 
					name: {post.name} 
					artist: {post.artist}
					description: {post.location}
					year: {post.year}
				</IonCard>
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

						<div id='UserPostsGrid'>
							{userPosts}
						</div>


					</IonContent>
				</IonPage>
				:
				<div className="RistrictedAuthContent">
					<IonTitle> Must be logged in to access account details </IonTitle>
					<IonContent> <a href='/login'>LOGIN</a> || <a href='/register'>REGISTER</a> </IonContent>
				</div>

		}
		</IonPage>
	)
}