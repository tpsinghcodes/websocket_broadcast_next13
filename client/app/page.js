'use client'
import io from "socket.io-client" 
import { useEffect, useState } from "react"
const socket = io.connect("http://192.168.10.135:3001")

export default function Home() {

  const [message, setMessage] = useState("")
  const [recmsg, setRecmsg] = useState("")

  const submitMessage = (message)=>{
    socket.emit("UserMessage", { message });
  }
  useEffect(()=>{
    socket.on("resend",(data)=>{
      setRecmsg(data.message)
    })
  },[socket])
  return (
   <div className="bg-gray-200   p-8 flex flex-col items-center justify-center">
    <input className="mb-10" type="text" onChange={(e)=>(submitMessage(e.target.value))}/>
    <button className="bg-blue-800 p-4 text-white rounded-sm" onClick={submitMessage}>Submit</button>
    <div><p className="font-bold text-xl text-pink-700">{recmsg}</p></div>
   </div>
  )
}
