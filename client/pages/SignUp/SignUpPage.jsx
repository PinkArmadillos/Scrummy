import React, { useState, useContext } from 'react';
import { useNavigate, Form, redirect, useActionData } from 'react-router-dom';
import { userContext } from '../../context';

const SignUpPage = () => {

  const data = useActionData();

  return (
    <div>
      <h1>Create New Account</h1>
      <Form method='post' action='/SignupPage'>
        <label>
          <span>New Username</span>
          <input type="username" name="username" required />
        </label>
        <br></br>
        <label>
          <span>New Password</span>
          <input type="password" name="password" required />
        </label>
        <br></br>
        {data && data.error && <p>{data.error}</p>}
          <button>Submit</button>
      </Form>

    </div>
  )
};

export const signupAction = async ({ request }) => {
  const { user, setUser } = useContext(userContext)
  const submitData = await request.formData();

  //need to store username/password to DB, then

  const res = await fetch('/api/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: submitData.get('username'),
      password: submitData.get('password')
    })
  });
      
  console.log(res);
  if (res.status === 200) {
        
  console.log('in function body after fetch')

  const response = await res.json();
  console.log('after json parse ')
  console.log("info we received from backend", response);
    console.log(response.user)
  if (response.status === 'valid') {
    console.log('Signup was successful!');
    setUser(response.user); //doing this to make this response.user info accessible from userHomePage
    return redirect('/UserHomePage');
  }

  if (response.status === 'DuplicateUsername') {
    return { error: 'This username is taken, please choose another' };
  }

  return { error: `The status "${response.status}" sent in the response doesn't match the valid cases.` };
  
  } 

  return { error: 'The server responded with a status other than 200'};
 }

export default SignUpPage;