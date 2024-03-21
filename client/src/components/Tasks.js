import React from "react";
import TopNavigation from "./TopNavigation";
import { useDispatch } from "react-redux";

function Tasks() {
  let dispatch = useDispatch();

  return (
    <div>
      <TopNavigation />
      <h1>Tasks</h1>
      <button
        onClick={() => {
          dispatch({ type: "createTask", data: "ct" });
        }}
      >
        Create Task
      </button>
      <button
        onClick={() => {
          dispatch({ type: "submitTask", data: "stt" });
        }}
      >
        Submit Task
      </button>
      <button
        onClick={() => {
          dispatch({ type: "rejectTask", data: "rt" });
        }}
      >
        Reject Task
      </button>
    </div>
  );
}

export default Tasks;
