import fetcher from "@/lib/fetcher";
import { ChangeEvent } from "react";
import useSWR from 'swr'
import { useWindowSize } from "@/lib/getWindowSize";

type Input = {
    value: string;
    width?: string | number;
    onChange?: (ev: ChangeEvent<HTMLInputElement>) => void;
    onClick: (value: string) => void;
}

const InputSuggest = ({ value, onChange, onClick }: Input) => {
    const input = value.split(/\s+/)[0]
    const windowSize = useWindowSize()
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
                        className='h-6 sp:h-8 w-32 sp:w-48 text-xs border border-neutral-500 rounded-l pl-2'
                    />
                    {windowSize.width >= 600 ? 
                        <button
                        type="button"
                        onClick={() => onClick('')}
                        className='absolute h-7 w-7 left-40 top-0.5 bg-white rounded'
                        >
                            x
                        </button>
                    : <></> }
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
                        className='h-6 sp:h-8 w-32 sp:w-48 text-xs border border-neutral-500 rounded-l pl-2'
                    />
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
                        className='h-6 sp:h-8 w-32 sp:w-48 text-xs border border-neutral-500 rounded-l pl-2'
                    />
                    <div className='absolute z-50'>
                        {data.map((item, index) => {
                            return (
                                <div
                                    key={`suggest_${index}`}
                                    className='w-32 sp:w-48 border bg-white border-neutral-500 text-xs sp:text-sm p-1 cursor-pointer hover:bg-neutral-200'
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
                <div>
                    <input
                        type='text'
                        placeholder='何をお探しですか？'
                        value={value}
                        onChange={onChange}
                        className='h-6 sp:h-8 w-32 sp:w-48 text-xs border border-neutral-500 rounded-l pl-2'
                    />
                </div>
            )
        }
    }
}

export default InputSuggest;
