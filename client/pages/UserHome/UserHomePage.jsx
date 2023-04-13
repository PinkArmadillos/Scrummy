import React, { useState, useContext, useEffect } from 'react';
import { userContext } from '../../context';
import { useNavigate } from 'react-router-dom';

import TeamDisplay from './components/TeamDisplay';


const UserHomePage = () => {
  const { user, setUser } = useContext(userContext);
  const [joinTripCode, setJoinTripCode] = useState('');
  const [newTeamName, setNewTeamName] = useState('');
  const [teamArray, setTeamArray] = useState([]);
  const navigate = useNavigate();


  // NOT built yet
  const handleCreateTeam = (e) => {
    e.preventDefault();
    // query to backend middleware to handle insertion of user and team into userTeam table
  }

  // NOT built yet
  const handleJoinTeam = (e) => {
      e.preventDefault();
      // console.log(user);
      // patch
      // TODO make functionality in backend lol
      // return navigate('/ScrumBoardPage');
  }

useEffect(() => {
  setTeamArray(makeTeamArray(user.userTeams));
}, [user]);

  return (
    <div className="user-home-page">
      <h1>User Home Page</h1>
      <div id='create-team-div'>
        <input type="text" placeholder="Enter your team name here" onChange={(e) => setNewTeamName(e.target.value)} />
        <button onClick={handleCreateTeam}>Create New Team</button>
      </div>
      <div id='create-team-div'>
        <input type="text" placeholder={"Enter your team url here"} onChange={(e) => setJoinTeamCode(e.target.value)} />
        <button onClick={handleJoinTeam}>Join Trip</button>
      </div>
        <div id='teams-container-div'>
          <h2>Your Teams</h2>
            {teamArray}
          </div>
    </div>
  )
};

export default UserHomePage;


function makeTeamArray(userTeamArray) {
  if (!userTeamArray || userTeamArray.length === 0) {
    return <div>Join some teams already!!! Don't you have friends?</div>
  };
  return userTeamArray.map(team => {
    return <TeamDisplay teamName={team.team_name} teamId={team.id} />
  })
}