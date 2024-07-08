import React from 'react'
import { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import {styled} from 'styled-components'
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
const Register = () => {
  const[values,setValues]=useState({
    username:"",
    email:"",
    password:"",
    confirmPassword:"",
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
      const {password,confirmPassword,username,email}=values;
      const {data}= await axios.post();
    }
    
  }
  const handleValidation=()=>{
    const {password,confirmPassword,username,email}=values;
    if(password!==confirmPassword){
      toast.error("The Password and Confirm Password Should be same.",
      toastifyOptions);
      return false;
    }
    else if(username.length<3){
      toast.error("Username should be greater 3.",
        toastifyOptions);
        return false;
    }
    else if(password.length<8){
      toast.error("Password length should be greater than or equal to 8.",
        toastifyOptions);
        return false;
    }
    else if(email.length===0){
      toast.error("Email is required",
        toastifyOptions);
        return false;
    }
    return true;
  }
  const handleChange=(event)=>{
    setValues({...values,[event.target.name]:event.target.value})
    console.log(`${event.target.name} : ${event.target.value}`);
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
            placeholder='username'
            name='username'
            onChange={(e)=>handleChange(e)}
          />
          <input
            type="email"
            placeholder='mail'
            name='email'
            onChange={(e)=>handleChange(e)}
          />
          <input
            type="password"
            placeholder='Password'
            name='password'
            onChange={(e)=>handleChange(e)}
          />
          <input
            type="password"
            placeholder='Confirm Password'
            name='confirmPassword'
            onChange={(e)=>handleChange(e)}
          />
          <button type="submit">Create a User</button>
          <span>
          Already have an account?
            <Link to="/login">Login</Link>
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

export default Register