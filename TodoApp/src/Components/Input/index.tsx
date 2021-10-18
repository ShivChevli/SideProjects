import React, { ChangeEvent } from "react";
interface InputProps {
    onChange(event: ChangeEvent<HTMLInputElement>): void,
    value?: string | number,
    error?: string | null,
    type?: string,
    placeholder?: string,
    lable?: string,
    name: string,
}
export const Input: React.FC<InputProps> = (props) => {
    const { lable, name, error, onChange, type = "text", value = "", placeholder = "Enter Text here" } = props;
    return (
        <div className="input-div">
            {lable ? <label className="input-lable"> {lable}</label> : null}
            <input name={name} type={type} className="input-element " onChange={onChange} value={value} placeholder={placeholder} />
            {error ? <h1><span className="input-error"> Error :</span> {Error}</h1> : null}
        </div>
    )
}