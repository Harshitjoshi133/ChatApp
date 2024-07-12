import React from 'react'
import styled from 'styled-components'
import Robot from '../assets/robot.gif'

const Welcome = ({currentUser}) => {
  return (
    <Container>
        
        <img src={Robot} alt="Robot"/>
        <h1>Welcome</h1>
        <h3>Please click on Chats to start chat<span>{currentUser.username}</span></h3>
     </Container>
  )
}

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color:white;

    span{
        color: #4e0eff;
    }    
`

export default Welcome
