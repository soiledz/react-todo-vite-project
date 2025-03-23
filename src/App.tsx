import './App.css'
import {TaskType, TodoList} from "./components/TodoList.tsx";
import {useState} from "react";
import {v1} from "uuid";
import {AddInputForm} from "./components/AddInputForm.tsx";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export type FilterValuesType = 'all' | 'completed' | "active"
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    function removeTask(id: string, todolistsId: string) {
        const tasks = tasksObj[todolistsId]
        const filteredTasks = tasks.filter(t => t.id !== id)
        tasksObj[todolistsId] = filteredTasks
        setTasksObj({...tasksObj})
    }

    function addTask(title: string, todolistsId: string) {
        const task = {
            id: v1(),
            title: title,
            isDone: false
        }
        const tasks = tasksObj[todolistsId]
        const newTasks = [task, ...tasks]
        tasksObj[todolistsId] = newTasks
        setTasksObj({...tasksObj})
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        const todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        const tasks = tasksObj[todolistId]
        const task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasksObj({...tasksObj})
        }

    }

    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        const tasks = tasksObj[todolistId]
        const task = tasks.find(t => t.id === taskId)
        if (task) {
            task.title = newTitle
            setTasksObj({...tasksObj})
        }

    }

    const todolistsId1 = v1()
    const todolistsId2 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistsId1, title: 'What to learn', filter: 'all'},
        {id: todolistsId2, title: 'What to buy', filter: 'all'}
    ])

    const removeTodolist = (todolistsId: string) => {
        const filteredTodolist = todolists.filter(tl => tl.id !== todolistsId)
        setTodolists(filteredTodolist)
        delete tasksObj[todolistsId]
        setTasksObj({...tasksObj})
    }

    function changeTodolistTitle(todolistId: string, newTitle: string) {
        const todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.title = newTitle
            setTodolists([...todolists])
        }
    }

    const [tasksObj, setTasksObj] = useState<TasksStateType>({
        [todolistsId1]: [
            {id: v1(), title: 'css', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false}
        ],
        [todolistsId2]: [
            {id: v1(), title: 'book', isDone: false},
            {id: v1(), title: 'milk', isDone: true}
        ]
    })

    function addTodolist(title: string) {
        const todolist: TodolistType = {
            id: v1(),
            filter: 'all',
            title: title
        }
        setTodolists([todolist, ...todolists])
        setTasksObj({
            ...tasksObj,
            [todolist.id]: []
        })
    }

    return (
        <div className={"App"}>

            <AppBar position="static">

                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>

            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddInputForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map((tl) => {

                            let tasksForTodolist = tasksObj[tl.id]
                            if (tl.filter === 'completed') {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
                            }
                            if (tl.filter === 'active') {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
                            }

                            return <Grid item>
                                <Paper elevation={3} style={{padding: "10px"}}>
                                    <TodoList
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        changeTaskTitle={changeTaskTitle}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </ Container>
        </div>
    )
}

export default App

