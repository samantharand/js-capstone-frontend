import React, { useState } from 'react'
import { IonRouterOutlet, IonInput, IonItem, IonTabs, IonTabBar, IonLabel, IonTabButton, IonPage, IonApp, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonSegment, IonSegmentButton } from '@ionic/react'

export default function LoginContainer(props) {
	console.log("props in login", props);
	const [userInfo, setUserInfo] = useState({
	    username: '',  
	    password: ''
	  })
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
					<IonButton onClick={ () => props.login(userInfo) }>Login</IonButton>
				</form>
			</IonContent>
		</IonPage>
	)
}
