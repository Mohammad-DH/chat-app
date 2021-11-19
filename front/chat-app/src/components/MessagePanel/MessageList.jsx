import React, { useContext, useEffect } from "react";
import { root } from "../../context/API";

function MessageList() {
  const { Target, AllMessages } = useContext(root);
  let list = document.querySelector(".MessageList");

  useEffect(() => {
    if (list) {
      list.scroll(0, list.scrollHeight);
    } else {
      list = document.querySelector(".MessageList");
    }
  }, [AllMessages]);

  return (
    <div className="MessageList">
      {AllMessages && Target && AllMessages !== "no message"
        ? AllMessages.map((e) => {
            if (e.to === Target.username) {
              return <span className="MessageItem you">{e.message}</span>;
            } else if (e.by === Target.username) {
              return <span className="MessageItem target">{e.message}</span>;
            }
          })
        : ""}

      <style jsx>{`
        .MessageList {
          width: 100%;
          height: 92%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          overflow-y: auto;
        }
        .MessageItem {
          padding: 1rem;
          margin: 1rem;
        }
        .you {
          background-color: rgba(0, 89, 255, 0.8);
          color: white;
          align-self: flex-end;
          border: 2px solid rgb(255, 255, 255);
          border-radius: 0.5rem 0.5rem 0 0.5rem;
        }
        .target {
          background-color: rgba(223, 223, 223, 0.8);
          border: 2px solid rgb(0, 89, 255);
          border-radius: 0.5rem 0.5rem 0.5rem 0;
        }
      `}</style>
    </div>
  );
}

export default MessageList;
