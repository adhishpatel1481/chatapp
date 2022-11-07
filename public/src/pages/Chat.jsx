import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUsersRoute,host } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import {io} from 'socket.io-client';

const Chat = () => {
  const socket =useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [selectedUser, setSelectedUser] = useState(undefined);
  
  useEffect(() => {
    if (localStorage.getItem("user")) {
      const checkUserLogged = async () => {
        console.warn("localStorage");
        setCurrentUser(await JSON.parse(localStorage.getItem("user")));
    
          // socket.current=io(host);
          // socket.current.emit("add-user",currentUser._id);
      };
      checkUserLogged();
    } else {
      navigate("/login");
    }
  }, []);
  useEffect(()=>{
    if(currentUser){
      socket.current=io(host);
      socket.current.emit("add-user",currentUser._id);
    }
  },[currentUser]);
  
  useEffect(() => {
    if (currentUser) {
      if (!currentUser.isProfImgSet) {
        navigate("/setAvatar");
      } else {
        const getContacts = async () => {
          const { data } = await axios.get(
            `${allUsersRoute}/${currentUser._id}`
          );
          setContacts([...data.users]);
          console.warn("desired",data);
        };
        getContacts();
      }
    }
  }, [currentUser]);
  const chatHandler = (chat) => {
    setSelectedUser(contacts[chat]);
  };
  return (
    <Container>
      <div className="container">
        {currentUser ? (
          <>
            {contacts.length ? (
              <Contacts
                contacts={contacts}
                currentUser={currentUser}
                chatHandler={chatHandler}
              />
            ) : null}
            {selectedUser === undefined ? (
              <Welcome currentUser={currentUser} />
            ) : (
              <ChatContainer currentUser={currentUser} selectedUser={selectedUser} socket={socket}/>
            )}
          </>
        ) : null}
      </div>
    </Container>
  );
};
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
export default Chat;
