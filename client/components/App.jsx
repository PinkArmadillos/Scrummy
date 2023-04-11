import React from 'react';
import MainContainer from './MainContainer';
import Signup from './Signup';
import Login from './Login'
import { Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function App() {

  return (
    <>

      <header>
        <h1>SCRUMMY</h1>
      </header>
      <Routes>
        {/* <Route path="/" element={<Signup />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/scrummy" element={<MainContainer />} />
        {/* <Login /> */}

        {/* <MainContainer /> */}
      </Routes>
    </>
  );
}

export default App;

// If i wanted to login at localhost:8080/ and be redirected to localhost:8080/scrummy, would the routing above work?
// Based on the provided server routes, the /login route is configured to redirect to /scrummy after successful login:


// router.post('/login', teamController.login, (req, res) => {
//   res.redirect('/scrummy');
// })
// So, if you make a successful login request to /login endpoint, the server will redirect the client to /scrummy URL. However, please note that the client-side routing in your App component is not handling this redirection.

// In your App component, you have defined a client-side route for /login:


// <Route path="/login" element={<Login />} />
// This route maps to the Login component, but it does not include any redirection logic. If you want to handle the redirection from /login to /scrummy on the client side, you can modify your Login component to perform the redirection after a successful login, using the useNavigate hook from react-router-dom. Here's an example:

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function Login() {
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     // Perform login logic
//     // If successful, navigate to /scrummy
//     navigate('/scrummy');
//   };

//   return (
//     // Render login form
//     // ...
//   );
// }

// export default Login;

// With this code, after a successful login, the navigate function from useNavigate hook will be called, which will trigger a client-side redirection to /scrummy without making a request to the server. Please note that the server-side redirection from /login to /scrummy will still occur as per your server route logic.





