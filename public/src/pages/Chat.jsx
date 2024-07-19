import React, { useEffect, useState,useRef } from 'react'
import styled from 'styled-components'
import Contacts from '../components/Contacts'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { allUsersRoute,host } from '../utils/APIroutes'
import Welcome from '../components/Welcome'
import ChatContainer from '../components/ChatContainer'
import {io} from "socket.io-client"
const Chat = () => {
  const socket=useRef();
  const navigate=useNavigate();
  const [contacts,setContacts]=useState([]);
  const[currentUser,setCurrentUser]=useState(undefined);
  const [currentChat,setCurrentChat]=useState(undefined);
  const [isLoaded,setIsLoaded]=useState(false);
  useEffect(()=>{
    const setUser=async ()=>{
      const user=localStorage.getItem("chat-app-user");
      if(!user){
        navigate("/login");
      }
      else{
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
        setIsLoaded(true);
      }
    }
    setUser();
  },[navigate])
  
  useEffect(()=>{
    try {
      if(currentUser){
        console.log("Here Hjere");
        socket.current=io(host,{
          withCredentials:true,
          transports: ['websocket', 'polling','flashsocket'],
        });
        socket.current.emit("add-users",currentUser._id);
      }
    } catch (error) {
      console.error(error);
    }
    
  }
  ,[currentUser])
  
  useEffect(()=>{
    const fetchContacts =async () =>{
      if(currentUser){
        
        if(currentUser.isAvatarImageSet){
          try {
            const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
          } catch (error) {
           console.log(error); 
          }
          
        }
        else{
          navigate("/SetAvatar");
        }
      }
    }
    fetchContacts();

  },[currentUser])

  const handleChatChange=(chat)=>{
    setCurrentChat(chat);
  }
  
  return (
    <>
      <Container>
        <div className="container">
          <Contacts contacts={contacts} 
          currentUser={currentUser} 
          changeChat={handleChatChange}/>
          {
            
            isLoaded && currentChat===undefined ? <Welcome currentUser={currentUser}/>:<ChatContainer currentChat={currentChat} 
            currentUser={currentUser}
            socket={socket}
            />
          }
         

        </div>
      </Container>
    </>
  )
}

const Container =styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #131213;
  height: 100vh;
  width:100vw;
  gap:1rem;
  .container{
    height: 85vh;
    width:85vw;
    background-color: #00000076;
    display:grid;
    overflow:auto;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 360px) and (max-width:480px){
      grid-template-columns: 40% 60%;
    }
  }
`

export default Chat;