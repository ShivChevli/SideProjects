import React from 'react';
import "./Components/style.css";
import TaskManage from './Components/TaskManager';
import { createStore } from 'redux';
import { Myreducer } from './Components/reducer/Myreducer';
import { Provider } from 'react-redux';

interface appProps {

}
interface appState {
  taskHeading: string,
  taskDetail: string,
}

const store = createStore(Myreducer, [{
  taskId: 0,
  taskHeading: "task 1",
  taskDetail: "detail 1",
  isDeleted: false,
  color: 'green',
}, {
  taskId: 1,
  taskHeading: "task 2",
  taskDetail: "detail 2",
  isDeleted: false,
  color: 'blue',
}, {
  taskId: 2,
  taskHeading: "task 3",
  taskDetail: "detail 3",
  isDeleted: false,
  color: 'black',
}, {
  taskId: 3,
  taskHeading: "task 4",
  taskDetail: "detail 4",
  isDeleted: false,
  color: 'red',
}, {
  taskId: 4,
  taskHeading: "task 5",
  taskDetail: "detail 5",
  isDeleted: false,
  color: 'yellow',
}
]);
class App extends React.Component<appProps, appState>{

  constructor(props: appProps) {
    super(props);
    this.state = {
      taskHeading: "",
      taskDetail: "",
    }
  }

  render() {
    return (
      <Provider store={store}>
        <TaskManage />
      </Provider>
    )
  }

}

export default App;
