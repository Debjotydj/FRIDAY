import "./Chat.css";
import { useContext, useState, useEffect } from "react";
import { MyContext } from "./MyContext";

//react-Markdown
import ReactMarkdown from "react-markdown";
//rehype-highlight
import rehypehighlight from "rehype-highlight";
import"highlight.js/styles/github-dark.css";


function Chat () {
    const {newChat, prevChats, reply} = useContext(MyContext);
    const [latestReply, setLatestReply] = useState(null);

    useEffect(() =>{
        if(reply === null){
            setLatestReply(null);//loading the prev chats
            return;
        }
        //latest reply gets seperated  => typing effect
        if(!prevChats?.length) return;

        const content = reply.split(" ");//recognises the spaces and splits the word

        let idx = 0;
        const interval = setInterval(() => {
            setLatestReply(content.slice(0, idx+1).join(" "));

            idx++;
            if(idx >= content.length) clearInterval(interval);            
        }, 40);

        return () => clearInterval(interval);

    },[prevChats, reply])
    return (
        <>
            {newChat && <h1>Start a new Chat!</h1>}
            <div className="chats">
                {
                    prevChats?.slice(0, -1).map((chat,idx) =>
                        <div className={chat.role === "user"? "userDiv":"gptDiv"} key={idx}>
                            {
                                chat.role === "user"?
                                <p className="userMessage">{chat.content}</p> :
                               <ReactMarkdown rehypePlugins={[rehypehighlight]}>{chat.content}</ReactMarkdown>
                            }

                        </div>
                    
                    )
                }
                {
                    prevChats.length > 0 && latestReply !==null &&
                    <div className="gptDiv" key={"typing"}>
                        <ReactMarkdown rehypePlugins={[rehypehighlight]}>{latestReply}</ReactMarkdown>
                    </div>
                } 
                {
                    prevChats.length > 0 && latestReply === null &&
                    <div className="gptDiv" key={"typing"} >
                        <ReactMarkdown rehypePlugins={[rehypehighlight]}>{prevChats[prevChats.length-1].content}</ReactMarkdown>
                    </div>
                } 
            </div>
            
        </>
    )
}


export default Chat;