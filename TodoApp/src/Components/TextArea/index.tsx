import React, { ChangeEvent } from "react";

interface TextAreaProps {
    // onChange(): void,
    onChange(event: ChangeEvent<HTMLTextAreaElement>): void,
    value?: string | number,
    error?: string | null,
    lable?: string,
    cols?: number,
    rows?: number,
    nameArea: string,
}

export const TextArea: React.FC<TextAreaProps> = (props) => {
    const { onChange, children, cols, nameArea, error, lable, rows = 10, value = "" } = props;
    return (
        <div className="input-div">
            <label htmlFor="" className="input-lable"> {lable}</label>
            <textarea className="input-textArea input-element" name={nameArea} cols={cols} rows={rows} value={value} onChange={onChange}>{children}</textarea>
            {error ? <h1> <span className="input-error"> Error :- </span> {error}</h1> : null}
        </div>
    )
}