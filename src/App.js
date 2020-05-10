import React, { useState } from 'react';
import { IonRouterOutlet, IonTabs, IonTabBar, IonLabel, IonTabButton, IonPage, IonApp, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonSegment, IonSegmentButton } from '@ionic/react'
import './App.css';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import LoginContainer from './users/LoginContainer'
import RegisterContainer from './users/RegisterContainer'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  const login = () => {
    const url = process.env.REACT_APP_API_URL + '/users/login'
    console.log(url);
  }

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
              <Route path='/login' exact>
                <LoginContainer login={login} />
              </Route>
              <Route path='/register' component={RegisterContainer} exact />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab='login' href='/login'>
                <IonLabel> Login </IonLabel>
              </IonTabButton>
              <IonTabButton tab='register' href='/register'>
                <IonLabel> Register </IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonContent>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
