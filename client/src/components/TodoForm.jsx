import { useEffect, useState } from "react"
import Axios from 'axios';

const TodoForm = () => {
    const [toDo, setToDo] = useState([]);

    return (
        <InputWithLabel
            toDo={toDo}
            onChange={setToDo}
        />
    );
}

const InputWithLabel = (props) => {
    const [inputValue, setInputValue] = useState('');
    const [updateValue, setUpdateValue] = useState('');
    const [todoId, setTodoId] = useState('')
    const [isUpdate, setIsUpdate] = useState(false);

    const { toDo, onChange } = props;
    // const server = import.meta.env.SERVER_URL;
    const server_url = import.meta.env.VITE_SERVER_URL;

    const onAddTodo = async () => {
        if (inputValue.trim() !== "") {
            const input = inputValue.trim();
            await Axios
                .post(`${server_url}/todo/create`, { todo: input })
                .then((res) => {
                    onChange([...toDo, { _id: res.data.status._id, todo: input }])
                }).catch(err => console.log(err));
            setInputValue("");
        }
    }

    const onUpdateItem = async (_id) => {
        const obj = {
            todo: updateValue
        }
        if (updateValue.trim() !== "") {
            await Axios
                .put(`${server_url}/todo/update`, { _id, obj })
                .then(() => {
                    onChange(toDo.map(val => {
                        return val._id === _id
                            ? { _id: val._id, todo: val.todo }
                            : val;
                    }));
                }).catch(err => console.log(err));
            setIsUpdate(false);
            setUpdateValue('');
        }
    }

    const onRemoveItem = async (_id) => {
        const proceed = window.confirm("are you sure you want to delete?");

        if (proceed) {
            await Axios
                .delete(`${server_url}/todo/remove`, { data: { _id } })
                .then(() => {
                    onChange(toDo.filter(val => {
                        return val._id !== _id
                    }));
                }).catch(err => console.log(err));
            setIsUpdate(false);
            setUpdateValue('');
        }
    }

    const onClickClearAll = async () => {
        const proceed = window.confirm("are you sure you want to delete all data?");

        if (proceed) {
            await Axios
                .delete(`${server_url}/todo/remove/all`)
                .then(() => {
                    onChange([]);
                }).catch(err => console.log(err));
            setIsUpdate(false);
            setInputValue('');
            setUpdateValue('');
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            if (isUpdate) {
                onUpdateItem(todoId)
            } else {
                onAddTodo();
            }

            console.log('enter')
        }
    }

    const handleClickOpen = (id, valuez) => {
        setTodoId(id);
        setUpdateValue(valuez);
        setIsUpdate(true);
    }

    const handleClickClose = () => {
        setIsUpdate(false);
    }

    useEffect(() => {
        Axios.get(`${server_url}/todo/retrieve`)
            .then(res => onChange(res.data))
            .catch((err) => console.log(err));
    }, [updateValue]);

    return (
        <div className="box">
            <h4>{server_url}</h4>
            <h3>Hello</h3>
            <div className="inputs">
                {isUpdate ? (<UpdateInput
                    updateValue={updateValue}
                    setUpdateValue={(e) => setUpdateValue(e.target.value)}
                    onUpdateItem={() => onUpdateItem(todoId)}
                    handleClickClose={() => handleClickClose()}
                    handleKeyDown={handleKeyDown}
                />) : (<div className="add-input">
                    <h4>Add</h4>
                    <label htmlFor="addItem">
                        <input
                            type="text"
                            name="addItem"
                            placeholder="To do.."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            required
                        />
                    </label>
                    <button onClick={onAddTodo} id="add">Add</button></div>)}
            </div>
            <div className="box-item">
                {toDo.map(val => (
                    <div className="items" key={val.todo}>
                        <p>{val.todo}</p>
                        <div className="btns">
                            <button disabled={isUpdate} onClick={() => handleClickOpen(val._id, val.todo)} className="update">Update</button>
                            <button disabled={isUpdate} onClick={() => onRemoveItem(val._id)} className="delete">Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            <button onClick={onClickClearAll} id="clear-all">Clear All</button>
        </div>
    )
}

const UpdateInput = (props) => {
    const { updateValue, setUpdateValue, onUpdateItem, handleClickClose, handleKeyDown } = props;
    return (
        <div className="update-input">
            <h4>Update</h4>
            <label htmlFor="updateItem">
                <input
                    type="text"
                    name="updateItem"
                    placeholder="To do.."
                    value={updateValue}
                    onChange={setUpdateValue}
                    onKeyDown={handleKeyDown}
                    required
                />
            </label>
            <button onClick={onUpdateItem} className="update" id="update">Update</button>
            <button onClick={handleClickClose} id="cancel">Cancel</button>
        </div>
    )
}

export default TodoForm