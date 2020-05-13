import React, { useState } from 'react'

export default function PopoverInfo(props) {
	console.log('props in PopoverInfo', props);
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
		</React.Fragment>
	)
}