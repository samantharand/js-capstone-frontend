import React, { useState, useEffect } from 'react';
import { 
  IonRouterOutlet, 
  IonTabs, 
  IonTabBar, 
  IonLabel, 
  IonTabButton, 
  IonPage, 
  IonApp, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButton, 
  IonSegment, 
  IonSegmentButton, 
  IonSplitPane,
	IonMenuButton,
	IonItem
} from '@ionic/react'
import './App.css';
import './index.css'
import { IonReactRouter } from '@ionic/react-router';
import { BrowserRouter as Router, Route, Redirect, Switch, useHistory } from 'react-router-dom';
import LoginContainer from './users/LoginContainer'
import RegisterContainer from './users/RegisterContainer'
import Home from './home/Home'
import Menu from './menu/Menu'
import UsersAccount from './users/UsersAccount'
import UpdateUser from './users/UpdateUser'
import NewStreetArt from './streetart/NewStreetArt'
import MapContainer from './streetart/Map'
import UpdateStreetArt from './streetart/UpdateStreetArt'

function App(props) {
  console.log('APP PROPS', props);
  // const [history, setHistory] = useState('/')
  const [loggedIn, setLoggedIn] = useState(false)
  const [postsByCurrentUser, setPostsByCurrentUser] = useState([])
  const [streetArtToUpdate, setStreetArtToUpdate] = useState({})
  const [currentUser, setCurrentUser] = useState('')
  const [currentLoc, setCurrentLoc] = useState({
    lat: '',
    lng: ''
  })

  console.log('loggedIn from app.js', loggedIn);
  console.log('currentUser from app.js -- ( ', currentUser, ' )');


  const findBrowserLocation = async () => {
    try {

      const success = (position) => {
        console.log('successss');
        console.log('position', position);
        setCurrentLoc({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
        console.log('currentLoc !!!!!!!!',currentLoc);
      }

      const error = () => {
        console.log('ERRORRRR in findBrowserLocation');
      }

      if(!navigator.geolocation) {
        console.log("error");
      } else {
        const currentLocation = navigator.geolocation.getCurrentPosition(success, error)
      }
      
    } catch (error) {
      console.error(error)
    }
  }

  const getPostsByCurrentUser = async () => {

    try {

      const url = process.env.REACT_APP_API_URL + '/streetart/map'

      const getArtworkResponse = await fetch(url, {
        credentials: 'include',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const getArtworkJson = await getArtworkResponse.json()

      console.log('getArtworkJson', getArtworkJson);
      const postsByCurrentUser = getArtworkJson.data.filter(streetart => streetart.poster.id === currentUser.id)
      // console.log('getArtworkJson.artwork', getArtworkJson.artwork);
      setPostsByCurrentUser(postsByCurrentUser)

    } catch (error) {
      console.error('ERROR IN getPostsByCurrentUser')
      console.error(error)
    }
    
  }

  const logout = async () => {
    try {
    const url = process.env.REACT_APP_API_URL + '/users/logout'

    const logoutResponse = await fetch(url, {
      credentials: 'include'
    })

    const logoutJson = await logoutResponse.json()

    if(logoutJson.status === 200) {
      setLoggedIn(false)
      setCurrentUser('')

    } else {
      console.log("logoutJson.message --> ", logoutJson.message);
      console.log("logoutJson.status --> ", logoutJson.status);
    }

    } catch (error) {
      console.error('ERROR in LOGOUT')
      console.error(error)
    }
  }

  useEffect(() => {
    console.log('useEffect in app.js called');
    findBrowserLocation()
  }, [])


  return (
    <Router>
        <IonApp>
        	<IonItem> 
	        		<IonTitle> STREET ART MAP </IonTitle>
	        		<IonMenuButton slot='start'/>
        	</IonItem>
          <IonSplitPane contentId='main' >
          	<Menu loggedIn={loggedIn} logout={logout}/>
            <IonPage id='main'>
              <Switch>
                <Route 
                  path='/login' 
                  exact
                  render={props => {
                    return <LoginContainer 
                      routeProps={props}
                      setLoggedIn={setLoggedIn}
                      setCurrentUser={setCurrentUser}
                    />;
                  }}
                />
                <Route 
                  path='/register' 
                  exact
                  render={props => {
                    return <RegisterContainer 
                    	routeProps={props}
                    	setLoggedIn={setLoggedIn}
                      setCurrentUser={setCurrentUser}
                    />;
                  }}
                />
                <Route 
                  path='/' 
                  exact
                  render={props => {
                    return <Home routeProps={props} />;
                  }}
                />
                <Route 
                  path='/myaccount' 
                  exact
                  render={props => {
                    return <UsersAccount
                      loggedIn={loggedIn}
                      routeProps={props}
                      currentUser={currentUser}
                      getPostsByCurrentUser={getPostsByCurrentUser}
                      postsByCurrentUser={postsByCurrentUser}
                    />;
                  }}
                />
                <Route 
                  path='/editaccount' 
                  exact
                  render={props => {
                    return <UpdateUser 
                      logout={logout} 
                      setCurrentUser={setCurrentUser} 
                      loggedIn={loggedIn} 
                      routeProps={props} 
                      currentUser={currentUser}
                    />;
                  }}
                />
                <Route 
                  path='/map' 
                  exact
                  render={props => {
                    return <MapContainer
                      loggedIn={loggedIn}
                      routeProps={props}
                      currentUser={currentUser}
                      currentLoc={currentLoc}
                      setStreetArtToUpdate={setStreetArtToUpdate}
                    />;
                  }}
                />
                <Route 
                  path='/newstreetart' 
                  exact
                  render={props => {
                    return <NewStreetArt 
                      loggedIn={loggedIn} 
                      routeProps={props} 
                      currentUser={currentUser}
                    />;
                  }}
                />
                <Route 
                  path='/updatestreetart' 
                  exact
                  render={props => {
                    return <UpdateStreetArt 
                      loggedIn={loggedIn} 
                      routeProps={props} 
                      currentUser={currentUser}
                      streetArtToUpdate={streetArtToUpdate}
                    />;
                  }}
                />                
              </Switch>
            </IonPage>
          </IonSplitPane>
        </IonApp>
    </Router>
  );
}

export default App;


    

/////////////////


    // <IonApp>
    //   <IonReactRouter>
    //     <IonHeader>
    //       <IonToolbar>
    //         <IonTitle>Streetart App</IonTitle>
    //       </IonToolbar>
    //     </IonHeader>
    //     <IonContent>
    //       <IonSplitPane contentId="main">
    //         <Menu />
    //         <IonTabs>
    //           <IonRouterOutlet>
    //             <Route path='/' exact>
    //               <Home />
    //             </Route>
    //             <Route path='/login' exact>
    //               <LoginContainer login={login} />
    //             </Route>
    //             <Route path='/register' exact>
    //               <RegisterContainer register={register} />
    //             </Route>
    //           </IonRouterOutlet>
    //             <IonTabBar slot="bottom">
    //               <IonTabButton tab='login' href='/'>
    //                   <IonLabel> Home </IonLabel>
    //               </IonTabButton>
    //             </IonTabBar>
    //         </IonTabs>
    //       {
    //         !loggedIn
    //         &&
    //         <React.Fragment>
    //           <IonButton href='/login'>Login</IonButton>
    //           <IonButton href='/register'>Register</IonButton>
    //         </React.Fragment>
    //       }
    //     </IonSplitPane>
    //     </IonContent>
    //   </IonReactRouter>
    // </IonApp>