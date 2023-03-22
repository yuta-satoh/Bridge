import fetcher from "@/lib/fetcher";
import { ChangeEvent } from "react";
import useSWR from 'swr'

type Input = {
    value: string;
    width?: string | number;
    onChange?: (ev: ChangeEvent<HTMLInputElement>) => void;
    onClick: (value: string) => void;
}

const InputSuggestBig = ({ value, onChange, onClick }: Input) => {
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
                    />
                    <button
                        type="button"
                        onClick={() => onClick('')}
                    >
                        x
                    </button>
                    <style jsx>{`
                        input {
                            height: 40px;
                            width: 600px;
                            border: 1.5px solid #574142;
                            border-radius: 0.25rem;
                            padding-left: 10px;
                        }
                        button {
                            display: inline-block;
                            position: absolute;
                            height: 36px;
                            width: 40px;
                            left: 557px;
                            top: 2px;
                            background-color: #ffffff;
                            border-radius: 0.25rem;
                        }
                    `}</style>
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
                    />
                    <style jsx>{`
                        input {
                            height: 40px;
                            width: 600px;
                            border: 1.5px solid #574142;
                            border-radius: 0.25rem;
                            padding-left: 10px;
                        }
                    `}</style>
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
                    />
                    <div className="suggest">
                        {data.map((item, index) => {
                            return (
                                <div
                                    key={`suggest_${index}`}
                                    className='suggest-list'
                                    onClick={() => onClick(item.name)}
                                >
                                    {item.name}
                                </div>
                            )
                        })}
                    </div>
                    <style jsx>{`
                            input {
                                height: 40px;
                                width: 600px;
                                border: 1.5px solid #574142;
                                border-top-left-radius: 0.25rem;
                                border-top-right-radius: 0.25rem;
                                padding-left: 10px;
                            }
                            .suggest {
                                position: absolute;
                                z-index: 50;
                            }
                            .suggest-list {
                                width: 600px;
                                border-width: 1px;
                                background-color: rgb(255 255 255);
                                border-color: #574142;
                                font-size: 14px;
                                line-height: 20px;
                                padding: 10px;
                                cursor: pointer;
                            }
                            .suggest-list:hover {
                                background-color: rgb(229 229 229);
                            }
                    `}</style>
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
                    />
                    <style jsx>{`
                        input {
                            height: 40px;
                            width: 600px;
                            border: 1.5px solid #574142;
                            border-radius: 0.25rem;
                            padding-left: 10px;
                        }
                    `}</style>
                </div>
            )
        }
    }
}

export default InputSuggestBig;
