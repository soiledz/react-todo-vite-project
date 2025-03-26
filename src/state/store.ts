import {combineReducers, configureStore, } from "@reduxjs/toolkit";
import {todolistsReducer} from "./todolists-reducer.ts";
import {tasksReducer} from "./task-reducer.ts";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

type AppRootState = ReturnType<typeof rootReducer>

export const store = configureStore({
    reducer: rootReducer
})

// @ts-ignore
window.store = store