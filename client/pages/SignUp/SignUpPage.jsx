import React, { useState, useContext } from 'react';
import { useNavigate, Form, redirect } from 'react-router-dom';
// import { userContext } from '../context';

const SignUpPage = () => {
  return (
    <div>
      <h1>Create New Account</h1>
      <Form method='post' action='/SignupPage'>
        <label>
          <span>New Username</span>
          <input type="newUsername" name="newUsername" required />
        </label>
        <br></br>
        <label>
          <span>New Password</span>
          <input type="newPassword" name="newPassword" required />
        </label>
        <br></br>
          <button>Submit</button>
      </Form>

    </div>
  )
};

export const signupAction = async ({ request }) => {
  
  const data = await request.formData()
  
  const submission = {
    newUsername: data.get('newUsername'),
    passnewPasswordword: data.get('newPassword')
  }
  
  //need to store username/password to DB, then
  return redirect('/UserHomePage')
 }

export default SignUpPage;