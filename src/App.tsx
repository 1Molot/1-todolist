import React from 'react';
import './App.css';
import Todolist from "./todolist";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

function App(): JSX.Element {

    const tasks: TaskType[] = [
        {id: 1, title: "HTML & CSS", isDone: false},
        {id: 2, title: "CSS & SCSS", isDone: false},
        {id: 3, title: "ES6/TS", isDone: false},
    ]
    const tasks1: TaskType[] = [
        {id: 1, title: "HTML & CSS", isDone: true},
        {id: 2, title: "CSS & SCSS", isDone: false},
        {id: 3, title: "ES6/TS", isDone: false},
    ]
    return (
        < div className="App">
            <Todolist
                title={"What to learn"}
                tasks={tasks}
                />
            <Todolist
                title={"What to buy"}
                tasks={tasks1}
            />
            {/*<Todolist title={"What to learn"} tasks={tasks}/>*/}
            {/*<Todolist title={"What to buy"} tasks={tasks}/>*/}
            {/*<Todolist title={"What to read"} tasks={tasks}/>*/}
        </div>
    );
}

export default App;
