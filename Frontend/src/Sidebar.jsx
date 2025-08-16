import "./Sidebar.css";
import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext.jsx";
import { v1 as uuidv1 } from "uuid";

function Sidebar () {
    const{allThreads, setAllThreads, currThreadId, setNewChat, setPrompt,  setReply,  setCurrThreadId, setPrevChats} = useContext(MyContext);

    const getAllThreads = async () => {

        try{
            const response = await fetch("http://localhost:8080/api/thread");
            const res = await response.json();
            const filteredData = res.map(thread => ({threadId : thread.threadId, title: thread.title}));
           // console.log(filteredData);
            setAllThreads(filteredData);
            //threadId , title
        }catch(err){
            console.log(err);
        }
    };
    useEffect(() =>{
        getAllThreads();
    }, [currThreadId])

    const createNewChat = () => {
        setNewChat(true);
        setPrompt("");
        setReply(null);
        setCurrThreadId(uuidv1());
        setPrevChats([]);
    }

     const changeThread = async (newThreadId) => {
        setCurrThreadId(newThreadId);

        try {
            const response = await fetch(`http://localhost:8080/api/thread/${newThreadId}`);
            const res = await response.json();
            console.log(res);
            setPrevChats(res);
            setNewChat(false);
            setReply(null);
        } catch(err) {
            console.log(err);
        }
    }   

    const deleteThread = async (threadId) => {
        try{
            const response = await fetch(`http://localhost:8080/api/thread/${threadId}`, {method: "DELETE"});
            const res = await response.json();
            console.log(res);

            //updated threads need to be rerender
            setAllThreads(prev => prev.filter(thread =>thread.threadId != threadId));

            if(threadId === currThreadId){
                createNewChat();
            }
        }catch(err){
            console.log(err)
        }
    }

    return (
       <section className="Sidebar">
           {/* { New Chat button }  */}
           <button onClick={createNewChat}>
                <img src="src/assets/img.jpg" alt = "FRIDAY logo" className="logo"></img>
                <span className="name">F.R.I.D.A.Y.</span>
                {/* <img src="src/assets/img2.jpg" alt = "FRIDAY logo name" className="logo2"></img> */}
                <span><i className="fa-solid fa-pen-to-square"></i></span>
           </button>

           {/* { History }  */}

           <ul className="History">
              {
                allThreads?.map((thread, idx) => (
                    <li key={idx} 
                    onClick={(e) => changeThread(thread.threadId)}
                    className={thread.threadId === currThreadId ? "highlighted" : " "}
                    >
                        {thread.title}
                        <i className="fa-solid fa-trash-can"
                            onClick={(e) =>{
                                e.stopPropagation(); //stop event bubbling when we are cling on delete we are also clicking on the thread  button 
                                deleteThread(thread.threadId);
                            }}
                        
                        ></i>
                    </li>
                ))
              }
           </ul>

           {/* { Sign }  */}
            <div className="sign"> 
                <p> By DEBJOTY MITRA &hearts; </p>
           </div>
        </section>
    )
}


export default Sidebar;