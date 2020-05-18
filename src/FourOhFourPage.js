import React from 'react'
import {
  IonContent,
  IonTitle
} from '@ionic/react';

export default function FourOhFourPage(props){
	return (
		<div className="RistrictedAuth">
				<IonTitle>Must be logged in to access account details.</IonTitle>
				<p><a href='/login'>LOGIN</a> || <a href='/register'>REGISTER</a></p>
		</div>
	)
}