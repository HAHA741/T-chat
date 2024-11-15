import React, { useState } from "react";

function MessageInput({ onSendMessage }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="message-input">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="输入消息..."
      />
      <button onClick={handleSend}>发送</button>
    </div>
  );
}

export default MessageInput;
