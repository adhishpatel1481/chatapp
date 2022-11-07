import React, { useEffect, useState } from "react";
import styled from "styled-components";
import logo from "../assets/logo.svg";
const Contacts = ({ contacts, currentUser,chatHandler }) => {
  const [currentUserImg, setCurrentUserImg] = useState(undefined);
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.username);
      setCurrentUserImg(currentUser.profImg);
    }
  }, [currentUser]);
  const currSelected=(index)=>{
    setCurrentSelected(index);
    chatHandler(index);
  }
  return (
    <Container>
      <div className="brand">
        <img src={logo} alt="logo" />
        <h3>chrip</h3>
      </div>
      <div className="contacts">
        {contacts.map((contact, index) => {
          return (
            <div
              key={index}
              className={`contact ${
                currentSelected === index ? "selected" : ""
              }`}
              onClick={()=>{currSelected(index)} }
            >
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${contact.profImg}`}
                  alt="avatar"
                />
              </div>
              <div className="username">
                {" "}
                <h3>{contact.username}</h3>
              </div>
            </div>
          );
        })}
      </div>
      <div className="current-user">
        <div className="avatar">
          <img
            src={`data:image/svg+xml;base64,${currentUser.profImg}`}
            alt="avatar"
          />
        </div>
        <div className="username">
          {" "}
          <h2>{currentUser.username}</h2>
        </div>
      </div>
    </Container>
  );
};
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #000420;
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
    dispaly: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      display: flex;
      align-items: center;
      transition: 0.5s ease-in-out;
      background-color: #ffffff39;
      min-height: 5rem;
      cursor: pointer;
      border-radius: 0.2rem;
      padding: 0.4rem;
      gap: 1rem;
      margin: 0.4rem 0rem;
      width: 90%;
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
    }
    .selected {
      background-color: #9186f3;
    }
  }
  .current-user {
    display: flex;
    align-items: center;
    background-color: #0d0d30;
    justify-content: center;
    gap: 2rem;
    width: 90%;
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
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
export default Contacts;
