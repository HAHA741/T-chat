import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatHeader from "./components/ChatHeader";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, { text: message }]);
  };

  return (
    <div className="app">
      <Sidebar />
      <div className="chat-container">
        <ChatHeader />
        <ChatWindow messages={messages} />
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

export default App;
