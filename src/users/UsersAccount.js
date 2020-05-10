import React, { useState } from 'react'
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
					</IonContent>
				</IonPage>
				:
				<IonContent>
					<IonTitle> Must be Logged iN </IonTitle>
				</IonContent>

		}
		</IonPage>
	)
}