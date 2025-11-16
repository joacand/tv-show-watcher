import React, { ButtonHTMLAttributes } from "react";

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, ...props }) => {
    return (
        <button
            {...props}
            className={`
                    bg-[#3B4856] rounded-[10px] font-sans font-medium
                    flex justify-center items-center
                    text-[#F5F5F5] p-3
                    hover:bg-[#2f3b45] active:bg-[#262f36]
                    cursor-pointer
                ${props.className ?? ""}
            `}
        >
            {children}
        </button>
    );
};

export default PrimaryButton;