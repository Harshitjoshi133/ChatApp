import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Contacts from '../components/Contacts'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { allUsersRoute } from '../utils/APIroutes'
const Chat = () => {
  const navigate=useNavigate();
  const [contacts,setContacts]=useState([]);
  const[currentUser,setCurrentUser]=useState(undefined);
  const [currentChat,setCurrentChat]=useState(undefined);
  useEffect(()=>{
    const setUser=async ()=>{
      if(!localStorage.getItem("chat-app-user")){
        navigate("/login");
      }
      else{
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")))
      }
    }
    setUser();
   
  },[])
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
          <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/>

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
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 360px) and (max-width:480px){
      grid-template-columns: 40% 60%;
    }
  }
`

export default Chat;