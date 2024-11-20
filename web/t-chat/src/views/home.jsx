import React, { useState,useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import ChatHeader from "@/components/ChatHeader";
import ChatWindow from "@/components/ChatWindow";
import MessageInput from "@/components/MessageInput";
import AuthModal from "@/components/AuthModal";
import "@/App.css";
import api from "@/api/index.js";


function App() {
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
  };
  useEffect(()=>{
    if(!localStorage.getItem('token')){
        setIsOpen(true)
    }

  },[])
  function comResponse(val) {
    let _val = JSON.parse(val);
    setMessages((pre) => {
      // 创建新数组，避免直接修改原数组
      const newMessages = JSON.parse(JSON.stringify(pre));

      // 修改新数组中最后一项的 text
      newMessages[newMessages.length - 1] = {
        ...newMessages[newMessages.length - 1], // 保证对象的不可变性
        text:
          newMessages[newMessages.length - 1].text +
          _val.choices[0].delta.content,
      };

      // 返回新的数组
      return newMessages;
    });
  }

  const handleSendMessage = async (message) => {
    let params = {
      prompt: message,
    };

    setMessages((prevMessages) => [...prevMessages, { text: message }]);
    setMessages((prevMessages) => [...prevMessages, { text: "" }]);
    let res = await api.communication(params, comResponse);
  };

  return (
   
          <div className="app">
      <Sidebar />
      <div className="chat-container">
        <ChatHeader />
        <ChatWindow messages={messages} />
        <MessageInput onSendMessage={handleSendMessage} />
        <AuthModal isOpen={isOpen} onClose={onClose} />
      </div>
    </div>

    

  );
}

export default App;
