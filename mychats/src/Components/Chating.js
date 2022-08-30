import React, { useEffect, useState } from 'react'
import './chating.css'
import socketio from 'socket.io-client'
import { user } from './Join'
import sends from './img/send.png'
import head from './img/head.png'
import closeIcon from './img/close.png'
import Message from './Message'
import ReactScrollToBottom from 'react-scroll-to-bottom'


let socket;
const ENDPOINT = 'https://demo-my-chat-application.herokuapp.com/';

const Chating = () => {
  const [id, setId] = useState("");
  const [messages, setMessages] = useState([]);

  const send = () => {
    const message = document.getElementById('write-messages').value;
    socket.emit('message', { message, id });
    document.getElementById('write-messages').value = "";
  }
  console.log(messages);

  useEffect(() => {
    socket = socketio(ENDPOINT, { transports: ['websocket'] });

    socket.on('connect', () => {
      // alert('Connected');
      setId(socket.id)
    })


    console.log(socket);


    socket.emit('joined', { user })


    //emit=send data
    //on=receive data
    //you only see welcome wish 
    socket.on('welcome', (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    })
    //when someone is joined it show joined message
    socket.on('userJoined', (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    })

    ////user left msg recevied
    socket.on('leave', (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    })

    return () => {
      socket.emit('disconnected');
      socket.off();
    }
  }, [])

  //another effect for message

  useEffect(() => {
    socket.on('sendMessage', (data) => {
      setMessages([...messages, data]);
      console.log(data.user,data.message,data.id );
    })

    return () => {
      socket.off();

    }

  }, [messages])

  return (
    <>
      <div className="chating-page">
        <div className="chating-container">
          <div className="header"> <h2><img src={head} alt="" />  My Chats..</h2><a href='/'><img className='closeIcon' src={closeIcon} alt="close" /> </a>  </div>
          <ReactScrollToBottom className="chating-box">
            {messages.map((items, index) => <Message  user={items.id === id ? '' : items.user} msgs={items.message} cls={items.id === id ? 'right' : 'left'} />)}
          </ReactScrollToBottom>
          <div className="msg-box">
            <input type="text" id='write-messages' onKeyPress={(e) => e.key === 'Enter' ? send() : null} />
            <button onClick={send} className='send-btn'><img src={sends} alt="send-icon" /> </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Chating