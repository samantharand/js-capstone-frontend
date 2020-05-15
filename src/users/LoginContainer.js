import React, { useState } from 'react'
import { 
	IonRouterOutlet, 
	IonInput, 
	IonItem, 
	IonTabs, 
	IonTabBar, 
	IonLabel, 
	IonTabButton, 
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

export default function LoginContainer(props) {
	// console.log("props in login container", props);
	const [toastOpen, setToastOpen] = useState(false)
	const [userInfo, setUserInfo] = useState({
	    username: '',  
	    password: ''
	  })
	const [flashMessage, setFlashMessage] = useState('')

	const handleChange = async (event) => {
		// console.log("event", event);
		setUserInfo({
		  ...userInfo,
		  [event.target.name]: event.detail.value
		})

		// await console.log("user info from change",userInfo);
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		login(userInfo)
	}

	const login = async (loginInfo) => {
	    const url = process.env.REACT_APP_API_URL + '/users/login'
	    console.log(url)
	    try {

	      const loginResponse = await fetch(url, {
	        credentials: 'include',
	        method: 'POST',
	        body: JSON.stringify(loginInfo),
	        headers: {
	          'Content-Type': 'application/json'
	        }
	      })

	      const loginJson = await loginResponse.json()

	      if(loginJson.status === 201) {
	        props.setLoggedIn(true)
	        props.setCurrentUser(loginJson.data)
	        props.routeProps.history.push('/')	
	      } else {
	        console.log("loginJson.message --> ", loginJson.message);
	        console.log("loginJson.status --> ", loginJson.status);
	        setFlashMessage(loginJson.message)
	        setToastOpen(true)
	      }


	    } catch (error) {
	      console.error("ERROR in LOGIN")
	      console.error(error)
	    }
	  }
	
	return (
			<IonContent style={{width: '300px'}}>
				<IonTitle> Login </IonTitle>
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
					<IonButton 
						fill='outline' 
						size='small'
						color='dark'
						onClick={ handleSubmit }
						style={{width: '100px'}}>Login</IonButton>
				</form>
				<IonToast 
					isOpen={toastOpen}
					onDidDismiss={ () => {setToastOpen(false)} }
					message={flashMessage}
				/>
			</IonContent>
	)
}
