import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { useContext, useState, useEffect } from "react";
import {ScaleLoader} from "react-spinners";
function ChatWindow () {
    const {prompt, setPrompt, reply , setReply, currThreadId, prevChats, setPrevChats, setNewChat} = useContext(MyContext);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false); //for testing default should be false

    const getReply = async () => {
        setLoading(true);
        setNewChat(false);


        console.log("message", prompt, "threadId", currThreadId);
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: prompt,
                threadId: currThreadId 
            })
        };

        try{
            const response = await fetch("http://localhost:8080/api/chat", options);
            const res = await response.json();
            console.log(res);
            setReply(res.reply);
        }catch(err){
            console.log(err);
        }
        setLoading(false);
    }

    //Append nnew chats to prev chats
    useEffect(() => {
        if(prompt && reply) {
            setPrevChats(prevChats =>(
                [...prevChats, {
                    role: "user",
                    content: prompt
                },{
                    role: "assistant",
                    content: reply
                }]
            ))
        }

        setPrompt("");
    }, [reply]);

    const handleProfileClick = () => {
        setIsOpen(!isOpen);
    }
    return (
       <div className="ChatWindow">
            <div className="navbar">
                <span>Upgrade <i className="fa-solid fa-chevron-down"></i></span>
                <div className="userIcondiv" onClick={handleProfileClick}>
                    <span className="userIcon"><i className="fa-solid fa-user"></i></span>
                </div>
            </div>
            {
                isOpen &&
                <div className="dropDown">
                    <div className="dropDownItem">
                        <span>Settings</span>
                        <i class="fa-solid fa-gear"></i>
                    </div>
                    <div className="dropDownItem">
                        <span> My Profile </span>
                        <i class="fa-solid fa-id-badge"></i>
                    </div>
                    <div className="dropDownItem">
                        <span>Log Out</span>
                        <i class="fa-solid fa-arrow-right-from-bracket"></i>
                    </div>

                </div>
            }
            <Chat> </Chat>
            <ScaleLoader color="#fff" loading={loading}>

            </ScaleLoader>

            <div className="chatInput">
                <div className="inputBox">
                    <input placeholder="Ask anything."
                    value = {prompt}
                    onChange = {(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter'? getReply() : ''}> 
                   
                    </input>
                    <div id="submit" onClick={getReply}><i className="fa-solid fa-paper-plane"></i></div>
                </div>
                <p className="info">
                    F.R.I.D.A.Y. can make mistakes. You can Search in Saturday. Check important info.
                </p>
            </div>
       </div>
    )
}


export default ChatWindow;