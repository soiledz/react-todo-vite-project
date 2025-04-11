import * as React from "react";
import {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan.tsx";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./TodoList.tsx";


type TaskPropsType = {
    removeTask: (todolistId: string, taskId: string) => void
    changeTaskStatus: (taskId: string, todolistId: boolean, isDone: string) => void
    changeTaskTitle: (taskId: string, todolistId: string, title: string) => void
    task: TaskType
    todolistId: string
}

export const Task = React.memo((props: TaskPropsType) => {
    const onRemoveHandler = () => props.removeTask(props.task.id, props.todolistId)
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(props.task.id, newIsDoneValue, props.todolistId)
    }

    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId)
    }, [props])

    return <div key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
        <Checkbox checked={props.task.isDone}
                  onChange={onChangeStatusHandler}/>
        <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>
        <IconButton onClick={onRemoveHandler}>
            <Delete/>
        </IconButton>
    </div>
})

