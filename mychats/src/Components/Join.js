import React, { useState } from 'react'
import './join.css'
import logo from './img/logo.png'
import { NavLink } from 'react-router-dom'


let user;
const userSend=()=>{
     user=document.getElementById('personName').value;
    document.getElementById('personName').value="";
    
}


const Join = () => {

const [name, setName] = useState("");


    return (
       

        <>
            <div className="join-page">
                <div className="join-container">
                    <img src={logo} alt="logo" />
                    <h1>My Chats</h1>
                    <input type="text" id='personName'  placeholder='Your Name'  onChange={(e)=>setName(e.target.value) } onKeyPress={(e)=>e.key==='Enter'?userSend():null} />
                    <NavLink onClick={(e)=>!name ?e.preventDefault():null} to='/chating'><button onClick={userSend}  id='login' >Login</button> </NavLink>
                </div>

            </div>
        </>
    )
}

export default Join
export {user}