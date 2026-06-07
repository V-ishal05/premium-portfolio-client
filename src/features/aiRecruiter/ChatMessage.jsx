import React from "react";

function ChatMessage({ sender, text }) {
  return (
    <div className={`chat-message ${sender}`}>
      <div className="chat-bubble">{text}</div>
    </div>
  );
}

export default ChatMessage;