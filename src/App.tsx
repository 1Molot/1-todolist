import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./todolist";
import {v1} from "uuid";


export type FilterValuesType = "all" | "active" | "completed"

function App(): JSX.Element {
    console.log(typeof (v1()))

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML & CSS", isDone: true},
        {id: v1(), title: "CSS & SCSS", isDone: true},
        {id: v1(), title: "ES6/TS", isDone: false},
        {id: v1(), title: "REDUX", isDone: false},
    ])

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter((task) => task.id !== taskId))
    }
    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(), title: title, isDone: false
        }
        setTasks([newTask, ...tasks])
    }
    const changeTaskStatus = (taskId:string,newIsDone:boolean) => {
        setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: newIsDone} :t))
    }

    const [filter, setFilter] = useState<FilterValuesType>("all")
    const changeTodoListFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    const getFilteredTaskForRender = (tasksList:Array<TaskType>,filterValue:FilterValuesType) => {
        switch (filterValue) {
            case "active":
                return tasksList.filter(t => !t.isDone)
            case "completed":
                return tasksList.filter(t => t.isDone)
            default:
                return tasksList
        }
    }
    // let tasksForRender: Array<TaskType> = getFilteredTaskForRender(tasks,filter)
    return (
        < div className="App">
            <Todolist
                removeTask={removeTask}
                title={"What to learn"}
                tasks={getFilteredTaskForRender(tasks,filter)}
                changeTaskStatus={changeTaskStatus}
                filter={filter}
                addTask={addTask}
                changeTodoListFilter={changeTodoListFilter}
            />
        </div>
    );
}

export default App;
