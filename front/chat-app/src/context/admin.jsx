import React, { createContext, useState } from "react";
// import socketio from "socket.io-client";

export const data = createContext();

function Admin({ children }) {
  const [allUsers, setallUsers] = useState("");
  const [user, setuser] = useState("");

  const SETallUsers = (i) => {
    setallUsers(i);
  };
  const SETuser = (i) => {
    setuser(i);
  };

  return (
    <div>
      <data.Provider value={{ allUsers, SETallUsers, SETuser, user }}>
        {children}
      </data.Provider>
    </div>
  );
}

export default Admin;
