import React, { useState, useContext } from 'react';
import { useNavigate, Form, redirect, Link } from 'react-router-dom';
// import { userContext } from '../context';

const LoginPage = () => {
  return (
    <div>
      <h1>WELCOME TO SCRUMIFY</h1>
      <h2>Please Log In</h2>
      <br></br>
      <Form method='post' action='/'>
        <label>
          <span>Username</span>
          <input type="username" name="username" required />
        </label>
        <br></br>
        <label>
          <span>Password</span>
          <input type="password" name="password" required />
        </label>
        <br></br>
        <button type="submit" onClick="">Login</button>
      </Form>
      <div id="noAccount">
        <br></br>
        <p>No account?</p><Link to="/SignupPage"> Sign up!</Link>
        </div>
    </div>
  )
};

export const loginAction = async ({ request }) => {
  
  const data = await request.formData()
  
  const submission = {
    username: data.get('username'),
    password: data.get('password')
  }
  
  //need to send info to DB via fetch request

  return redirect('/UserHomePage')
 }

export default LoginPage;