import React from "react";
import ContactsList from "./ContactPanel/ContactsList";
import User from "./ContactPanel/User";

function ContactPanel({ DATA }) {
  return (
    <div className="ContactPanel">
      {DATA ? <User data={DATA.myData} /> : ""}
      {DATA ? <ContactsList data={DATA.contacts} /> : ""}

      <span
        onClick={() => {
          window.localStorage.removeItem("Token");
          window.location.reload();
        }}
        className="Logout"
      >
        Log out
      </span>

      <style jsx>{`
        .ContactPanel {
          width: 20%;
          height: 95%;
          border-radius: 1rem;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          align-items: center;
        }
        .Logout {
          width: 95%;
          height: 5%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          background-color: rgba(78, 78, 78, 0.6);
          border: 1px solid rgb(149, 149, 149);
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all linear 0.3s;
          font-size: 1.2rem;
        }
        .Logout:hover {
          background-color: rgba(253, 60, 60, 0.6);
          border: 1px solid rgb(245, 29, 29);
        }
      `}</style>
    </div>
  );
}

export default ContactPanel;
