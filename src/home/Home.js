import React, { useState } from 'react'
import { IonRouterOutlet, IonInput, IonItem, IonTabs, IonTabBar, IonLabel, IonTabButton, IonPage, IonApp, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonSegment, IonSegmentButton } from '@ionic/react'
import '../index.css'
export default function Home(props) {
	return (
		<IonContent>
			<IonTitle> home :) </IonTitle>
			<div width='100px' overflow='scroll'>
				<IonButton
					fill='outline' 
					size='small'
					color='dark'> IonButton </IonButton>
				<button 
					style={{border: 'solid black 1px'}}> button </button>
			</div>
		</IonContent>
	)
}
