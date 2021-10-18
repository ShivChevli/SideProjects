import React, { DetailedHTMLProps, HtmlHTMLAttributes, HTMLProps, MouseEventHandler } from "react";
interface colorProps {
    onClick(el: string): void,
}
export const ColorSelector: React.FC<colorProps> = (props) => {
    const { onClick } = props;
    return (
        <div className="color-lable-selector">
            {/* <label htmlFor="">Task Lable Color :- </label> */}
            <button className="color-box color-box-blue selector" value="blue" onClick={(el) => onClick(el.currentTarget.value)}></button>
            <button className="color-box color-box-black selector" value="black" onClick={(el) => onClick(el.currentTarget.value)}></button>
            <button className="color-box color-box-yellow selector" value="yellow" onClick={(el) => onClick(el.currentTarget.value)}></button>
            <button className="color-box color-box-red selector" value="red" onClick={(el) => onClick(el.currentTarget.value)}></button>
            <button className="color-box color-box-green selector" value="green" onClick={(el) => onClick(el.currentTarget.value)}></button>
        </div>
    )
}