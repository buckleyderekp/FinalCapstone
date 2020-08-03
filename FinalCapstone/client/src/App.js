import React from 'react';
import logo from './logo.svg';
import * as firebase from "firebase/app";
import { BrowserRouter as Router } from "react-router-dom";

import Header from './components/Header';
import ApplicationViews from './components/ApplicationViews';
import { UserProfileProvider } from './components/providers/UserProfileProvider';
import { CallSessionProvider } from './components/providers/CallSessionProvider';
import { AppointmentSessionProvider } from './components/providers/AppointmentSessionProvider';
import { SaleProvider } from './components/providers/SaleProvider';


const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
};
firebase.initializeApp(firebaseConfig);


function App() {
  return (
    <Router>
      <UserProfileProvider>
        <AppointmentSessionProvider>
          <CallSessionProvider>
            <SaleProvider>
              <Header />
              <ApplicationViews />
            </SaleProvider>
          </CallSessionProvider>
        </AppointmentSessionProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;
