import React from 'react';
import Scrumboard from './Scrumboard';
// need to import Forms 

export default function MainContainer() {
  return (
    <div className="mainContainer">
      <Forms/>
      <Scrumboard/>
    </div>
  )
}