import React, { useEffect, useRef, useState } from "react";
import "./task.scss";
import Card from "../components/Card";
import axios from "axios";

const Task = () => {
  const taskname = useRef("");
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/tasks')
      .then(response => setTaskList(response.data))
      .catch(error => console.error('Error:', error));
  }, []);

  const submitTask = () => {
    axios.post('http://localhost:8080/api/v1/tasks/add',{tname: taskname.current.value})
      .then(response => setTaskList([
        ...taskList,
        response.data
      ]))
      .catch(error => console.error('Error:', error));
    taskname.current.value = "";
  };

  const toggleTaskStatus = (tit) => {
    axios.put(`http://localhost:8080/api/v1/tasks/${tit.id}`,{tstatus:!tit.tstatus})
    .then(response=>setTaskList(taskList.map(e=>e.id===tit.id?(response.data):e)))
    .catch(error => console.error('Error:', error));
  };

  const deleteTask = (tit) =>{
    axios.delete(`http://localhost:8080/api/v1/tasks/${tit}`);
    setTaskList(taskList.filter(e=>e.id!==tit));
  }

  return (
    <div className="task">
      <div className="list">
        {taskList.map((task) => (
          <Card key={task.id} task={task} onToggleStatus={toggleTaskStatus} deleteTask={deleteTask}/>
        ))}
      </div>
      {/* <div className="completed-list">
        Completed...
        {taskList.find((task) => task.tstatus).map((task) => (
          <Card key={task.id} task={task} onToggleStatus={toggleTaskStatus}/>
        ))}
      </div> */}
      <div className="inputTask"  onKeyDown={(e)=>{
            if(e.key==="Enter"){
              submitTask();
            }
          }}>
        <input
          type="text"
          name="inputTask"
          id="inputTask"
          placeholder="Enter your task..."
          ref={taskname}
        />
        <button type="submit" onClick={submitTask}>
          ⇒
        </button>
      </div>
    </div>
  );
};

export default Task;
