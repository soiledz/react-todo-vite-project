import {FilterValuesType} from "../AppWithRedux.tsx";
import {useCallback} from "react";
import {AddInputForm} from "./AddInputForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import * as React from "react";
import {Task} from "./Task.tsx";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    tasks: Array<TaskType>
    title: string
    addTask: (title: string, todolistId: string) => void
    removeTask: (id: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
    filter: FilterValuesType
}


export const TodoList = React.memo((props: PropsType) => {

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props])


    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.id), [props])
    const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.id), [props])
    const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.id), [props])

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }, [props])

    let tasksForTodolist = props.tasks

    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.isDone)
    }
    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => !t.isDone)
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddInputForm addItem={addTask}/>
            <div>

                {tasksForTodolist.map(t => <Task
                    removeTask={props.removeTask}
                    changeTaskStatus={props.changeTaskStatus}
                    changeTaskTitle={props.changeTaskTitle}
                    task={t}
                    todolistId={props.id}
                    key={t.id}
                    />)
                }
            </div>
            <div style={{paddingTop: "10px"}}>
                <Button color={'inherit'} variant={props.filter === 'all' ? 'contained' : 'text'}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button color={"primary"} variant={props.filter === 'active' ? 'contained' : 'text'}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button color={"secondary"} variant={props.filter === 'completed' ? 'contained' : 'text'}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
})
