import React from "react";

function User({ data }) {
  return (
    <div className="user">
      <span
        onClick={() => alert("coming in next version !!")}
        className="user-image"
      ></span>
      <span>{data ? data[0].username : ""}</span>

      <style jsx>{`
        .user {
          width: calc(95% - 2rem);
          height: 5%;
          background-color: rgba(78, 78, 78, 0.6);
          border: 1px solid rgb(149, 149, 149);
          display: flex;
          align-items: center;
          justify-content: flex-start;
          font-size: 1.8rem;
          border-radius: 1rem;
          padding: 1rem;
          color: white;
        }
        .user-image {
          height: 5vh;
          width: 5vh;
          background-color: rgba(255, 255, 255, 0.7);
          border-radius: 500vh;
          margin-right: 5%;
        }
      `}</style>
    </div>
  );
}

export default User;
