import React, { useState } from 'react'
import { IonRouterOutlet, IonInput, IonItem, IonTabs, IonTabBar, IonLabel, IonTabButton, IonPage, IonApp, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonSegment, IonSegmentButton } from '@ionic/react'
import '../index.css'
export default function Home(props) {
	return (
		<IonContent>
			<IonTitle> home :) </IonTitle>
			<div style={{
				backgroundImage: 'url(https://s3.amazonaws.com/zenplannerwordpress-stack0/wp-content/uploads/sites/97/2018/09/20141422/Sprinkles-Background.jpg)',
				height: '500px', backgroundSize: 'contain'}}
			> 
				<div style={{backgroundColor: 'rgba(255, 255, 255, .9)', height: '250px'}}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam sit amet nisl suscipit adipiscing bibendum. Scelerisque fermentum dui faucibus in ornare quam viverra orci. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Arcu bibendum at varius vel pharetra vel turpis. Ac tortor dignissim convallis aenean et. Pulvinar pellentesque habitant morbi tristique. Ut eu sem integer vitae justo eget magna. Cras adipiscing enim eu turpis. Eget dolor morbi non arcu. In arcu cursus euismod quis viverra. Felis bibendum ut tristique et egestas quis. Orci ac auctor augue mauris augue. Ut enim blandit volutpat maecenas. Nullam vehicula ipsum a arcu cursus vitae. Arcu cursus euismod quis viverra nibh cras. A iaculis at erat pellentesque adipiscing commodo elit at. Vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt. Sed egestas egestas fringilla phasellus faucibus.
					</div>
			</div>
		</IonContent>
	)
}

			// <img src='../background.jpg'/>
			// <img src='https://s3.amazonaws.com/zenplannerwordpress-stack0/wp-content/uploads/sites/97/2018/09/20141422/Sprinkles-Background.jpg' />