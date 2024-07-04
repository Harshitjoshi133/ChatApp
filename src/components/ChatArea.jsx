import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material'
import React from 'react'

const ChatArea = ({props}) => {
  return (
    <div className='chatarea-container'>
        <div className="chat-header">
            <p className="con-icon">{props.name[0]}</p>
            <div className='header-text'>
                <p className="con-title">{props.name}</p>
                <p className="con-timestamp">{props.timestamp}</p>
            </div>
            <div>
                <IconButton>
                    <DeleteIcon/>
                </IconButton>
            </div>
        </div>
        <div className="chat-main">Main</div>
        <div className="chat-input">Input</div>
    </div>
  )
}

export default ChatArea