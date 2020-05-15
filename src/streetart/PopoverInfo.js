import React, { useState, useEffect } from 'react'
import {
  IonButton
} from '@ionic/react';
import '../index.css'
import { useHistory } from 'react-router-dom';
import UpdateStreetArt from './UpdateStreetArt'

export default function PopoverInfo(props) {
	console.log('props in PopoverInfo', props);
	const [poster, setPoster] = useState(props.allStreetArt[props.artIndex].poster.username)
	const history = useHistory()

	useEffect(() => {
		if(props.allStreetArt[props.artIndex].poster.username === props.currentUser.username) {
			setPoster('You!')
		} 
	}, [])

	console.log(poster);
	return (
		<React.Fragment>
			<p> { props.allStreetArt[props.artIndex].name }</p>
			<p> { props.allStreetArt[props.artIndex].location }</p>

			{
				props.allStreetArt[props.artIndex].image
				&&
				<img src={props.allStreetArt[props.artIndex].image} />
			}

			{
				props.allStreetArt[props.artIndex].description
				&&
				<p> {props.allStreetArt[props.artIndex].description} </p>
			}

			<p> posted by: {poster} </p>

			{
				props.currentUser.id === props.allStreetArt[props.artIndex].poster.id
				&&
				<IonButton 
					fill='outline' 
					size='small'
					color='dark'
					onClick={ () => {
						history.push('/updatestreetart')
						props.setStreetArtToUpdate(props.allStreetArt[props.artIndex])
					}}
				> edit </IonButton>
			}


		</React.Fragment>
	)
}
			// <UpdateStreetArt artworkToEdit={props.allStreetArt[props.artIndex]}/>



/*

/updatestreetart

*/