import React, { useState } from "react";
import "./card.scss";

const Card = ({ task, onToggleStatus,deleteTask }) => {
  const [curStatus, setCurStatus] = useState("");
  const timername = () => {
    if (task.tstatus) {
      setCurStatus("todo");
    } else
      setTimeout(() => {
        setCurStatus("todo-done");
      }, 2000);
  };
  return (
    <div
      className={"card " + curStatus}
      style={{
        backgroundColor: `${
          task.tstatus ? "rgb(33,128,14)" : "rgb(190,190,190)"
        }`,
        color: `${task.tstatus ? "white" : "black"}`,
      }}
    >
      <div className="name">{task.tname}</div>
      <div className="buttons">
      <button
        className="status"
        onClick={() => {
          onToggleStatus(task);
          timername();
        }}
      >
        {task.tstatus ? "🔄" : "✅"}
      </button>
      {!task.tstatus?<></>:<button className="delete" onClick={()=>deleteTask(task.id)}>❌</button>}
      </div>
    </div>
  );
};

export default Card;
