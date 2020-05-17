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
	console.log('props.postsByCurrentUser', props.postsByCurrentUser);
	console.log('props.postsByCurrentUser.length', props.postsByCurrentUser.length);
	
	useEffect(() => {
        props.getPostsByCurrentUser()
	}, [])
	

	let userPosts;
	if(props.postsByCurrentUser) {

		userPosts = props.postsByCurrentUser.map((post) => {
			return (
				<div className='SinglePost' key={post.id}>
						<img src={post.image}/>
						<p> <strong>Name: </strong>{post.name} </p>
						<p> <strong>Location: </strong>{post.name} </p>
						<p> <strong>Artist: </strong>{post.artist}</p>
						<p> <strong>About this Piece: </strong>{post.location} </p>
				</div>
			)
		})
	}





	return (
		<IonContent>
		{
				props.loggedIn
				?
				<div className='UsersAccountPage'>
					<div className='UsersAccountDiv'>
						<div className='UsersAccountDivInfo'>
							<IonTitle> Your Account </IonTitle>
								<h3> {props.currentUser.username.toUpperCase()} </h3>
								<p>	<strong>Zipcode:</strong> {props.currentUser.zip_code} </p>
								<p>	<strong>About:</strong> {props.currentUser.bio} </p>
						</div>
					</div>

					<div className='UsersPostsDiv'>
						{
							props.postsByCurrentUser.length !== 0
							?
							<React.Fragment>
								{userPosts}
							</React.Fragment>
							:
							<React.Fragment>
								<h4> No Posts Yet :( </h4>
								<p> Why not <span onClick={() => props.routeProps.history.push('/newstreetart')} className='FakeLink'>add one?</span> </p>
							</React.Fragment>
						}
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