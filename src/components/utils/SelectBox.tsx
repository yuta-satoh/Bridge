import { ChangeEvent } from "react";
import lstyles from '../../styles/itemList.module.css';

type SelectBox = {
    arr: string[] | number[]
    name: string;
    id: string;
    value?: string
    defaultValue?: string | number;
    onChange?: (ev: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectBox = ({ arr, name, id, value, defaultValue, onChange }: SelectBox) => {
    const strLen = arr.map((str) => str.toString().length)
    const strLenMax = Math.max(...strLen)
    const minWidth = strLenMax * 10 + 70;
    
    return (
        <label className={lstyles.selectbox}>
            <select
                name={name}
                id={id}
                data-testid="select-option"
                value={value}
                defaultValue={defaultValue}
                onChange={onChange}
            >
                {arr.map((str) => {
                    return (
                        <option
                        value={str}
                        key={`opt_${str}`}
                        >
                            {str}
                        </option>
                    )
                })}
            </select>
        </label>
    )
}

export default SelectBox;
