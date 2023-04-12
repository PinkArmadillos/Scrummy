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
        {data && data.error && <p>{data.error}</p>}
        <br></br>
        <label>
          <span>New Password</span>
          <input type="password" name="password" required />
        </label>
        <br></br>
          <button>Submit</button>
      </Form>

    </div>
  )
};

export const signupAction = async ({ request }) => {
  const { user, setUser } = userContext;
  const submitData = await request.formData();

  //need to store username/password to DB, then
  try {
    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: submitData.get('username'),
        password: submitData.get('password')
      })
    });
    
    console.log('in function body after fetch')
    console.log(res, typeof res);
    const response = await JSON.parse(res);
    console.log('after ')
    console.log("info we received from backend", response);

    if (response.status === 'valid') {
      console.log('Signup was successful!');
      await setUser(response.user); //doing this to make this response.user info accessible from userHomePage
      return redirect('/UserHomePage');
    }

    if (response.status === 'DuplicateUsername') {
      return { error: 'This username is taken, please choose another' };
    }

    return { error: `The status "${response.status}" sent in the response doesn't match the valid cases.` };
    
  } catch (err) {
    console.log('In catch statement')
    return `You got an error when using signup action: ${err.message}`;
  }
  console.log('somehow here')
  return 'fail'
}


export default SignUpPage;