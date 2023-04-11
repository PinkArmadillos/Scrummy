import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup(){

  const navigate = useNavigate();
  // teamname, setTeamName, password, setPassword
  const [ teamname, setTeamName ] = useState('');
  const [ password, setPassword ] = useState('');

  function addTeam(event){
    event.preventDefault();
    fetch('/api/create', {
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
      res => res.json()
    )
    .then(

      navigate('/scrummy')
    )
    .catch(err => {
      console.log({err: 'Error creating Team'});
    });
  }



  return(
    // <h1>Signup for Scrummy</h1>
    <form className="sign" onSubmit={addTeam}>
      <label value="teamname">Create Team Name</label>
      <input id="teamname" name="teamname" type="text" onChange={(e) => setTeamName(e.target.value)}></input>
      <label value="password">Create Password</label>
      <input id="password" name="password" type="text" onChange={(e) => setPassword(e.target.value)}></input>
      <input type="submit" value="create team"></input>
    </form>

  )
}


// function addTeam(event) {
//   event.preventDefault();
//   fetch('/api/create', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       teamname,
//       password
//     }),
//   })
//     .then(response => {
//       if (response.ok) {
//         // If successful, navigate to /scrummy
//         window.location.href = '/scrummy';
//       } else {
//         console.error('Failed to create team:', response.statusText);
//       }
//     })
//     .catch(err => {
//       console.error('Error creating team:', err);
//     });
// }