import React, { useState, useEffect } from 'react'
import {
  IonButton
} from '@ionic/react';
import '../index.css'
import { useHistory } from 'react-router-dom';
import UpdateStreetArt from './UpdateStreetArt'

export default function PopoverInfo(props) {
	console.log('props in PopoverInfo', props);
	const [poster, setPoster] = useState('Posted By: ' + props.allStreetArt[props.artIndex].poster.username)
	const history = useHistory()

	useEffect(() => {
		if(props.allStreetArt[props.artIndex].poster.username === props.currentUser.username) {
			setPoster('You posted this!')
		} 
	}, [])

	console.log(poster);
	return (
		<div className='PopoverInfo'> 

			{
				props.allStreetArt[props.artIndex].name
				&&
				<p> <strong>Name: </strong>{ props.allStreetArt[props.artIndex].name }</p>
			}
			<p> <strong>Location: </strong>{ props.allStreetArt[props.artIndex].location }</p>

			{
				props.allStreetArt[props.artIndex].image
				&&
				<img src={props.allStreetArt[props.artIndex].image} />
			}

			{
				props.allStreetArt[props.artIndex].artist
				&&
				<p> <strong>Made By: </strong>{props.allStreetArt[props.artIndex].artist} </p>
			}

			{
				props.allStreetArt[props.artIndex].description
				&&
				<p> <strong>About this Piece: </strong>{props.allStreetArt[props.artIndex].description} </p>
			}

			<p><small> {poster} </small></p>

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


		</div>
	)
}
			// <UpdateStreetArt artworkToEdit={props.allStreetArt[props.artIndex]}/>



/*

/updatestreetart

*/