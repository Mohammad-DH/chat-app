import React, { createContext, useEffect, useRef, useState } from "react";
// import socketio from "socket.io-client";

export const root = createContext();

function API({ children }) {
  let socket = useRef(null);
  // useEffect(() => {
  //   socket.current = socketio("http://localhost:8000");
  // }, []);

  // START Aythentication systeam ******************************************************

  const [token, settoken] = useState(null);
  const [state, setstate] = useState(false);

  const [search, setsearch] = useState();
  const [AllMessages, setAllMessages] = useState();
  const [AllContacts, setAllContacts] = useState();
  const [Target, setTarget] = useState(null);

  const SETTarget = (i) => {
    setTarget(i);
  };
  const SETAllContacts = (i) => {
    setAllContacts(i);
  };
  const SETAllMessages = (i) => {
    setAllMessages(i);
  };

  useEffect(() => {
    let tt = window.localStorage.getItem("Token");
    if (tt) {
      tt = tt.split(" ")[0];
      settoken(tt);
    }
  }, []);

  const SETtoken = (i) => {
    settoken(i);
    window.localStorage.setItem("Token", i);
  };
  const SETsearch = (i) => {
    setsearch(i);
  };

  useEffect(() => {
    if (token) {
      if (token.length > 0) {
        setstate(true);
      } else {
        setstate(false);
      }
    }
  }, [token]);
  // END Aythentication systeam ******************************************************

  return (
    <div>
      <root.Provider
        value={{
          state,
          token,
          SETtoken,
          Target,
          SETTarget,
          SETsearch,
          search,
          SETAllContacts,
          AllContacts,
          SETAllMessages,
          AllMessages,
          socket,
        }}
      >
        {children}
      </root.Provider>
    </div>
  );
}

export default API;
