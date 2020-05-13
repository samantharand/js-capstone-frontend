import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

export default function UpdateStreetArt(props) {

	const history = useHistory()
	console.log('props in updateStreetArt', props);

	//update 
	const updateStreetArt = async (infoToUpdate) => {
		const url = process.env.REACT_APP_API_URL + '/streetart/' 


	}
	// delete 

	return (
		<p> updateStreetArt !!!</p>
	)

}