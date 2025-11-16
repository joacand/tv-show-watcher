import React, { TextareaHTMLAttributes } from "react";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

const TextArea: React.FC<TextAreaProps> = ({ children, ...props }) => {
    return (
        <textarea
            {...props}
            className={`
                bg-[#3B4856] 
                rounded-[10px] 
                font-sans font-medium
                text-[#F5F5F5] text-[20px] leading-[26px]
                h-[50px] px-2 py-3
                hover:bg-[#2f3b45] active:bg-[#262f36]
                ${props.className ?? ""}
            `}
        >
            {children}
        </textarea>
    );
};

export default TextArea;