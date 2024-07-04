import React, { useState } from 'react';
import './myStyles.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NightlightIcon from '@mui/icons-material/Nightlight';
import SearchIcon from '@mui/icons-material/Search';
import { Icon, IconButton } from '@mui/material';
import { GroupAdd } from '@mui/icons-material';
import ConversationItem from './ConversationItem';
const SideBar = () => {
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
    <div  className='sidebar-container'>
      <div className="sb-header">
        <div>
          <IconButton>
            <AccountCircleIcon/>
          </IconButton>
        </div>
        <div>
        <IconButton>
          <PersonAddIcon/>
        </IconButton>
        <IconButton>
          <GroupAddIcon/>
        </IconButton>
        <IconButton>
          <AddCircleIcon/>
        </IconButton>
        <IconButton>
          <NightlightIcon/>
        </IconButton>
        </div>
        
      </div>
      <div className="sb-search">
        <IconButton>
          <SearchIcon/>
        </IconButton>
        
        <input placeholder='search' className='search-box'/>
        
      </div>
      <div className="sb-conversations">
        {
          conversations.map((conversation)=>{
              return <ConversationItem props={conversation}/>
          })
        }
        
      </div>
    </div>
  )
}

export default SideBar