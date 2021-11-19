import axios from "axios";
import React, { useContext } from "react";
import { root } from "../../context/API";
import SearchBar from "./SearchBar";

function ContactsList({ data }) {
  const { SETTarget, search, token } = useContext(root);

  const del = (e) => {
    let params = new URLSearchParams();
    params.append("target", e.username);
    axios.post("http://localhost:8000/delcontact", params, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  return (
    <div className="ContactsList">
      <SearchBar />
      <div className="ContactsList-box">
        {search && data
          ? data.map((e) => {
              if (e.username.includes(search.toLowerCase())) {
                return (
                  <div onClick={() => SETTarget(e)} className="contactItem">
                    <span>{e.username}</span>
                    <img
                      onClick={() => del(e)}
                      className="del-btn"
                      src="./plus.svg"
                      alt=""
                    />
                  </div>
                );
              }
            })
          : data.map((e) => {
              return (
                <div onClick={() => SETTarget(e)} className="contactItem">
                  <span>{e.username}</span>
                  <img
                    onClick={() => del(e)}
                    className="del-btn"
                    src="./plus.svg"
                    alt=""
                  />
                </div>
              );
            })}
      </div>

      <style jsx>{`
        .ContactsList {
          background-color: rgba(78, 78, 78, 0.6);
          border: 1px solid rgb(149, 149, 149);
          width: 95%;
          height: 80%;
          border-radius: 1rem;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .ContactsList-box {
          padding: 1rem;
          width: 90%;
          color: white;
        }
        .contactItem {
          height: 2rem;
          border: 1px solid grey;
          margin: 0.5rem 0;
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.5rem 1rem;
          font-size: 1.4rem;
          cursor: pointer;
        }
        .contactItem span {
          cursor: pointer;
        }
        .contactItem:hover {
          background-color: rgba(255, 255, 255, 0.3);
        }
        .del-btn {
          width: 1.5rem;
          height: 1.5rem;
          transform: rotate(45deg);
          border-radius: 500rem;
          padding: 0.3rem;
          transition: all 0.2s linear;
          z-index: 50;
        }
        .del-btn:hover {
          background-color: rgba(255, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
}

export default ContactsList;
