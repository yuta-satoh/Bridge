import fetcher from "@/lib/fetcher";
import { ChangeEvent } from "react";
import useSWR from 'swr'
import sbStyles from '../../styles/bigSuggest.module.css';

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
                <div className={sbStyles.nDat}>
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
                </div>
            )
        } else {
            return (
                <div className={sbStyles.nVal}>
                    <input
                        type='text'
                        placeholder='何をお探しですか？'
                        value={value}
                        onChange={onChange}
                    />
                </div>
            )
        }
    } else {
        if (value) {
            return (
                <div className={sbStyles.yDat}>
                    <input
                        type='text'
                        placeholder='何をお探しですか？'
                        value={value}
                        onChange={onChange}
                    />
                    <div className={sbStyles.suggest}>
                        {data.map((item, index) => {
                            return (
                                <div
                                    key={`suggest_${index}`}
                                    className={sbStyles.suggest_list}
                                    onClick={() => onClick(item.name)}
                                >
                                    {item.name}
                                </div>
                            )
                        })}
                    </div>
                </div>
            )
        } else {
            return (
                <div className={sbStyles.nVal}>
                    <input
                        type='text'
                        placeholder='何をお探しですか？'
                        value={value}
                        onChange={onChange}
                    />
                </div>
            )
        }
    }
}

export default InputSuggestBig;
