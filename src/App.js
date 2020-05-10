import React, { useState } from 'react';
import { IonRouterOutlet, IonTabs, IonTabBar, IonLabel, IonTabButton, IonPage, IonApp, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonSegment, IonSegmentButton } from '@ionic/react'
import './App.css';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import LoginContainer from './users/LoginContainer'
import RegisterContainer from './users/RegisterContainer'
import Home from './home/Home'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  console.log(loggedIn);
  const login = async (loginInfo) => {
    const url = process.env.REACT_APP_API_URL + '/users/login'
    
    try {

      const loginResponse = await fetch(url, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(loginInfo),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      console.log("lr", loginResponse);
      const loginJson = await loginResponse.json()

      console.log("lj", loginJson);

      if(loginJson.status === 201) {
        setLoggedIn(true)
      } else {
        console.log("loginJson.message --> ", loginJson.message);
        console.log("loginJson.status --> ", loginJson.status);
      }


    } catch (error) {
      console.error("ERROR in LOGIN")
      console.error(error)
    }
  }

  const register = async (registerInfo) => {
    const url = process.env.REACT_APP_API_URL + '/users/register'

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

        setLoggedIn(true)

      } else {

        await console.log("registerJson.message --> ", registerJson.message);
        await console.log("registerJson.status --> ", registerJson.status);

      }
      
    } catch (error) {
      console.error("ERROR in REGISTER")
      console.error(error)
    }
  }



    console.log('loggedIn',loggedIn);
  return (
    <IonApp>
      <IonReactRouter>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Streetart App</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonTabs>
            <IonRouterOutlet>
              <Route path='/home' exact>
                <Home />
              </Route>
            </IonRouterOutlet>
            <IonRouterOutlet>
              <Route path='/login' exact>
                <LoginContainer login={login} />
              </Route>
              <Route path='/register' exact>
                <RegisterContainer register={register} />
              </Route>
            </IonRouterOutlet>
              {
                !loggedIn
                &&
                <IonTabBar slot="bottom">
                  <IonTabButton tab='login' href='/login'>
                    <IonLabel> Login </IonLabel>
                  </IonTabButton>
                  <IonTabButton tab='register' href='/register'>
                    <IonLabel> Register </IonLabel>
                  </IonTabButton>
                </IonTabBar>
              }
              {
                loggedIn
                &&
                <IonTabBar slot="bottom">
                  <IonTabButton tab='login' href='/login'>
                      <IonLabel> login </IonLabel>
                  </IonTabButton>
                </IonTabBar>
              }
          </IonTabs>
        </IonContent>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
