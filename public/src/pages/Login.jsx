import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/logo.svg';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginRoute } from '../utils/APIRoutes';
import axios from 'axios';
 const Login = () => {
   const navigate=useNavigate();
   const [values,setValue]=useState({
    username:"",
    password:"",
   });
   const submitHandler=async(e)=>{
     console.log(values);
     e.preventDefault();
     const { username, password } = values;
     if(validHandl()){
        console.log(LoginRoute);
        const {data}=await axios.post(LoginRoute,{username, password });
        if(data.status===false){
          toast.error(data.msg,toastOptions);
        }
        if(data.status===true){
          localStorage.setItem('user',JSON.stringify(data.user));
          if(data.user.isProfImgSet===false)
            navigate('/setAvatar');
          else{
            navigate('/');
          }
        }
     }
   }
   const toastOptions={
    position :"bottom-right",
    autoClose:8000,
    pauseOnHover:true,
    draggable:true,
    theme:"dark" };

    useEffect(()=>{
        if(localStorage.getItem('user'))
           navigate('/');
    },[])

   const validHandl=()=>{
    const {password,username}=values;
    if(password === ""){
    
        toast.error(
          "password must be required.",
          toastOptions
        );
        return false;
    }
    else if (username.length===0) {
        toast.error(
          "Username must be required",
          toastOptions
        );
        return false;
      } 
      return true;

    }
   
   const updateHandl=(e)=>{
     setValue({...values,[e.target.name]:e.target.value})
   }
   return (
    <>
     <FormContainer>
        <form onSubmit={e=>{submitHandler(e)}}>
            <div className='brand'>
              <img src={logo} alt=''/>
              <h1>chrip</h1>
            </div>
            <input 
                type="text"
                placeholder='UserName'
                name='username'
                onChange={e=>updateHandl(e)}
                min="3"
            />
    
            <input 
                type="password"
                placeholder='Password'
                name='password'
                onChange={e=>updateHandl(e)}
            />
            <button type="submit">LOGIN</button>
            <span>Don't have an account ?<Link to='/register'>REGISTER</Link></span>
        </form> 
     </FormContainer>
     <ToastContainer />
     </>
   )
 }
 const FormContainer=styled.div`
 height:100vh;
 width:100vw;
 display:flex;
 flex-direction: column;
 justify-content:center;
 gap:1rem; 
 align-items:center;
 background-color:#131324;
 .brand{
    display:flex;
    align-items:center;
    gap:1rem;
    justify-content:center;
    img{
        height:5rem;
    }
    h1{
        color:white;
        text-transform:uppercase;
    }
 }
 form{
     display:flex;
     flex-direction:column;
     gap:2rem;
     background-color:#00000076; 
     border-radius:2rem;
     padding:3rem 5rem;
     input{
        background-color:transparent;
        padding :1rem;
        border:0.1rem solid #4e0eff;
        border-radius:0.4rem;
        color:white;
        width:100%;
        font-size:1rem;
        &:focus{
            border:0.1rem solid #997af0;
            outline:none;
        } 
     } 
     button{
        background-color:#997af0;
        color:white;
        padding:1rem 2rem;
        border:none;
        font-weight:bold;
        cursor:pointer;
        border-radius:0.4rem;
        font-size:1rem;
        text-transform:uppercase;
        &:hover{
            background-color:#4e0eff;
        }
     }
     span{
        color:white;
        a{
            color:#4e0eff;
            font-weight:bold;
            text-decoration:none;
        }
     }
 }
 `; 
 export default Login;