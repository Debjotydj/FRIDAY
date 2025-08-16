
import './App.css'
import Sidebar from './Sidebar.jsx';
import ChatWindow from './ChatWindow.jsx';
import {MyContext} from './MyContext.jsx';
import { useState } from 'react';
import {v1 as uuidv1} from "uuid";

function App() {
  const [prompt, setPrompt] = useState("");
  const [reply,setReply] = useState(null);
  const [currThreadId, setCurrThreadId] = useState(uuidv1());
  const [prevChats, setPrevChats] = useState([]); //stores all prev/all chats of current Thread
  const [newChat, setNewChat] = useState(true); //always starts with a new chat
  const [allThreads, setAllThreads] = useState([]);

  const providerValues = {
    prompt, setPrompt,
    reply, setReply,
    currThreadId, setCurrThreadId,
    newChat, setNewChat,
    prevChats, setPrevChats,
    allThreads, setAllThreads
  };//passing down values from this 

  return (
    <div className='main'>
      <MyContext.Provider value={providerValues}>
       <Sidebar></Sidebar>
       <ChatWindow></ChatWindow>
       </MyContext.Provider>
    </div>
  )
}

export default App
