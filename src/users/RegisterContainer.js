import React, { useState } from 'react'
import { IonTextarea, IonRouterOutlet, IonInput, IonItem, IonTabs, IonTabBar, IonLabel, IonTabButton, IonPage, IonApp, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonSegment, IonSegmentButton } from '@ionic/react'

export default function Register(props){
	console.log("props in reg", props);
	const [userInfo, setUserInfo] = useState({
	    username: '',  
	    password: '',
	    email: '',
	    zip_code: '',
	    bio: ''
	})

	const handleChange = async (event) => {
		// console.log("event", event);
		setUserInfo({
		  ...userInfo,
		  [event.target.name]: event.detail.value
		})

		// await console.log("user info from change", userInfo);
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		props.register(userInfo)
		// console.log('user info from submit', userInfo);
	
		setUserInfo({
		  ...userInfo,
		  username: '',
		  password: '',
		  email: '',
		  zip_code: '',
		  bio: ''
		})
	}



	return (
		<IonPage className="LoginPage">
			<IonHeader translucent>
				<IonToolbar>
					<IonTitle> Login </IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<form className="LoginForm" onSubmit={handleSubmit}>
					<IonItem>
						<IonLabel position='stacked'> Email </IonLabel>
						<IonInput
							type='text'
							name='email'
							onIonChange={handleChange}
							value={userInfo.email}
						></IonInput>
					</IonItem>
					<IonItem>
						<IonLabel position='stacked'> Username </IonLabel>
						<IonInput
							type='text'
							name='username'
							onIonChange={handleChange}
							value={userInfo.username}
						></IonInput>
					</IonItem>
					<IonItem>
						<IonLabel position='stacked'> Password </IonLabel>
						<IonInput
							type='password'
							name='password'
							onIonChange={handleChange}
							value={userInfo.password}
						></IonInput>
					</IonItem>
					<IonItem>
						<IonLabel position='stacked'> Zipcode </IonLabel>
						<IonInput
							type='text'
							name='zip_code'
							onIonChange={handleChange}
							value={userInfo.zip_code}
						></IonInput>
					</IonItem>
					<IonItem>
						<IonLabel position='stacked'> Bio </IonLabel>
						<IonTextarea
							type='text'
							name='bio'
							onIonChange={handleChange}
							value={userInfo.bio}
						/>
					</IonItem>
					<IonButton onClick={ handleSubmit }>Create Account</IonButton>
				</form>
			</IonContent>
		</IonPage>
	)
}