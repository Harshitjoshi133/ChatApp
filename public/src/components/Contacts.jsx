import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.svg';

const Contacts = ({ contacts, currentUser,changeChat}) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);
  
  const changeCurrentChat=(index,contact)=>{
    changeChat(contact);
    setCurrentSelected(index);
  }
  
  return (
    <>
      {currentUserName && currentUserImage && (
        <Container>
          <div className="brand">
            <img src={logo} alt="logo" />
            <h3>Snoop Dog</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => (
              <div
                className={`contact ${currentSelected === index ? 'selected' : ''}`}
                key={index}
                onClick={() => changeCurrentChat(index,contact)}
              >
                <div className="avatar">
                  <img src={contact.avatarImage} alt="avatarImage" />
                </div>
                <div className="username">
                  <h3>{contact.username}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img src={currentUserImage} alt="avatarImage" />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  background-color: #080420;
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    overflow: auto;
    gap: 0.8rem;
    align-items: center;
    &::-webkit-scrollbar{
        width: 0.2rem;
        &-thumb{
            width: 0.1rem;
            border-radius: 0.1rem;
            background-color: #ffffff39;
        }
    }
    
    .contact {
      background-color: #ffffff39;
      min-height: 5rem;
      width: 90%;
      display: flex;
      align-items: center;
      gap: 1rem;
      cursor: pointer;
      border-radius: 0.2rem;
      padding: 0.4rem;
      transition: 0.2s ease-in-out;

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
      
      &.selected {
        background-color: #9186f3;
      }
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }

    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 360px) and (max-width: 480px) {
      gap:0.5rem;
      h2{
        font-size: 1rem;
      }
    }
  }
`;

export default Contacts;
