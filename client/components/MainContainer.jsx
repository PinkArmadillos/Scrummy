import React from 'react';
import Scrumboard from './Scrumboard';
import Forms from './Forms';
// need to import Forms 

export default function MainContainer() {
  return (
    <div className="mainContainer">
      <Forms/>
      <Scrumboard/>
    </div>
  )
}