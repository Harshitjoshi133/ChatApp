import React from 'react'
import { useEffect,useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {styled} from 'styled-components'
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { loginRoute } from '../utils/APIroutes'
const login = () => {
  const navigate=useNavigate();
  useEffect(()=>{
    if(localStorage.getItem("chat-app-user")){
      navigate("/");
    }
  },[])
  const[values,setValues]=useState({
    username:"",
    password:"",
  })
  const toastifyOptions={
        position:'bottom-right',
        theme:"dark",
        pauseOnHover:true,
        autoClose:8000,
        draggable:true,
  }
  const handleSubmit= async (event) =>{
    event.preventDefault();
    if(handleValidation()){
      const {password,username}=values;
      const {data}= await axios.post(loginRoute,{
        username,
        password,
      });
      if(data.status==false){
        toast.error(data.msg,toastifyOptions);

      }
      if(data.status==true){
        localStorage.setItem("chat-app-user",JSON.stringify(data.user));
        navigate("/");
      }

      
    }
    
  }
  const handleValidation=()=>{
    const {password,username}=values;
    if(username===""){
      toast.error("Username required",
        toastifyOptions);
        return false;
    }
    else if(password===""){
      toast.error("Password is required",
        toastifyOptions);
        return false;
    }
    return true;
  }
  const handleChange=(event)=>{
    setValues({...values,[event.target.name]:event.target.value})
  }
  return (
    <>
      <FormContainer>
        <form onSubmit={(event)=>handleSubmit(event)}>
          <div className="brandName">
            <img src="\src\assets\logo.svg" alt="Logo" />
            <h1>ChatApp</h1>
          </div>
          <input
            type="text"
            placeholder='Username'
            name='username'
            onChange={(e)=>handleChange(e)}
            min="3"
          />
          <input
            type="password"
            placeholder='Password'
            name='password'
            onChange={(e)=>handleChange(e)}
          />
          <button type="submit">Login</button>
          <span>
            Don't have an account? 
            <Link to="/register">Register</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />

      
    </>
  )
}

const FormContainer=styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap:1rem;
  background-color: #131324;
  .brandName{
    display: flex;
    align-items: center;
    justify-content: center;
    gap:1rem;
    img{
      height: 5rem;
    }
    h1{
      color: white;
    }
  }
  form{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    background-color: #00000076;
    padding: 3rem 5rem;
    border-radius: 2rem;
    input{
      font-size: 1rem;
      padding:1rem;
      background: transparent;
      border-radius:0.4rem;
      border : 0.2px solid #4e0eff;
      color:white;
      width:100%;
      &:focus{
        border:0.1rem solid #997af0;
        outline: none;
      }
    }
      button{
        background-color: #997af0;
        border: none;
        padding: 1rem 2rem;
        color:white;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 1rem;
        transition: 0.5s ease-in-out;
        &:hover{
          background-color: #4e0eff;
        }
    }
    span{
      text-transform: uppercase;
      color:white;
      a{
        margin:1rem;
        text-decoration: none;
        font-weight: bold;
        color: #4e0eff;
      }
    }

  }
`

export default login