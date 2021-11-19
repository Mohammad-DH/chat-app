import React, { useContext } from "react";
import { root } from "../../context/API";

function Target() {
  const { Target } = useContext(root);

  return (
    <div className="Target">
      <span
        onClick={() => alert("coming in next version !!")}
        className="target-image"
      ></span>
      <div className="target-info">
        <h3 className="Target-username">{Target ? Target.username : ""}</h3>
        <h3>{Target ? Target.email : ""}</h3>
      </div>

      <style jsx>{`
        .Target {
          width: 30%;
          height: 100%;
          background-color: rgba(223, 223, 223, 0.8);
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .target-info {
          width: 100%;
          height: 15%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          line-height: 0.7rem;
        }
        .target-image {
          height: 20vh;
          width: 20vh;
          background-color: rgba(255, 255, 255, 0.7);
          margin-top: 5%;
          border-radius: 500vh;
        }
        .Target-username {
          font-size: 2rem;
        }
      `}</style>
    </div>
  );
}

export default Target;
