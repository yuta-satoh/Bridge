import fetcher from "@/lib/fetcher";
import { ChangeEvent } from "react";
import useSWR from 'swr'
import utilstyle from '../../styles/utils.module.css'

type Input = {
    value: string;
    width?: string | number;
    onChange?: (ev: ChangeEvent<HTMLInputElement>) => void;
    onClick: (value: string) => void;
}

const InputSuggest = ({ value, onChange, onClick }: Input) => {
    const input = value.split(/\s+/)[0]
    const { data, error } = useSWR(`/api/suggest?input=${input}`, fetcher)
    if (!data || data.length === 0 || error || data[0].name === value) {
        if (value) {
            return (
                <div className="relative">
                    <input
                        type='text'
                        placeholder='何をお探しですか？'
                        value={value}
                        onChange={onChange}
                        className={utilstyle.input_util}
                    />
                    <button
                        type="button"
                        onClick={() => onClick('')}
                        className={utilstyle.btn_util}
                    >
                        x
                    </button>
                    {/* <style jsx>{`
                        input {
                            height: 32px;
                            width: 200px;
                            border-width: 1px;
                            border-color: rgb(115 115 115);
                            border-top-left-radius: 4px;
                            border-bottom-left-radius: 4px;
                            padding-left: 10px;
                        }
                        button {
                            position: absolute;
                            height: 28px;
                            width: 32px;
                            left: 167px;
                            top: 2px;
                            background-color: #ffffff;
                            border-radius: 4px;
                        }
                    `}</style> */}
                </div>
            )
        } else {
            return (
                <div>
                    <input
                        type='text'
                        placeholder='何をお探しですか？'
                        value={value}
                        onChange={onChange}
                        className={utilstyle.input_util}
                    />
                    {/* <style jsx>{`
                        input {
                            height: 32px;
                            width: 200px;
                            border-width: 1px;
                            border-color: rgb(115 115 115);
                            border-top-left-radius: 4px;
                            border-bottom-left-radius: 4px;
                            padding-left: 10px;
                        }
                    `}</style> */}
                </div>
            )
        }
    } else {
        if (value) {
            return (
                <div className="relative">
                    <input
                        type='text'
                        placeholder='何をお探しですか？'
                        value={value}
                        onChange={onChange}
                        className={utilstyle.input_util}
                    />
                    <div className={utilstyle.suggest}>
                        {data.map((item, index) => {
                            return (
                                <div
                                    key={`suggest_${index}`}
                                    className={utilstyle.suggest_list}
                                    onClick={() => onClick(item.name)}
                                >
                                    {item.name}
                                </div>
                            )
                        })}
                    </div>
                    {/* <style jsx>{`
                            input {
                                height: 32px;
                                width: 200px;
                                border-width: 1px;
                                border-color: rgb(115 115 115);
                                border-top-left-radius: 4px;
                                padding-left: 10px;
                            }
                            .suggest {
                                position: absolute;
                                z-index: 50;
                            }
                            .suggest-list {
                                width: 200px;
                                border-width: 1px;
                                background-color: rgb(255 255 255);
                                border-color: rgb(115 115 115);
                                font-size: 14px;
                                line-height: 20px;
                                padding: 4px;
                                cursor: pointer;
                            }
                            .suggest-list:hover {
                                background-color: rgb(229 229 229);
                            }
                    `}</style> */}
                </div>
            )
        } else {
            return (
                <div>
                    <input
                        type='text'
                        placeholder='何をお探しですか？'
                        value={value}
                        onChange={onChange}
                        className={utilstyle.input_util}
                    />
                    <style jsx>{`
                        input {
                            height: 32px;
                            width: 200px;
                            border-width: 1px;
                            border-color: rgb(115 115 115);
                            border-top-left-radius: 4px;
                            border-bottom-left-radius: 4px;
                            padding-left: 10px;
                        }
                    `}</style>
                </div>
            )
        }
    }
}

export default InputSuggest;
