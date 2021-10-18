import React from "react";
import { Modal } from ".";
import { Btn } from "../Btn";

interface appProps {
    display: boolean
    deleteModleBtnClick(): void,
    cencleModalBtnClick(): void,
}

const DeleteTask: React.FC<appProps> = (props) => {

    const { display, cencleModalBtnClick, deleteModleBtnClick } = props;
    const body = "Are you sure ? You want to delete this task ?";
    const footer = (
        <div>
            <Btn onClick={deleteModleBtnClick} >
                Delete
            </Btn>
            <Btn styleCss="primary" onClick={cencleModalBtnClick} >
                cancal
            </Btn>
        </div>
    )
    return display ? <Modal Body={body} display={true} footer={footer} /> : null;

}
export default DeleteTask;