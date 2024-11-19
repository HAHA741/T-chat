import React from "react";
import { useState, useEffect } from "react";

function ChatHeader() {
  const showAuth = () => {};
  return (
    <div className="chat-header">
      <h2>ChatGPT</h2>
      <div className="header-actions">
        <button>分享</button>
        <div className="avatar">W</div>
      </div>
    </div>
  );
}

export default ChatHeader;
