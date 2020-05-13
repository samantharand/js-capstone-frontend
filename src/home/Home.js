import React, { useState } from 'react'
import { IonRouterOutlet, IonInput, IonItem, IonTabs, IonTabBar, IonLabel, IonTabButton, IonPage, IonApp, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonSegment, IonSegmentButton } from '@ionic/react'

export default function Home(props) {
	return (
		<IonPage className="HomePage">
			<IonContent>
				<IonTitle> home :) </IonTitle>
				<IonButton> IonButton </IonButton>
				<button 
					style={{border: 'solid black 1px'}}> button </button>
			</IonContent>
		</IonPage>
	)
}
