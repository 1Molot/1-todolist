import React, {useState} from 'react';
import './App.css';
import Todolist from "./todolist";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}
export type FilterValuesType = "all" | "active" | "completed"

function App(): JSX.Element {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML & CSS", isDone: true},
        {id: 2, title: "CSS & SCSS", isDone: true},
        {id: 3, title: "ES6/TS", isDone: false},
        {id: 4, title: "REDUX", isDone: false},
    ])

    const removeTask = (taskId: number) => {
        setTasks(tasks.filter((task) => task.id !== taskId))
    }
    const [filter, setFilter] = useState<"all" | "active" | "completed">("active")

    const changeTodoListFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    let tasksForRender: Array<TaskType> = []
    if (filter === "all") {
        tasksForRender = tasks
    }
    if (filter === "active") {
        tasksForRender = tasks.filter(t => t.isDone !== false)
    }
    if (filter === "completed") {
        tasksForRender = tasks.filter(t => t.isDone !== true)
    }

    return (
        < div className="App">
            <Todolist
                removeTask={removeTask}
                title={"What to learn"}
                tasks={tasksForRender}
                changeTodoListFilter={changeTodoListFilter}
            />
        </div>
    );
}

export default App;
