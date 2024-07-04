import React from 'react'
import './myStyles.css'
import SideBar from './SideBar';
import ChatArea from './ChatArea';
import { useState } from 'react';

const MainContainer = () => {
  const [conversations,setConversations]=useState(
    [
      {
        name:"test-1",
        lastmessage:"Sample-1",
        timestamp:"Today",
      },
      {
        name:"test-2",
        lastmessage:"Sample-2",
        timestamp:"Today",
      },
      {
        name:"test-3",
        lastmessage:"Sample-3",
        timestamp:"Today",
      },
    ]);
  return (
    <div className='main-container'>
      <SideBar/>
      <ChatArea props={conversations[0]}/>
    </div>
  )
}

export default MainContainer;