import React, { Dispatch } from "react";
import { connect, MapStateToProps } from "react-redux";
import { Btn } from "../Btn";
import { AddTaskModaleFun } from "../Modals/Add_Task";
import DeleteTask from "../Modals/DeleteTask";
import { EditTaskFun } from "../Modals/EditTask";
import { data, ReducerPros } from "../reducer/Myreducer";

interface taskProps {

}
interface taskState {
    taskList: data[] | null,
    newTaskHeading: string,
    newTaskDetail: string,
    addTaskModleDisplay: boolean,
    editTaskModeDisplay: boolean,
    deleteTaskModleDisplay: boolean,
    editeData: data | null
}

interface StoretaskState {
    tasksList: data[]

}
const mapStateProps: MapStateToProps<StoretaskState, taskProps, data[]> = (state, owenProps) => {
    return {
        tasksList: state
    }
}

type taskManagerProps = StoretaskState & taskProps & { dispatch: Dispatch<ReducerPros> };


class TaskManage extends React.Component<taskManagerProps, taskState>{
    constructor(props: taskManagerProps) {
        super(props);
        this.state = {
            deleteTaskModleDisplay: false,
            taskList: null,
            newTaskHeading: "",
            newTaskDetail: "",
            addTaskModleDisplay: false,
            editTaskModeDisplay: false,
            editeData: null,
        }
    }

    addTask = () => {
        console.log("Add task");
        this.setState({
            addTaskModleDisplay: true,
            newTaskDetail: "",
            newTaskHeading: "",
        })
    }

    addtaskBtnModleClick = () => {
        const { newTaskHeading, newTaskDetail, editeData } = this.state;
        let temp = this.props.tasksList.length;
        editeData ?
            this.props.dispatch({
                type: "EDIT_TASK",
                dataList: {
                    taskId: editeData.taskId,
                    taskHeading: newTaskHeading,
                    taskDetail: newTaskDetail,
                    isDeleted: false,
                    color: editeData.color,
                },
            })
            :
            this.props.dispatch({
                type: "ADD_TASK",
                dataList: {
                    taskId: temp,
                    taskHeading: newTaskHeading,
                    taskDetail: newTaskDetail,
                    isDeleted: false,
                    color: "green",
                },
            })

        this.setState({
            newTaskDetail: "",
            newTaskHeading: "",
            editeData: null,
            addTaskModleDisplay: false,
        })
    }

    taskCardClick = (d: data) => {
        this.setState({
            editTaskModeDisplay: true,
            editeData: d
        })
    }

    cancleBtnModleClick = () => {
        this.setState({
            addTaskModleDisplay: false,
            editTaskModeDisplay: false,
            deleteTaskModleDisplay: false,
        })
    }
    changeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        this.setState({
            newTaskHeading: value
        })
    }
    changeTextArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = event.currentTarget;
        this.setState({
            newTaskDetail: value
        })
    }
    editBtnClick = () => {
        const { editeData } = this.state;
        this.setState({
            addTaskModleDisplay: true,
            newTaskDetail: editeData!?.taskDetail,
            newTaskHeading: editeData!?.taskHeading,
            editTaskModeDisplay: false,
        })
    }

    deletModalClick = (d: data) => {
        this.setState({
            deleteTaskModleDisplay: true,
            editeData: d,
        })
    }
    deleteTask = () => {
        const { editeData } = this.state;
        this.props.dispatch({
            type: "DELETE_TASK",
            dataList: editeData!,
        })
        this.setState({
            deleteTaskModleDisplay: false,
            editeData: null
        })

    }

    lableSelector = (el: string) => {
        const lable = el;
        const { editeData } = this.state;
        // let temp = { ...editeData!, color: lable };
        // const temp = {
        //     taskId: editeData!?.taskId,
        //     taskHeading: editeData!?.taskHeading,
        //     taskDetail: editeData!?.taskDetail,
        //     isDeleted: editeData!?.isDeleted,
        //     color: lable,
        // } as data;
        const temp = { ...editeData, color: lable } as data;
        this.props.dispatch({
            type: "EDIT_TASK",
            dataList: temp
        })
        this.setState({
            editTaskModeDisplay: false
        })
    }

    render() {
        const { tasksList } = this.props;
        let flag = true;
        const { editeData, addTaskModleDisplay, editTaskModeDisplay, newTaskDetail, newTaskHeading, deleteTaskModleDisplay } = this.state;
        return (
            <div >
                <h1 className="Main-heading">Task Notes</h1>
                <div className="list-div">
                    {
                        tasksList.map(data => {
                            return data.isDeleted ? null : <div className={`task-notes task-lable-${data.color}`} key={data.taskId}>
                                {flag = false}
                                <button className="modale-close" onClick={() => this.deletModalClick(data)} > &times; </button>
                                <div onClick={() => this.taskCardClick(data)}>
                                    <h1>{data.taskHeading}</h1>
                                    <p>
                                        {data.taskDetail}
                                    </p>
                                </div>
                            </div>
                        })
                    }
                </div>
                {
                    flag ? <h1>Task List is Emptly</h1> : null
                }
                <div className="taskList-div">
                    <Btn onClick={this.addTask} styleCss="primary">
                        Add Task
                    </Btn>
                </div>
                <AddTaskModaleFun
                    AddTaskBtnClick={this.addtaskBtnModleClick}
                    cancleBtnClick={this.cancleBtnModleClick}
                    handleInputChange={this.changeInput}
                    handleTextAreaChange={this.changeTextArea}
                    TaskHeading={newTaskHeading}
                    TaskDetail={newTaskDetail}
                    addTaskModleDisplay={addTaskModleDisplay}
                />
                <EditTaskFun
                    editBtnClick={this.editBtnClick}
                    cancelBtnClick={this.cancleBtnModleClick}
                    displayEditModle={editTaskModeDisplay}
                    taskDetail={editeData!?.taskDetail}
                    taskHeading={editeData!?.taskHeading}
                    colorSelectorModal={this.lableSelector}
                />
                <DeleteTask
                    display={deleteTaskModleDisplay}
                    cencleModalBtnClick={this.cancleBtnModleClick}
                    deleteModleBtnClick={this.deleteTask}
                />
            </div>
        )
    }
}

export default connect(mapStateProps)(TaskManage)