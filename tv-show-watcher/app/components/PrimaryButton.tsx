import React, { ButtonHTMLAttributes } from "react";

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, ...props }) => {
    return (
        <button
            {...props}
            className={`
                    bg-blue-500 rounded-[10px] font-sans font-medium
                    flex justify-center items-center
                    text-[#F5F5F5] p-3
                    hover:bg-blue-400 active:bg-blue-400
                    cursor-pointer
                ${props.className ?? ""}
            `}
        >
            {children}
        </button>
    );
};

export default PrimaryButton;