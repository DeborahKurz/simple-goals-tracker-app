import React from "react";
import { useNavigate } from "react-router-dom";

import DeleteGoalTask from "./DeleteGoalTask.js";

function ListGoals({goal, handleGoalsDeleteTask}){
    const navigate = useNavigate();

    function handleClickTeam(){
        navigate("/team");
      };

    return (
        <div>
            {goal.tasks.map((aTask) => (
                    aTask.completed === false ? (
                        <div key={aTask.id} style={{ display: "flex", alignItems: "center", width: "1000px", height: "60px" }}>
                        <li style={{ width:"500px", height: "50px", border: "2px solid black", marginRight: "-2px" }}>{aTask.task}</li>
                        <button style={{ width: "150px", height: "54px", background: "white", marginRight: "10px" }} onClick={()=> handleClickTeam()}>Task Owner: {aTask.user.username}</button>
                        <DeleteGoalTask taskId={aTask.id} handleGoalsDeleteTask={handleGoalsDeleteTask}/>
                        </div>
                    ) : (
                        <div key={aTask.id} style={{ display: "flex", alignItems: "center", width: "1000px", height: "60px" }}>
                        <li style={{ textDecoration: 'line-through', width:"500px", height: "50px", border: "2px solid black", marginRight: "-2px" }}>Completed: {aTask.task}</li>
                        <button style={{ width: "150px", height: "54px", background: "white", marginRight: "10px" }} onClick={()=> handleClickTeam()}>Task Owner: {aTask.user.username}</button>
                        <DeleteGoalTask taskId={aTask.id} handleGoalsDeleteTask={handleGoalsDeleteTask}/>
                        </div>
                    )
            ))}
        </div>
    )
};

export default ListGoals
