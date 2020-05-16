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
		<IonContent>
		{
				props.loggedIn
				?
				<div className='UserAccountDiv'>
						<div className='UsersAccountDivInfo'>
							<IonTitle> Your Account </IonTitle>
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
					</div>
				</div>	
				:
				<div className="RistrictedAuth">
						<IonTitle>Must be logged in to access account details.</IonTitle>
						<p><a href='/login'>LOGIN</a> || <a href='/register'>REGISTER</a></p>
				</div>

		}
		</IonContent>
	)
}