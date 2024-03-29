import React, {ChangeEvent, KeyboardEvent, ChangeEventHandler, FC, useRef, useState} from 'react';
import {FilterValuesType} from './App';

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskId: string) => void
    changeTodoListFilter: (filter: FilterValuesType) => void
    changeTaskStatus: (tskId: string, newIsDone: boolean) => void
    addTask: (title: string) => void
    // newIsDone:(title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const Todolist: FC<TodolistPropsType> = (props: TodolistPropsType) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    let isAllTasksNotIsDone = true
    for (let i = 0; i < props.tasks.length; i++) {
        if (props.tasks[i].isDone) {
            isAllTasksNotIsDone = false
            break;
        }
    }
    const todoClasses = isAllTasksNotIsDone ? "todolist-empty" : "todolist"
    const maxTitleLength = 20
    const recommendedTitleLength = 10

    const todolistItems: Array<JSX.Element> = props.tasks.map((task) => {
        const removeTaskHandler = () => props.removeTask(task.id)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked)

        return (
            <li>
                <input
                    onChange={changeTaskStatus}
                    type="checkbox" checked={task.isDone}/>
                <span className={task.isDone ? "task-done" : "task"}>{task.title}</span>
                <button onClick={removeTaskHandler}>x
                </button>
            </li>
        )
    })

    const isAddTaskPossible: boolean = !title.length || title.length > maxTitleLength || error

    const addTaskHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const setLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const onKeyDownAddTaskHandler = isAddTaskPossible
        ? undefined
        : (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTaskHandler()

    const longTitleWarningMessage = (title.length > recommendedTitleLength && title.length <= maxTitleLength) &&
        <div style={{color: "white"}}>Title should be shorter</div>
    const longTitleErrorMessage = title.length > maxTitleLength &&
        <div style={{color: "#f23391"}}>Title is too long!!!</div>
    const errorMessage = error &&  <div style={{color: "#f23391"}}>Title is hard required!!!</div>


    return (
        <div className={todoClasses}>
            <h3>{props.title}</h3>
            <div>
                <input
                    placeholder={"Enter task title,please"}
                    value={title}
                    onChange={setLocalTitleHandler}
                    onKeyDown={onKeyDownAddTaskHandler}
                    className={error ? "input-error" : ""}
                />
                <button
                    disabled={isAddTaskPossible}
                    onClick={addTaskHandler
                    }>+
                </button>
                {longTitleWarningMessage}
                {longTitleErrorMessage}
                {errorMessage}
            </div>
            <ul>
                {todolistItems}
            </ul>
            <div>
                <button
                    className={props.filter === "all" ? "btn-active" : ""}
                    onClick={() => {
                        props.changeTodoListFilter("all")
                    }}>All
                </button>
                <button
                    className={props.filter === "active" ? "btn-active" : ""}
                    onClick={() => {
                        props.changeTodoListFilter("active")
                    }}>Active
                </button>
                <button
                    className={props.filter === "completed" ? "btn-active" : ""}
                    onClick={() => {
                        props.changeTodoListFilter("completed")
                    }}>Completed
                </button>
            </div>
        </div>
    );
};

export default Todolist;