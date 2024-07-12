import React from 'react';
import { PowerSettingsNew as PowerSettingsNewIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Logout = () => {
    const navigate = useNavigate();
    
    const handleClickListener = async () => {
      localStorage.clear();
      navigate("/login");
  };
  

    return (
        <Button onClick={handleClickListener} aria-label="Logout">
            <PowerSettingsNewIcon />
        </Button>
    );
};

const Button = styled.button`
    background-color: #9a86f3;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #8678f3;
    }

    &:active {
        background-color: #7a6fef;
    }
`;

export default Logout;
