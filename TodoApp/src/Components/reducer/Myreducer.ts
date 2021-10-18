import { Reducer } from "redux";

export type data = {
    taskId: number,
    taskHeading: string,
    taskDetail: string,
    isDeleted: boolean,
    color: "black" | "green" | "red" | "yellow" | "blue",
}
export interface ReducerPros {
    type: string,
    dataList: data,
}

export const Myreducer: Reducer<data[], ReducerPros> = (state = [], action) => {
    let temp;
    switch (action.type) {
        case "ADD_TASK":
            return [...state, action.dataList]
        case "DELETE_TASK":
            temp = [...state];
            for (let i = 0; i < temp.length; i++) {
                if (temp[i] === action.dataList) {
                    temp[i].isDeleted = true;
                    break;
                }
            }
            return temp;
        case "EDIT_TASK":
            temp = [...state];
            for (let i = 0; i < temp.length; i++) {
                if (temp[i].taskId === action.dataList.taskId) {
                    temp[i] = action.dataList;
                    break;
                }
            }
            return temp;

        default:
            return state
    }
}