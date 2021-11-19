import axios from "axios";
import React, { useContext, useEffect } from "react";
import ContactPanel from "../components/ContactPanel";
import MessagePanel from "../components/MessagePanel";
import socket from "../components/socket/socket";
import { root } from "../context/API";

function Home() {
  const { token, SETAllContacts, AllContacts, SETAllMessages } =
    useContext(root);

  useEffect(() => {
    const url = "http://localhost:8000/allmessages";
    const url2 = "http://localhost:8000/allcontacts";

    axios
      .all([
        axios.post(url, {}, { headers: { Authorization: `Bearer ${token}` } }),
        axios.post(url2, {}, { headers: { Authorization: `Bearer ${token}` } }),
      ])
      .then(
        axios.spread((allmessages, allcontacts) => {
          SETAllMessages(allmessages.data);
          SETAllContacts(allcontacts.data);
        })
      );
  }, [token]);

  socket.on("getToken", (list) => {
    console.log("message " + list);
    socket.emit("token", token);
  });

  socket.on("all", (list) => {
    console.log(list.length);
    SETAllMessages(list);
  });

  return (
    <div className="home">
      <ContactPanel DATA={AllContacts} />
      <MessagePanel />

      <style jsx>{`
        .home {
          width: 100%;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: space-evenly;
          background-color: #272626;
        }
      `}</style>
    </div>
  );
}

export default Home;
