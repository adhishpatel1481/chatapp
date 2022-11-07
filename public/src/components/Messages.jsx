import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

const Messages = ({messages,currentUser,scrollRef}) => {
  return (
    <Container>
      <div className='messages'>
       { messages.map((message)=>{
          return (
              <div ref={scrollRef} >
                <div className={`message ${message.fromSelf ?"sended":"received"}`}>
                  <div className='content'>
                  <p>{message.message}</p>
                  </div>
                </div>
              </div>
          )
        })
       }
       </div>
    </Container>
  )
}
const Container=styled.div`
   overflow:hidden;
  .messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;
export default Messages