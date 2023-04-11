import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup(){
  const navigate = useNavigate();

  // teamname, setTeamName, password, setPassword
  const [ teamname, setTeamName ] = useState('');
  const [ password, setPassword ] = useState('');

   function authenticateUser(event){
    event.preventDefault();
    fetch('/api/login', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        teamname,
        password
      }),
    })
     .then(
      navigate('/scrummy')

    )
    .catch(err => {
      console.log({err: 'Error authenticating user'});
    });
  }


  return(
    // <h1>Login to Scrummy</h1>
    <form className="sign" onSubmit={authenticateUser}>
      <label value="teamname">Enter Team Name</label>
      <input id="teamname" name="teamname" type="text" onChange={(e) => setTeamName(e.target.value)}></input>
      <label value="password">Enter Password</label>
      <input id="password" name="password" type="text" onChange={(e) => setPassword(e.target.value)}></input>
      <input className="submit" type="submit" value="authenticateUser"></input>
    </form>

  )
}