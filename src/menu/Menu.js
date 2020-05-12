import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonHeader,
  IonToolbar,
  IonTitle
} from '@ionic/react';

import React, { useState } from 'react';
import { useLocation, Route, useHistory } from 'react-router-dom';
import { exitSharp, mapOutline, mapSharp, bookmarkOutline, heartOutline, heartSharp, paperPlaneOutline, paperPlaneSharp, homeSharp, homeOutline } from 'ionicons/icons';
// import './Menu.css';
import LoginContainer from '../users/LoginContainer'


export default function Menu(props) {
	console.log("menu props", props);
  const location = useLocation();
  const history = useHistory()

	const appPages = [
	  {
	    title: 'Home',
	    url: '/',
	    icon: homeOutline
	  },
	  {
	    title: 'Map',
	    url: '/map',
	    icon: mapOutline
	  }
	];

	if(props.loggedIn) {
		appPages.push({
			title: 'Add Art',
			url: '/newstreetart',
			icon: mapOutline
		})
	}


	let authPages;

	if(props.loggedIn) {

		authPages = [
		  {
		    title: 'View Account',
		    url: '/myaccount'
		  }, {
		  	title: 'Edit Account',
		    url: '/editaccount'
		  }
		];

	} else {

		authPages = [
		  {
		    title: 'Login',
		    url: '/login',
		    icon: homeOutline
		  },
		  {
		    title: 'Register',
		    url: '/register',
		    icon: mapOutline
		  }
		];

	}

	const [activePage, setActivePage] = useState(appPages[0].title)

	const renderAppMenu = () => {
		return appPages.map((page) => (
			<IonMenuToggle key={page.title} auto-hide='false'>
				<IonItem 
					onClick={ (e) => navToPage(page, e) }
					className={location.pathname === appPages.url ? 'selected' : ''}
					// routerLink={page.url} 
					// routerDirection="none" 
					lines="none" detail={false} 
				>
					<IonIcon slot='start' name={page.icon}>{page.icon}</IonIcon>
					<IonLabel> {page.title} </IonLabel>
				</IonItem>
			</IonMenuToggle>
		))
	}

	const renderAuthMenu = () => {
					
		return authPages.map((page) => (
			<IonMenuToggle key={page.title} auto-hide='false'>
				<IonItem 
					onClick={ (e) => navToPage(page, e) } 
					className={location.pathname === authPages.url ? 'selected' : ''}
					// routerLink={page.url} 
					// routerDirection="none" 
					lines="none" 
					detail={false} 

				>
					<IonIcon slot='start' name={page.icon}>{page.icon}</IonIcon>
					<IonLabel> {page.title} </IonLabel>
				</IonItem>
			</IonMenuToggle>

		))

	} // renderAuthMenu

	const navToPage = (page, event) => {
		event.preventDefault()
		history.push(page.url)
	}

	const logout = () => {
		props.logout();
		history.push('/')
	}


  return (
    <IonMenu contentId="main">
    	<IonHeader>
    		<IonToolbar>
    			<IonTitle>
    				Menu
    			</IonTitle>
    		</IonToolbar>
    	</IonHeader>
      <IonContent>
        <IonList>
          { renderAppMenu() }
        </IonList>
    	
	      <IonList>
	        { renderAuthMenu() }
	        
	        {  			
						props.loggedIn
						&&
						<IonItem>
									<IonIcon name='exitSharp'></IonIcon>
									<IonLabel onClick={logout}> Logout </IonLabel>
						</IonItem>
					}

	      </IonList>

      </IonContent>
    </IonMenu>
  );
};
