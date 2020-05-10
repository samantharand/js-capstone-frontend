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
  },  
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
  // {
  //   title: 'Favorites',
  //   url: '/page/Favorites',
  //   iosIcon: heartOutline,
  //   mdIcon: heartSharp
  // }
];


// const authPages = [
//   {
//     title: 'Login',
//     url: '/login',
//     icon: homeOutline
//   },
//   {
//     title: 'Register',
//     url: '/register',
//     icon: mapOutline
//   }
// ];

export default function Menu() {
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
	// const renderAuthMenu = () => {
	// 	return authPages.map((page) => (
	// 		<IonMenuToggle key={page.title} auto-hide='false'>
	// 			<IonItem button
	// 				color={page.title === activePage ? 'primary' : ''}
	// 				onClick={ () => navToPage(page) } 
	// 			>
	// 				<IonIcon slot='start' name={page.icon}>{page.icon}</IonIcon>
	// 				<IonLabel> {page.title} </IonLabel>
	// 			</IonItem>
	// 		</IonMenuToggle>
	// 	))
	// }

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
      </IonContent>
    </IonMenu>
  );
};
