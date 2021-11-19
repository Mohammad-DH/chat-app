import React from "react";
import MessageInput from "./MessagePanel/MessageInput";
import MessageList from "./MessagePanel/MessageList";
import Target from "./MessagePanel/Target";

function MessagePanel() {
  return (
    <div className="MessagePanel">
      <Target />

      <div className="message-sec">
        <MessageList />
        <MessageInput />
      </div>
      <style jsx>{`
        .MessagePanel {
          width: 75%;
          height: 92%;
          background-color: rgba(78, 78, 78, 0.6);
          display: flex;
          flex-direction: row-reverse;
          align-items: center;
          border: 1px solid rgb(149, 149, 149);
          border-radius: 1rem;
          overflow: hidden;
        }
        .message-sec {
          width: 70%;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </div>
  );
}

export default MessagePanel;
