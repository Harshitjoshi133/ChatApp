import React, { useState } from 'react'
import styled from 'styled-components'
import {IoMdSend} from 'react-icons/io';
const ChatInput = ({handleSendMsg}) => {
    
    const[msg,setMsg]=useState("");
    const sendChat=(event)=>{
        event.preventDefault();
        if(msg.length>0){
            handleSendMsg(msg);
            setMsg('');
        }
       
    }
  return (
    <Container>
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
    grid-template-columns: 95% 5%;
    background-color: #080420;
    padding: 0.2rem;
    align-items: center;
    padding-bottom: 0.3rem;
    .input-container{
        width: 100%;
        display: flex;
        align-items: center;
        background-color: #ffffff34;
        gap:2rem;
        border-radius: 2rem;
        input{
            width: 95%;
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