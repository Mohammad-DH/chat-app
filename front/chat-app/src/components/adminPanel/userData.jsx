import axios from "axios";
import React from "react";

function UserData({ data, name, password, reload }) {
  const del = () => {
    let params = new URLSearchParams();
    params.append("admin", name);
    params.append("password", password);
    params.append("target", data.username);
    axios.post("http://localhost:8000/deluser", params);
    reload();
  };

  return (
    <div className="data-box">
      <h6>_id : {data._id}</h6>
      <h6>email : {data.email}</h6>
      <label htmlFor="admin-users">contacts :</label>
      <div className="admin-users">
        {data.contacts.map((e) => {
          return <h6>{e}</h6>;
        })}
      </div>
      <h6 onClick={del} className="del-btn">
        Delete
      </h6>
      <style jsx>{`
        .data-box {
          width: 95%;
          height: 100%;
          font-size: 2.2rem;
        }
        .admin-users {
          width: fit-content;
          padding: 1% 5%;
          background-color: rgba(187, 186, 186, 0.4);
          border-radius: 10px;
        }
        .del-btn {
          width: 5vw;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgb(255, 255, 255);
          background-color: rgba(78, 78, 78, 0.6);
          border: 1px solid rgb(149, 149, 149);
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all linear 0.3s;
          font-size: 1.4rem;
          padding: 0.5rem 1rem;
        }
        .del-btn:hover {
          background-color: rgba(207, 5, 5, 0.6);
          border: 1px solid rgb(245, 29, 29);
        }
      `}</style>
    </div>
  );
}

export default UserData;
