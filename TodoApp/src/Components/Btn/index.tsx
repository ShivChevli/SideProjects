import React from 'react';
import "../style.css";

interface BtnProps {
    onClick(): void,
    styleCss?: "primary" | "default",
}

export const Btn: React.FC<BtnProps> = (props) => {
    const { children, onClick, styleCss = "default" } = props;

    return <button className={`btn btn-${styleCss}`} onClick={onClick} > {children}</button>
}