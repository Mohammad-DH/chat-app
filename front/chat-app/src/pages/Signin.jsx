import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

function Signin() {
  const [username, setusername] = useState();
  const [email, setemail] = useState();
  const [redirect, setredirect] = useState(false);

  const send = () => {
    const params = new URLSearchParams();
    params.append("username", username);
    params.append("email", email);
    axios.post("http://localhost:8000/signin", params).then((res) => {
      if (res.status === 200) {
        setredirect(true);
      }
    });
  };
  if (redirect === true) {
    return <Redirect to="/login" />;
  } else {
    return (
      <div className="signinPage">
        <div className="signintext-box">
          <div className="signintext">
            <span className="join-us">join us</span>
          </div>
        </div>

        <div className="signin-form">
          <input
            onChange={(e) => setusername(e.target.value)}
            placeholder="username"
            type="text"
          />
          <input
            onChange={(e) => setemail(e.target.value)}
            placeholder="email"
            type="text"
          />
          <span className="signin-btn" onClick={send}>
            sign in
          </span>
        </div>
        <style jsx>{`
          .signinPage {
            width: 100%;
            height: 100vh;
            display: flex;
            align-items: center;
            background-color: #b8c6db;
            background-image: linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%);
          }
          .signintext-box {
            width: 70%;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .signintext {
            width: 90%;
            height: 90%;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .join-us {
            pointer-events: none;
            text-transform: uppercase;
            font-family: verdana;
            font-size: 12em;
            font-weight: 700;
            color: #f5f5f5;
            text-shadow: 1px 1px 1px #919191, 1px 2px 1px #919191,
              1px 3px 1px #919191, 1px 4px 1px #919191, 1px 5px 1px #919191,
              1px 6px 1px #919191, 1px 7px 1px #919191, 1px 8px 1px #919191,
              1px 9px 1px #919191, 1px 10px 1px #919191,
              1px 18px 6px rgba(16, 16, 16, 0.4),
              1px 22px 10px rgba(16, 16, 16, 0.2),
              1px 25px 35px rgba(16, 16, 16, 0.2),
              1px 30px 60px rgba(16, 16, 16, 0.4);
          }
          .signin-form {
            width: 30%;
            height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          .signin-form input {
            width: 90%;
            height: 3rem;
            margin: 1rem 0;
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 100vw;
            font-size: 1.8rem;
          }
          .signin-btn {
            background-color: rgba(93, 228, 15, 0.8);
            font-size: 2rem;
            margin-top: 5%;
            padding: 1rem 3rem;
            border-radius: 500vh;
            border: 3px solid rgb(151, 151, 151);
            cursor: pointer;
            transition: all 0.2s linear;
            display: flex;
            align-items: center;
            justify-content: center;
            text-transform: uppercase;
          }
          .signin-btn:hover {
            background-color: rgba(93, 228, 15, 1);
            border: green 3px solid;
          }
        `}</style>
      </div>
    );
  }
}

export default Signin;
