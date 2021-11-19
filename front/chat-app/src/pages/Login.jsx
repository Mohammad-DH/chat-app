import axios from "axios";
import React, { useContext, useState } from "react";
import { root } from "../context/API";
import { Redirect } from "react-router-dom";

function Login() {
  const { SETtoken } = useContext(root);

  const [redirect, setredirect] = useState(false);
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");

  const LogIn = () => {
    const params = new URLSearchParams();
    params.append("username", username);
    params.append("email", email);
    axios
      .post("http://localhost:8000/login", params)
      .then(function (res) {
        if (res.status === 200) {
          SETtoken(res.data.token);
          setredirect(true);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  if (redirect === true) {
    return <Redirect to="/" />;
  } else {
    return (
      <div className="loginPage">
        <div className="logintext-box">
          <div className="logintext">
            <span className="Welcome">Welcome</span>
          </div>
        </div>

        <div className="login-form">
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
          <span className="login-btn" onClick={LogIn}>
            log in
          </span>
        </div>
        <style jsx>{`
          .loginPage {
            width: 100%;
            height: 100vh;
            display: flex;
            align-items: center;
            background-color: #b8c6db;
            background-image: linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%);
          }
          .logintext-box {
            width: 70%;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .logintext {
            width: 90%;
            height: 90%;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .Welcome {
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
          .login-form {
            width: 30%;
            height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          .login-form input {
            width: 90%;
            height: 3rem;
            margin: 1rem 0;
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 100vw;
            font-size: 1.8rem;
            outline: rgba(62, 113, 253, 0.4) 2px solid;
          }
          .login-btn {
            background-color: rgb(128, 253, 170);
            font-size: 2rem;
            margin-top: 5%;
            padding: 1rem 3rem;
            border-radius: 500vh;
            border: 3px solid rgba(62, 113, 253, 0.4);
            cursor: pointer;
            transition: all 0.2s linear;
            display: flex;
            align-items: center;
            justify-content: center;
            text-transform: uppercase;
          }
          .login-btn:hover {
            background-color: rgb(0, 255, 85);
            border: 3px solid rgba(62, 113, 253, 0.6);
          }
        `}</style>
      </div>
    );
  }
}

export default Login;
