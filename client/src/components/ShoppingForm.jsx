import { useState } from "react"

const ShoppingForm = () => {
    const [shoppingItems, setShoppingItems] =
        useState(['Apples', 'Cookies']);

    return (
        <InputWithLabels
            value={shoppingItems}
            onChange={setShoppingItems}
        />
    )
}

const InputWithLabels = (props) => {
    const [inputValue, setInputValue] = useState('');
    const { value, onChange } = props;

    const onAddItem = () => {
        if (inputValue.trim() !== "") {
            onChange([...value, inputValue.trim()]);
            setInputValue("");
        }
    }

    const onRemoveItem = (itemToRemove) => {
        const updatedItems = value.filter(val => val !== itemToRemove);
        onChange(updatedItems);
    }

    const onClickClearAll = () => {
        onChange([]);
    }

    return (
        <div>
            <div className="inputs">
                <label htmlFor="addItem">
                    <input
                        type="text"
                        name="addItem"
                        placeholder="To do.."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                </label>
                <button onClick={onAddItem}>Add Item</button>
            </div>
            <div className="box-item">
                {value.map((val) => (
                    <div class="items" key={val}>
                        <p>{val}</p>
                        <div className="btns">
                            <button onClick={() => { }}>update</button>
                            <button onClick={() => onRemoveItem(val)}>X</button>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={onClickClearAll}>clear all</button>
        </div>
    )
}

export default ShoppingForm;