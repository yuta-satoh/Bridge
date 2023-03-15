import { ReactNode } from "react";

type Button = {
    children: ReactNode;
    type: "button" | "submit";
    color: 'pink' | 'white' | 'black'
    onClick?: () => void;
}

const Button = ({ children, type, color, onClick }: Button) => {
    if (color === 'pink') {
        return (
            <>
                <button
                    type={type}
                    onClick={onClick}
                    >
                    {children}
                </button>
                <style jsx>{`
                    button {
                        background-color: #F8C6BD;
                        box-shadow: 1px 1px 3px;
                        padding: 5px 18px;
                        border-radius: 0.7rem;
                    }
                    button:hover {
                        background-color: #f6b0a4;
                        transition: 0.1s ease-out;
                    }
                    button:active {
                        transform: translateX(1px) translateY(1px);
                        box-shadow: none;
                    }
                `}</style>
            </>
        )
    } else if (color === 'white') {
        return (
            <>
                <button
                    type={type}
                    onClick={onClick}
                    >
                    {children}
                </button>
                <style jsx>{`
                    button {
                        background-color: #FFFFFF;
                        box-shadow: 1px 1px 3px;
                        padding: 5px 5px;
                        border: 1px solid #000000;
                        width: 90%;
                    }
                    button:hover {
                        background-color: #F2F2F2;
                        transition: 0.1s ease-out;
                    }
                    button:active {
                        transform: translateX(1px) translateY(1px);
                        box-shadow: none;
                    }
                `}</style>
            </>
        )
    } else {
        return (
            <>
                <button
                    type={type}
                    onClick={onClick}
                    >
                    {children}
                </button>
                <style jsx>{`
                    button {
                        background-color: #000000;
                        color: #ffffff;
                        box-shadow: 1px 1px 3px;
                        padding: 5px 10px;
                        border-radius: 0.2rem;
                    }
                    button:hover {
                        background-color: #333333;
                        transition: 0.1s ease-out;
                    }
                    button:active {
                        transform: translateX(1px) translateY(1px);
                        box-shadow: none;
                    }
                `}</style>
            </>
        )
    }
}

export default Button
