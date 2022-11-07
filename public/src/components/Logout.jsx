import React from "react";
import styled from "styled-components";
import axios from "axios";
import { BiPowerOff } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
const Logout = () => {
  const navigate = useNavigate();
  const clickHandl = async () => {
    localStorage.clear();
    navigate('/login');
  };
  return (
    <Button onClick={clickHandl}>
      <BiPowerOff />
    </Button>
  );
};
const Button=styled.button`
  display:flex;
  justify-content:center;
  align-items:center;
  padding:0.5rem;
  border-radius:0.5rem;
  background-color:red;
  border:none;
  cursor:pointer;
  svg{
    font-size:1.3rem;
    color:#ebe7ff;
  }
`;
export default Logout;
