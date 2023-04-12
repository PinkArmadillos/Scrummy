import React, { useState } from 'react';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import MainContainer from './components/MainContainer';
import RootLayout from './layouts/RootLayout';
import LoginPage from './pages/Login/LoginPage';
import SignUpPage from './pages/SignUp/SignUpPage';
import UserHomePage from './pages/UserHome/UserHomePage';
import ScrumBoard from './pages/ScrumBoard/ScrumBoardPage';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout/>}>
      <Route path='/' element={<LoginPage key='LoginPage'/>} />
      <Route
        path='/SignupPage'
        element={<SignUpPage key='SignupPage' />}
      />
      <Route
        path='/UserHomePage'
        element={<UserHomePage key='UserHomePage' />}
      />
      <Route
        path='/ScrumBoardPage'
        element={<ScrumBoard key='ScrumBoardPage' />}
      />
    </Route>
  )
)


function App2() {

  return (
    <>
      <header>
        <h1>SCRUMMY</h1>
      </header>
      <MainContainer />
    </>
  );
}


const App = () => {

  // const [ user, setUser ] = useState('null');
  // const [ currentTrip, setCurrentTrip ] = useState('null');
  // const userValue = { user, setUser };
  // const currentTripValue = { currentTrip, setCurrentTrip };
  
  // Using these context providers with context.js provides a way to store data accessible to
  // all children components. This way we can query the database as little as possible.
  return (
    // <userContext.Provider value={userValue}>
    //   <tripContext.Provider value={currentTripValue}>
        <RouterProvider router={router} />
    //   </tripContext.Provider>
    // </userContext.Provider>
  )
}

export default App;