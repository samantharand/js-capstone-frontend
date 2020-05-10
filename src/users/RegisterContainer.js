import React from 'react'
import { IonRouterOutlet, IonInput, IonItem, IonTabs, IonTabBar, IonLabel, IonTabButton, IonPage, IonApp, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonSegment, IonSegmentButton } from '@ionic/react'

export default function Register(){
	return (
		<IonPage className="LoginPage">
			<IonHeader translucent>
				<IonToolbar>
					<IonTitle> Login </IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<form className="LoginForm">
					<IonItem>
						<IonLabel position='stacked'> Email </IonLabel>
						<IonInput
							type='text'
							name='email'
						></IonInput>
					</IonItem>
					<IonItem>
						<IonLabel position='stacked'> Username </IonLabel>
						<IonInput
							type='text'
							name='username'
						></IonInput>
					</IonItem>
					<IonItem>
						<IonLabel position='stacked'> Password </IonLabel>
						<IonInput
							type='password'
							name='password'
						></IonInput>
					</IonItem>
					<IonItem>
						<IonLabel position='stacked'> Zipcode </IonLabel>
						<IonInput
							type='text'
							name='zip_code'
						></IonInput>
					</IonItem>
					<IonButton>Create Account</IonButton>
				</form>
			</IonContent>
		</IonPage>
	)
}