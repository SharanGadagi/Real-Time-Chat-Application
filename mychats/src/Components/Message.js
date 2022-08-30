import React from 'react'
import './Message.css'

const Message = ({user,msgs,cls}) => {
    if(user){
        return (
            <div className={`inside-msg  ${cls}`}>
              {`${user}: ${msgs}`}
            </div>
          )   
    }
    else{
        return (
            <div className={`inside-msg  ${cls}`}>
              {`You: ${msgs}`}
            </div>
          )
    }
 
}

export default Message
