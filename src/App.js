import React, { useState } from 'react';
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
  IonSplitPane} from '@ionic/react'
import './App.css';
import { IonReactRouter } from '@ionic/react-router';
import { BrowserRouter as Router, Route, Redirect, Switch, useHistory } from 'react-router-dom';
import LoginContainer from './users/LoginContainer'
import RegisterContainer from './users/RegisterContainer'
import Home from './home/Home'
import Menu from './menu/Menu'

function App(props) {
  console.log('APP PROPS', props);
  const [loggedIn, setLoggedIn] = useState(false)
  
  console.log(loggedIn);


  const login = async (loginInfo) => {
    const url = process.env.REACT_APP_API_URL + '/users/login'
    
    try {

      const loginResponse = await fetch(url, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(loginInfo),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      console.log("lr", loginResponse);
      const loginJson = await loginResponse.json()

      console.log("lj", loginJson);

      if(loginJson.status === 201) {
        setLoggedIn(true)
      } else {
        console.log("loginJson.message --> ", loginJson.message);
        console.log("loginJson.status --> ", loginJson.status);
      }


    } catch (error) {
      console.error("ERROR in LOGIN")
      console.error(error)
    }
  }

  const register = async (registerInfo) => {
    const url = process.env.REACT_APP_API_URL + '/users/register'

    try {

      const registerResponse = await fetch(url, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(registerInfo),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const registerJson = await registerResponse.json()

      if(registerJson.status === 201) {

        setLoggedIn(true)

      } else {

        console.log("registerJson.message --> ", registerJson.message);
        console.log("registerJson.status --> ", registerJson.status);

      }
      
    } catch (error) {
      console.error("ERROR in REGISTER")
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

    } else {
      console.log("logoutJson.message --> ", logoutJson.message);
      console.log("logoutJson.status --> ", logoutJson.status);
    }

    } catch (error) {
      console.error('ERROR in LOGOUT')
      console.error(error)
    }
  }



  console.log('loggedIn',loggedIn);




  return (
    <Router>
      <div id='app'>
        <IonApp>
          <IonSplitPane contentId='main'>
            <Menu loggedIn={loggedIn} logout={logout}/>
            <IonPage id='main'>
              <Switch>
                <Route 
                  path='/login' 
                  exact
                  render={props => {
                    return <LoginContainer routeProps={props} login={login} />;
                  }}
                />
                <Route 
                  path='/register' 
                  exact
                  render={props => {
                    return <RegisterContainer routeProps={props} register={register} />;
                  }}
                />
                <Route 
                  path='/' 
                  exact
                  render={props => {
                    return <Home routeProps={props} />;
                  }}
                />
              </Switch>
            </IonPage>
          </IonSplitPane>
        </IonApp>
      </div> 
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