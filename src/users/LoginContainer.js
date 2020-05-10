import React, { useState } from 'react'
import { IonRouterOutlet, IonInput, IonItem, IonTabs, IonTabBar, IonLabel, IonTabButton, IonPage, IonApp, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonSegment, IonSegmentButton } from '@ionic/react'

export default function LoginContainer(props) {
	console.log("props in login container", props);

	const [userInfo, setUserInfo] = useState({
	    username: '',  
	    password: ''
	  })

	const handleChange = async (event) => {
		console.log("event", event);
		setUserInfo({
		  ...userInfo,
		  [event.target.name]: event.detail.value
		})

		await console.log("user info from change",userInfo);
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		props.login(userInfo)
		console.log('user info from submit', userInfo);
	
		setUserInfo({
		  ...userInfo,
		  username: '',
		  password: ''
		})
		props.routeProps.history.push('/')
	}
	
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
							value={userInfo.username}
							onIonChange={handleChange}
						/>
					</IonItem>
					<IonItem>
						<IonLabel position='stacked'> Password </IonLabel>
						<IonInput
							type='password'
							name='password'
							value={userInfo.password}
							onIonChange={handleChange}
						/>
					</IonItem>
					<IonButton onClick={ handleSubmit }>Login</IonButton>
				</form>
			</IonContent>
		</IonPage>
	)
}
