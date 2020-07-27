import React from 'react';
import logo from './logo.svg';
import * as firebase from "firebase/app";
import { BrowserRouter as Router } from "react-router-dom";

import Header from './components/Header';
import ApplicationViews from './components/ApplicationViews';
import { UserProfileProvider } from './components/providers/UserProfileProvider';
import { CallSessionProvider } from './components/providers/CallSessionProvider';


const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
};
firebase.initializeApp(firebaseConfig);


function App() {
  return (
    <Router>
      <UserProfileProvider>
        <CallSessionProvider>
          <Header />
          <ApplicationViews />
        </CallSessionProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;
