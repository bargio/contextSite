import React from 'react';
import './App.css';
import NavBar from './component/navbar/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Header } from './component/header/Header';
import { Home } from './component/home/Home';
import { ContestHome } from './component/contest/ContestHome';
import { AtlanteHome } from './component/atlante/AtlanteHome';
import { HomePageComponent } from './component/HomeComponent/HomePageComponent';
import { Footer } from './component/Footer/Footer';
import { QuizContest } from './component/quiz/Quiz';
import { QuizList } from './component/quiz/QuizList';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { QuizCreator } from './component/quiz/QuizCreator';
import { ProfilePage } from './component/user/ProfilePage';
import * as firebase from "firebase/app";
import { AnimalDetails } from './component/atlante/AnimalDetails';
import { AtlanteHomePage } from './component/atlante/AtlanteHomePage';
/*import 'firebase/messaging';

var firebaseConfig = {
  apiKey: "AIzaSyBzIK9fVha251nGOuDLmHr9GzzZvR3VZTg",
  authDomain: "nowtv-web-push-notification.firebaseapp.com",
  databaseURL: "https://nowtv-web-push-notification.firebaseio.com",
  projectId: "nowtv-web-push-notification",
  storageBucket: "nowtv-web-push-notification.appspot.com",
  messagingSenderId: "707730405200",
  appId: "1:707730405200:web:ed3a4930fa074d4f3e9e55",
  measurementId: "G-Y5SRBM0JBV"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Amplify.configure(awsconfig);*/

function App() {
  
  /*const messaging = firebase.messaging();

  messaging.onMessage((payload) => {
    console.log('Message received. ', payload);
    // ...
  });*/
  
  
  return (
    
    <BrowserRouter>
      <NavBar/>
      <Switch>
        <Route exact path={"/"} component={QuizList} />
        <Route exact path={"/quiz"} component={QuizList} />
        <Route exact path={"/quiz/creator"} component={QuizCreator} />
        <Route exact path={"/quiz/:quizId"} component={QuizContest} />
        <Route exact path={"/profile"} component={ProfilePage} />
        <Route exact path={"/atlante"} component={AtlanteHome} />
        <Route exact path={"/atlanteHome"} component={AtlanteHomePage} />
        <Route exact path={"/atlante/:animalId"} component={AnimalDetails} />
        <Route path="*" render={() => <Redirect to="/" />} />
      </Switch>
      <Footer/>
    </BrowserRouter>
  );
}

///OLD CONFIGURATION--TO RESTORE APP.js and NavBar.js
/*
<Switch>
        <Route exact path={"/"} component={Home} />
        <Route exact path={"/contesthome"} component={ContestHome} />
        <Route exact path={"/atlantehome"} component={AtlanteHome} />
        <Route exact path={"/quiz"} component={QuizList} />
        <Route exact path={"/quiz/thanks"} component={QuizThanks} />
        <Route exact path={"/quiz/creator"} component={QuizCreator} />
        <Route exact path={"/quiz/:quizId"} component={QuizContest} />
        <Route exact path={"/profile"} component={ProfilePage} />
        <Route path="*" render={() => <Redirect to="/" />} />
      </Switch>

*/
export default App;
