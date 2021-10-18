import React from "react";
import { Modal } from ".";
import { Btn } from "../Btn";
import { Input } from "../Input";
import { TextArea } from "../TextArea";

interface addTaskModaleProps {
    handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void,
    handleTextAreaChange(event: React.ChangeEvent<HTMLTextAreaElement>): void,
    AddTaskBtnClick(): void,
    cancleBtnClick(): void,
    TaskHeading: string,
    TaskDetail: string,
    addTaskModleDisplay: boolean
}
export const AddTaskModaleFun: React.FC<addTaskModaleProps> = (props) => {
    const { AddTaskBtnClick, TaskDetail, addTaskModleDisplay, TaskHeading, handleInputChange, handleTextAreaChange, cancleBtnClick } = props;
    const heading = "Add Task";
    const body = (
        <div>
            <Input
                lable="Task Heading"
                name="taskHeading"
                onChange={handleInputChange}
                value={TaskHeading}
            />
            <TextArea
                onChange={handleTextAreaChange}
                nameArea="taskDetail"
                lable="Task detail"
                value={TaskDetail}
            />
        </div >
    )
    const footer = (
        <div>
            <Btn onClick={AddTaskBtnClick} styleCss="primary" >Add</Btn>
            <Btn onClick={cancleBtnClick} styleCss="default" >close</Btn>
        </div>
    )
    return (
        <Modal Body={body} display={addTaskModleDisplay} Hader={heading} footer={footer} />
    )
}
