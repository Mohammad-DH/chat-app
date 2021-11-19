import axios from "axios";
import React, { useContext, useState } from "react";
import { root } from "../../context/API";

function SearchBar() {
  const { SETsearch, token, SETAllContacts } = useContext(root);

  const [tab, settab] = useState("search");
  const [newcontact, setnewcontact] = useState();

  const SearchHandeler = (i) => {
    SETsearch(i);
  };

  const addNewContact = (e) => {
    const params = new URLSearchParams();
    params.append("email", e);
    axios
      .post("http://localhost:8000/newcontact", params, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (res) {
        if (res.status === 200) {
          setnewcontact("");
          axios
            .post(
              "http://localhost:8000/allcontacts",
              {},
              { headers: { Authorization: `Bearer ${token}` } }
            )
            .then((allcontacts) => {
              SETAllContacts(allcontacts.data);
              window.location.reload();
            });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const search = () => {
    return (
      <div className="search">
        <input
          onChange={(e) => SearchHandeler(e.target.value)}
          className="search-input"
          type="text"
        />
      </div>
    );
  };
  const add = () => {
    return (
      <div className="search">
        <input
          value={newcontact}
          onChange={(e) => setnewcontact(e.target.value)}
          className="search-input add-input"
          type="text"
        />
        <span onClick={() => addNewContact(newcontact)} className="add">
          ADD
        </span>
      </div>
    );
  };

  return (
    <div className="SearchBar">
      <div className="tabs">
        <img
          onClick={() => settab("add")}
          className={tab === "add" ? "active" : ""}
          src="./plus.svg"
          alt=""
        />
        <img
          onClick={() => settab("search")}
          className={tab === "search" ? "active" : ""}
          src="./search.svg"
          alt=""
        />
      </div>
      {tab === "search" ? search() : add()}
      <style jsx>{`
        .SearchBar {
          width: 100%;
          background-color: rgba(187, 187, 187, 0.3);
          padding: 1rem 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
        }
        .tabs {
          width: 40%;
          display: flex;
          direction: row;
          align-items: center;
          justify-content: space-evenly;
        }
        .tabs img {
          background-color: rgba(255, 255, 255, 0.5);
          border-radius: 0.5rem;
          width: 1.5rem;
          height: 1.5rem;
          padding: 0.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .active {
          background-color: rgba(255, 255, 255, 0.8) !important;
        }
        .search {
          width: 90%;
          padding-top: 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .search-input {
          width: 100%;
          height: 2rem;
          border: none;
          border-radius: 8px;
          outline: none;
          border: 1px solid rgb(44, 44, 44);
          font-size: 1.3rem;
          padding-left: 0.5rem;
        }
        .add-input {
          width: 70%;
        }
        .add {
          width: 15%;
          height: 2rem;
          text-align: center;
          padding: 0 0.5rem;
          border: 1px solid rgb(255, 255, 255);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          background-color: rgba(255, 255, 255, 0.1);
          color: white;
          cursor: pointer;
        }
        .add:hover {
          background-color: rgba(255, 255, 255, 0.4);
        }
      `}</style>
    </div>
  );
}

export default SearchBar;
