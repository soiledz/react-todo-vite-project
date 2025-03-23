import {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddInputForm(props: AddItemFormPropsType) {
    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter' && title.trim() !== "") {
            props.addItem(title)
            setTitle("")
        } else if (e.key === 'Enter' && title.trim() === "") {
            setError("Title is required")
        }
    }

    const addTask = () => {
        if (title.trim() === "") {
            return setError("Title is required")
        }
        props.addItem(title.trim())
        setTitle("")
    }

    return <div>
        <TextField value={title}
                   label={"Type value"}
                   onChange={onNewTitleChangeHandler}
                   onKeyPress={onKeyPress}
                   error={!!error}
                   helperText={error}
        />
        <IconButton onClick={addTask} color={"primary"}>
            <ControlPoint/>
        </IconButton>
    </div>
}