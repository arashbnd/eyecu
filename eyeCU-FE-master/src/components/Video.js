import React, {useEffect, useState} from 'react'
import {io} from "socket.io-client";

export default function Video() {
  const BASEENDPOINT = "http://0.0.0.0:5001/";
  const [img, setImg] = useState('');
  const [socket, setSocket] = useState();


  useEffect(()=>{
    const imgListener = (message) =>{
      setImg(message.image);
    }

    const newSocket = io(BASEENDPOINT + 'web', {
        transports:["polling","websocket"]
    });
    newSocket.on('connect', ()=>{
        console.log("connected to socket")
        setSocket(newSocket);
    })
    newSocket.on('server2web', imgListener)
    return ()=>{
        newSocket.disconnect();
    }
  }, [])
  return (
    <div>
      {socket ? 
      <img src={img} width="100%" className="feature-img" id="displayImg"/>
        :
      <img style={{border:"5px solid black" }} src={"/unavailable.png"}/>
      }
      
    </div>
  )
}
