import axios from "axios";
import React, { useContext, useState } from "react";
import AllUser from "../components/adminPanel/allUser";
import UserData from "../components/adminPanel/userData";
import { data } from "../context/admin";

function AdminPanel() {
  const { user } = useContext(data);

  const [name, setname] = useState();
  const [password, setpassword] = useState();
  const [DATA, setDATA] = useState();
  console.log("D : " + DATA);

  const send = () => {
    let params = new URLSearchParams();
    params.append("admin", name);
    params.append("password", password);
    axios.post("http://localhost:8000/admin", params).then((res) => {
      setDATA(res.data);
      if (DATA === "no user") {
        alert("no user to show creat a user first");
      }
    });
  };

  return (
    <div className="AdminPanel">
      {DATA && DATA !== "no user" ? (
        <>
          <AllUser DATA={DATA} />
          <div className="data">
            {user ? (
              <UserData
                reload={send}
                data={user}
                name={name}
                password={password}
              />
            ) : (
              ""
            )}
          </div>
        </>
      ) : (
        <div className="adminLogin">
          <div className="admin-box">
            <span className="admin">admin</span>
          </div>
          <div className="admin-form">
            <input
              onChange={(e) => setname(e.target.value)}
              type="text"
              placeholder="name"
            />
            <input
              onChange={(e) => setpassword(e.target.value)}
              type="password"
              placeholder="password"
            />
            <h3 onClick={send}>LOG IN</h3>
          </div>
        </div>
      )}

      <style jsx>{`
        .AdminPanel {
          width: 100%;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: space-evenly;
          font-size: 1.6rem;
          background-color: #b8c6db;
          background-image: linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%);
          overflow: hidden;
        }
        .adminLogin {
          width: 100%;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .admin-box {
          width: 70%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .admin {
          pointer-events: none;
          text-transform: uppercase;
          font-family: verdana;
          font-size: 11em;
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
        .admin-form {
          width: 30%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .admin-form input {
          width: 90%;
          height: 3rem;
          margin: 1rem 0;
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 100vw;
          font-size: 1.8rem;
          outline: rgba(62, 113, 253, 0.4) 2px solid;
        }
        .admin-form h3 {
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
        .admin-form h3:hover {
          background-color: rgb(0, 255, 85);
          border: 3px solid rgba(62, 113, 253, 0.6);
        }
        .data {
          width: 70%;
          height: 90%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 2rem;
          border: 2px solid black;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}

export default AdminPanel;
