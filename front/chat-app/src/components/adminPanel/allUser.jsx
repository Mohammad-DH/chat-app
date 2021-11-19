import React, { useContext } from "react";
import { data } from "../../context/admin";

function AllUser({ DATA }) {
  const { SETuser } = useContext(data);
  console.log(DATA);
  return (
    <div className="allUser">
      {DATA.map((e) => {
        return (
          <div
            onClick={() => {
              SETuser(e);
            }}
            className="user"
          >
            <h6>{e.username}</h6>
          </div>
        );
      })}

      <style jsx>{`
        .allUser {
          background-color: rgba(78, 78, 78, 0.6);
          border: 1px solid rgb(149, 149, 149);
          width: 20%;
          height: 100%;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .allUser-box {
          padding: 1rem;
          width: 90%;
          color: white;
        }
        .user {
          width: 80%;
          height: 2rem;
          border: 1px solid rgb(202, 202, 202);
          margin: 0.5rem 0;
          border-radius: 0.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0.5rem 1rem;
          font-size: 1.6rem;
          cursor: pointer;
        }

        .user:hover {
          background-color: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
}

export default AllUser;
