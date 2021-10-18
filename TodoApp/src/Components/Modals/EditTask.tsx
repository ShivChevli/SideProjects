import React from 'react';
import { Modal } from '.';
import { Btn } from '../Btn';
import { ColorSelector } from '../Input/colorSelector';

interface EditTaskFunProps {
    taskHeading: string,
    taskDetail: string,
    editBtnClick(): void,
    cancelBtnClick(): void
    displayEditModle: boolean
    colorSelectorModal(el: string): void
}
export const EditTaskFun: React.FC<EditTaskFunProps> = (props) => {
    const { displayEditModle, colorSelectorModal, taskHeading, taskDetail, editBtnClick, cancelBtnClick } = props;
    const heading = taskHeading
    const body = <div>
        <p>
            {taskDetail}
        </p>
        <ColorSelector
            onClick={colorSelectorModal}
        />
    </div>
    const footer = (
        <div>
            <Btn onClick={editBtnClick} >
                Edit Task
            </Btn>
            <Btn onClick={cancelBtnClick} styleCss="primary">
                Cancle
            </Btn>
        </div>
    )
    return (
        <Modal
            Hader={heading}
            Body={body}
            footer={footer}
            display={displayEditModle}
        />
    )
}