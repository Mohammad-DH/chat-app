import React, { useContext, useState } from "react";
import { root } from "../../context/API";
import socket from "../socket/socket";

function MessageInput() {
  const { token, Target } = useContext(root);
  const [input, setinput] = useState();

  const send = () => {
    if (Target && input) {
      let data = { target: Target, input: input };
      socket.emit("resive", { token, data })
      setinput("")
    }
  };
  return (
    <div className="MessageInput">
      <textarea value={input} onChange={(e) => setinput(e.target.value)} type="text" />
      <img onClick={send} src="./send.png" alt="" />

      <style jsx>{`
        .MessageInput {
          width: 100%;
          height: 8%;
          display: flex;
          align-items: center;
          justify-content: space-evenly;
        }
        .MessageInput textarea {
          width: 90%;
          height: 40%;
          border-radius: 500vh;
          padding: 0.5rem;
          font-size: 1.4rem;
          resize: none;
          scrollbar-width: 0px;
        }

        textarea::-webkit-scrollbar {
          display: none;
        }
        .MessageInput img {
          width: 2.6vw;
          height: 2.6vw;
          cursor: pointer;
          background-color: white;
          border-radius: 500vh;
        }
      `}</style>
    </div>
  );
}

export default MessageInput;
