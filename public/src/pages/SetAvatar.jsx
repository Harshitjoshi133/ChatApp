import React from 'react'
import { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {styled} from 'styled-components'
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import loader from '../assets/loader.gif';
import { Buffer } from 'buffer';
import { SetAvatarRoute } from '../utils/APIroutes'
const SetAvatar = () => {
    const api="https://api.dicebear.com/9.x/adventurer/svg?seed=";
    const navigation=useNavigate();
    const [avatar,setAvatar]=useState([]);
    const[loading,isLoading]=useState(true);
    const [selectedAvatar,setSelectedAvatar]=useState(undefined);
    const toastifyOptions={
        position:'bottom-right',
        theme:"dark",
        pauseOnHover:true,
        autoClose:8000,
        draggable:true,
    }
    const seed=["Cookie","Midnight","Tinkerbell","Ginger"];
    const setProfilePicture=()=>{
        if(selectedAvatar===undefined){
            toast.error("Please Select the Avatar",toastifyOptions);
        }
    };
    useEffect(()=>{
        const fetchAvatars = async () => {
            const data = [];
            for (let i = 0; i < 4; i++) {
                const response=await axios.get(`${api}${seed[i]}`);

                console.log(`${response.request.responseURL} \n`);
                data.push(response.request.responseURL);
            }
            setAvatar(data);
            isLoading(false);
        };

        fetchAvatars();
    },[]);

  return (
    <>
        {
            loading?<Container>
                <img src={loader} alt="loader" className='Loader' />
            </Container>:(
                        <Container>
                        <div className="titleContainer">
                            <h1>Set Your Avatar</h1>
                        </div>
                        <div className="avatars">
                            {
                                avatar.map((avatarele,index)=>{
                                    return (
                                        <div 
                                        key={index}
                                        className={`avatar ${selectedAvatar===index ?"selected":""}`}>
                                            <img src={`${avatarele}`} alt={`${avatarele}`}
                                            onClick={()=>setSelectedAvatar(index)}
                                            />
                                        </div>
                                    )
                                })          
                            }
                        </div>
                        <button className='submit-btn' onClick={setProfilePicture}>Set profile picture</button>
                    </Container>
            )
        }

        <ToastContainer/>
    </>
    
  )
}

const Container=styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #131224;
    height: 100vh;
    width:100vw;
    flex-direction: column;
    gap:3rem;
    .loader{
        max-inline-size: 100%;
    }
    .titleContainer{
        h1{
            color:white;
        }
    }
    .avatars{
        display: flex;
        gap:2rem;
        .avatar{
            padding: 0%.4;
            border: 0.4rem solid transparent;
            border-radius: 5rem;
            display: flex;
            justify-content: center;
            align-items:center;
            transition: 0.5s ease-in-out;
            img{
                height: 6rem;
            }
            

        }
        .selected{
                border: 0.4rem solid #4e0eff;

        }

    }
    .submit-btn{
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
`
export default SetAvatar