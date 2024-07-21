import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Logout from './Logout'
import ChatInput from './ChatInput'
import {v4 as uuidv4} from 'uuid'; 
import axios from 'axios';
import { getAllMessageRoute, sendMessageRoute } from '../utils/APIroutes';
import {io} from "socket.io-client"
import { host } from '../utils/APIroutes';
const ChatContainer = ({currentChat,currentUser,socket}) => {
    //const local="http://localhost:5000"
    const [messages,setMessages]=useState([]);
    const [arrivalMessage,setArrivalMessage]=useState(null);
    const scrollRef=useRef();
    useEffect(()=>{
        try {
            
            const fetchChat=async ()=>{
                const response = await axios.post(getAllMessageRoute,{
                    from:currentUser._id,
                    to:currentChat._id,
                })
                
                setMessages(response.data);
            }
            if(currentChat){
            fetchChat();
            }
            
            
        } catch (error) {
            console.log(error);
        }
        
    },[currentChat])
    const handleSendMsg=async (msg)=>{
        try {
            await axios.post(sendMessageRoute,
                {
                    from:currentUser._id,
                    to:currentChat._id ,
                    message:msg,
            })
            socket.current.emit("send-msg",{
                from:currentUser._id,
                to:currentChat._id ,
                message:msg,
            })
        
            const msgs=[...messages]
            msgs.push({fromSelf:true,message:msg})
            setMessages(msgs);
        } catch (error) {
            console.log(error);
        }
       
    };
    useEffect(()=>{

        try {
            if(socket.current){
                socket.current.on("msg-recieve",(msg)=>{
                    setArrivalMessage({fromSelf:false,message:msg});
                })
                console.log(socket.current);
            }
            else{
                console.log(`no sockets for you`);
            }
        } catch (error) {
            console.log(error);
        }
        
    },[])
    useEffect(()=>{
        arrivalMessage && setMessages((prev)=>[...prev,arrivalMessage]);
    },[arrivalMessage])
    
    useEffect(()=>{
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    },[messages])

    return (
    <>
        {currentChat && 
        (<Container>
       
            <div className="chat-header">
                <div className="user-details">
                    <div className="avatar">
                        <img src={currentChat.avatarImage} alt="AvatarImage" />
                    </div>
                    <div className="username">
                        <h3>{currentChat.username}</h3>
                    </div>
                </div>
                <Logout/>
            </div>
            <div className="chat-messages">
                        {messages.map((message) => (
                            <div key={uuidv4()} className={`message ${message.fromSelf ? "sended" : "received"}`}>
                                <div className="content">
                                    <p>{message.message}</p>
                                </div>
                            </div>
                        ))}
                        <div ref={scrollRef} />
                    </div>

            <ChatInput handleSendMsg={handleSendMsg}/>
        </Container>
    )
}
    </>

  )
}

const Container = styled.div`
    display: grid;
    grid-template-rows: 10% 78% 12%;
    @media screen and (min-width: 360px) and (max-width: 480px) {
        grid-template-columns: 15% 70% 10%;
    }
    gap: 0.1rem;
    overflow:hidden;
    padding-top: 1rem;

    .chat-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.2rem;

        .user-details {
            display: flex;
            align-items: center;
            gap: 1rem;

            .avatar {
                img {
                    height: 3rem;
                }
            }

            .username {
                h3 {
                    color: white;
                }
            }
        }
    }

    .chat-messages {
        padding: 1rem 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow: auto;
        &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
        .message {
            display: flex;
            align-items: center;
            min-height: 3.5rem;
            .content {
                min-width: 40%;
                overflow-wrap: break-word;
                padding: 1rem;
                border-radius: 1rem;
                font-size: 1.1rem;
                color: #d1d1d1;
            }
        }

        .sended {
            justify-content: flex-end;

            .content {
                background-color: #4f04ff21;
            }
        }

        .received {
            justify-content: flex-start;

            .content {
                background-color: #99ff0020;
            }
        }
    }
`;



export default ChatContainer