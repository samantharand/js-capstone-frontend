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
import { useLocation, Route } from 'react-router-dom';
import { mapOutline, mapSharp, bookmarkOutline, heartOutline, heartSharp, paperPlaneOutline, paperPlaneSharp, homeSharp, homeOutline } from 'ionicons/icons';
// import './Menu.css';
import LoginContainer from '../users/LoginContainer'

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

let authPages;

export default function Menu(props) {
	if(props.loggedIn) {

		authPages = [
		  {
		    title: 'Logout',
		    url: '/logout'
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
				<IonItem button
					color={page.title === activePage ? 'primary' : ''}
					onClick={ () => navToPage(page) }
					routerLink={page.url} routerDirection="none" lines="none" detail={false} 
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
				<IonItem button
					color={page.title === activePage ? 'primary' : ''}
					onClick={ () => navToPage(page) } 
					routerLink={page.url} routerDirection="none" lines="none" detail={false} 

				>
					<IonIcon slot='start' name={page.icon}>{page.icon}</IonIcon>
					<IonLabel> {page.title} </IonLabel>
				</IonItem>
			</IonMenuToggle>
		))
	}

	const navToPage = (page) => {
		setActivePage(page.title)
	}
  return (
    <IonMenu contentId="main">
    	<IonHeader>
    		<IonToolbar>
    			<IonTitle>
    				Menu in Menu
    			</IonTitle>
    		</IonToolbar>
    	</IonHeader>
      <IonContent>
        <IonList>
          { renderAppMenu() }
        </IonList>
    	
	        <IonList>
	          { renderAuthMenu() }
	        </IonList>

      </IonContent>
    </IonMenu>
  );
};
