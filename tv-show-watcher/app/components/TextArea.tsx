import React, { TextareaHTMLAttributes } from "react";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

const TextArea: React.FC<TextAreaProps> = ({ children, ...props }) => {
    return (
        <textarea
            {...props}
            className={`
                rounded-[10px] 
                font-sans font-medium
                text-[20px] leading-[14px]
                h-[40px] px-2 py-3 border
                ${props.className ?? ""}
            `}
        >
            {children}
        </textarea>
    );
};

export default TextArea;