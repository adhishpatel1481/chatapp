import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/logo.svg';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerRoute } from '../utils/APIRoutes';
import axios from 'axios';
 const Register = () => {
   const navigate=useNavigate();
   const [values,setValue]=useState({
    username:"",
    email:"",
    password:"",
    cnfpassword:""
   });
   const submitHandler=async(e)=>{
     console.log(values);
     e.preventDefault();
     const { email, username, password } = values;
     if(validHandl()){
        console.log(registerRoute);
        const {data}=await axios.post(registerRoute,{ email, username, password });
        if(data.status===false){
          toast.error(data.msg,toastOptions);
        }
        if(data.status===true){
          localStorage.setItem('user',JSON.stringify(data.user));
          navigate('/setAvatar');
        }
     }
   }
   const toastOptions={
    position :"bottom-right",
    autoClose:8000,
    pauseOnHover:true,
    draggable:true,
    theme:"dark" };

   const validHandl=()=>{
    const {password,cnfpassword,username,email}=values;
    if(password !== cnfpassword){
    
        toast.error(
          "password and confirm password should be same.",
          toastOptions
        );
        return false;
    }
    else if (username.length < 3) {
        toast.error(
          "Username should be greater than 3 characters.",
          toastOptions
        );
        return false;
      } else if (password.length < 8) {
        toast.error(
          "Password should be equal or greater than 8 characters.",
          toastOptions
        );
        return false;
      } else if (email === "") {
        toast.error("Email is required.", toastOptions);
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
            />
            <input 
                type="email"
                placeholder='Email'
                name='email'
                onChange={e=>updateHandl(e)}
            />
            <input 
                type="password"
                placeholder='Password'
                name='password'
                onChange={e=>updateHandl(e)}
            />
            <input 
                type="password"
                placeholder='Confirm Password'
                name='cnfpassword'
                onChange={e=>updateHandl(e)}
            />
            <button type="submit">Create user</button>
            <span>Already have an account ?<Link to='/login'>LOGIN</Link></span>
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
 export default Register