import React, { ReactNode } from 'react'

interface ButtonProps {
    children: ReactNode;
    colorClass: string;
    type: "button" | "submit" | "reset";
    onClick?: () => void;
}

const Button = ({ children, colorClass, type, onClick }: ButtonProps) => {
    const baseClasses =
        "text-white font-bold py-3 px-4 rounded focus:outline-none mt-8"
    return (
        <button
            type={type}
            className={`${baseClasses} ${colorClass}`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button