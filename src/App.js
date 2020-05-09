import React from 'react';
import { IonRouterOutlet, IonTabs, IonTabBar, IonLabel, IonTabButton, IonPage, IonApp, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonSegment, IonSegmentButton } from '@ionic/react'
import logo from './logo.svg';
import './App.css';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';

const Page = () => (
  <IonPage>
    <IonSegment>
      <IonSegmentButton>Hi</IonSegmentButton>
      <IonSegmentButton>Bye</IonSegmentButton>
      <IonSegmentButton>Go Away</IonSegmentButton>
    </IonSegment>
    <IonButton expand='full'>Map</IonButton>
  </IonPage>
)

const Settings = () => <IonPage>Hi, it's settings</IonPage>

function App() {
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
              <Route path='/page' component={Page} exact />
              <Route path='/settings' component={Settings} exact />
              <Redirect from='/' to='/page' />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab='page' href='/page'>
                <IonLabel> Page </IonLabel>
              </IonTabButton>
              <IonTabButton tab='settings' href='/settings'>
                <IonLabel> Settings </IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonContent>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
