import { ChangeEvent } from "react";

type SelectBox = {
    arr: string[] | number[]
    name: string;
    id: string;
    defaultValue: string | number;
    onChange: (ev: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectBox = ({ arr, name, id, defaultValue, onChange }: SelectBox) => {
    return (
        <label className="selectbox">
            <select
                name={name}
                id={id}
                data-testid="select-option"
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
            <style jsx>{`
                .selectbox {
                    position: relative;
                }
                
                .selectbox::before,
                .selectbox::after {
                    position: absolute;
                    content: '';
                    pointer-events: none;
                }
                
                .selectbox::before {
                    right: 0;
                    display: inline-block;
                    width: 35px;
                    height: 35px;
                    border-radius: 0 3px 3px 0;
                    background-color: #574142;
                    content: '';
                }
                
                .selectbox::after {
                    position: absolute;
                    top: 50%;
                    right: 17px;
                    transform: translate(50%, -50%) rotate(45deg);
                    width: 6px;
                    height: 6px;
                    border-bottom: 2px solid #fff;
                    border-right: 2px solid #fff;
                    content: '';
                }
                
                .selectbox select {
                    appearance: none;
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    min-width: 100px;
                    height: 35px;
                    border: 1px solid #574142;
                    border-radius: 2px;
                    color: #333333;
                    font-size: 16px;
                    cursor: pointer;
                    text-align: center;
                    padding-right: 2.1em;
                }
                
                .selectbox select:focus {
                    outline: 1px solid #574142;
                }
            `}</style>
        </label>
    )
}

export default SelectBox;
