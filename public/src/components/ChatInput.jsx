import React, { useState } from 'react'
import styled from 'styled-components'
import Picker from 'emoji-picker-react'
import { BsEmojiSmileFill } from 'react-icons/bs';
import {IoMdSend} from 'react-icons/io';
const ChatInput = ({handleSendMsg}) => {
    const[showEmojiPicker,setShowEmojiPicker]=useState(false);
    const[msg,setMsg]=useState("");
    const hideOrShowEmojiPicker=()=>{
        setShowEmojiPicker(!showEmojiPicker);
    }
    const handleEmojiClick=(event,emoji)=>{
        let message=msg;
        message+=emoji.emoji;
        setMsg(message);

    }
    const sendChat=(event)=>{
        event.preventDefault();
        if(msg.length>0){
            handleSendMsg(msg);
            setMsg('');
        }
       
    }
  return (
    <Container>
        <div className="button-container">
            <div className="emoji">
                {/* <BsEmojiSmileFill onClick={hideOrShowEmojiPicker}/>
                {showEmojiPicker && (
                        <Picker
                            onEmojiClick={handleEmojiClick}
                            disableAutoFocus={true}
                            pickerStyle={{
                                position: 'absolute',
                                top: '-350px', 
                            }}
                        />
                    )} */}

            </div>

        </div>
        <form className='input-container' onSubmit={(e)=>sendChat(e)}>
            <input type="text" placeholder='type your message here' value={msg} onChange={(e)=>setMsg(e.target.value)}/>
            <button className='submit'>
                <IoMdSend/>
            </button>
        </form>
    </Container>
  )
}

const Container=styled.div`
    display: grid;
    grid-template-columns: 5% 90% 5%;
    background-color: #080420;
    padding: 0.2rem;
    align-items: center;
    padding-bottom: 0.3rem;
    .button-container{
        display: flex;
        color: white;
        gap:1rem;
        padding:0.7rem;
        align-items: center;
        .emoji{
            position: relative;
            svg{
                font-size: 1.2rem;
                color: #d1d107e1;
                cursor:pointer;
            }
            .emoji-picker-react{
            top:-350px;
            position:absolute;
            background-color: #080420;
        }
        }
        
       
    }
    .input-container{
        width: 100%;
        display: flex;
        align-items: center;
        background-color: #ffffff34;
        gap:2rem;
        border-radius: 2rem;
        input{
            width: 90%;
            height: 70%;
            color: white;
            padding-left: 1rem;
            border: none;
            font-size: 1.2rem;
            background-color: transparent;
            &::selection{
                background-color: #9a86f3;
            }
            &:focus{
                outline: none;
            }
        }
        button{
            padding: 0.3rem 0.2rem;
            border-radius: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color:#9a86f3;
            border: none;
            svg{
                font-size:2rem;
                color:white;
            }
        }
    }
`
export default ChatInput