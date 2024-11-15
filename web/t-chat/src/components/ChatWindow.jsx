import React, { useEffect, useRef } from "react";

function ChatWindow({ messages }) {
  const chatRef = useRef();

  useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight; // 自动滚动到最新消息
  }, [messages]);

  return (
    <div className="chat-window" ref={chatRef}>
      {messages.map((msg, index) => (
        <div key={index} className="message">
          {msg.text}
        </div>
      ))}
    </div>
  );
}

export default ChatWindow;
