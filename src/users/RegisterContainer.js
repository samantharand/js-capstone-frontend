import React, { useState } from 'react'
import { 
	IonTextarea, 
	IonRouterOutlet, 
	IonInput, 
	IonItem, 
	IonTabs, 
	IonTabBar, 
	IonLabel, 
	onTabButton, 
	IonPage, 
	IonApp, 
	IonHeader, 
	IonToolbar, 
	IonTitle, 
	IonContent, 
	IonButton, 
	IonSegment, 
	IonSegmentButton,
	IonToast
} from '@ionic/react'

export default function Register(props){
	console.log("props in reg", props);
	const [toastOpen, setToastOpen] = useState(false)
	const [userInfo, setUserInfo] = useState({
	    username: '',  
	    password: '',
	    email: '',
	    zip_code: '',
	    bio: ''
	})
	const [flashMessage, setFlashMessage] = useState('')

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
		register(userInfo)
		// console.log('user info from submit', userInfo);


	}

	const register = async (registerInfo) => {
	    const url = process.env.REACT_APP_API_URL + '/users/register'
	    console.log(url);
	    try {

	      const registerResponse = await fetch(url, {
	        credentials: 'include',
	        method: 'POST',
	        body: JSON.stringify(registerInfo),
	        headers: {
	          'Content-Type': 'application/json'
	        }
	      })

	      const registerJson = await registerResponse.json()

	      if(registerJson.status === 201) {

	        props.setLoggedIn(true)
	        props.setCurrentUser(registerJson.data)
	        props.routeProps.history.push('/')

	      } else {

	        console.log("registerJson.message --> ", registerJson.message);
	        console.log("registerJson.status --> ", registerJson.status);
	        setFlashMessage(registerJson.message)
	        setToastOpen(true)
	      }
	      
	    } catch (error) {
	      console.error("ERROR in REGISTER")
	      console.error(error)
	    }
	  }

	return (
		<IonPage className="RegisterPage">
			<IonHeader translucent>
				<IonToolbar>
					<IonTitle> Register </IonTitle>
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
				<IonToast 
					isOpen={toastOpen}
					onDidDismiss={ () => {setToastOpen(false)} }
					message={flashMessage}
				/>
			</IonContent>
		</IonPage>
	)
}