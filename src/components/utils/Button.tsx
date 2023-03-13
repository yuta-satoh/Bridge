import { ReactNode } from "react";

type Button = {
    children: ReactNode;
    type: "button" | "submit";
    padding: string;
    onClick?: () => void;
}

const Button = ({ children, type, padding = '0 0 0 0', onClick }: Button) => {
    return (
        <>
            <button
                className=""
                type={type}
                onClick={onClick}
                >
                {children}
            </button>
            <style jsx>{`
                button {
                    background-color: #F8C6BD;
                    box-shadow: 1px 1px 3px;
                    padding: ${padding};
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
}

export default Button
