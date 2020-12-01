import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import logo from './logo.svg';
import './App.css';



class App2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      done      : Array(3).fill(false),
      tasks     : Array(3).fill(null),
      openTasks : 3,
    };
  }
  render() {
    return (
      <div id="App">
        <h1>ToDos ({this.state.openTasks} offen)</h1>
        <TaskList done={this.state.done} toggleState={this.toggleState()} tasks={this.state.tasks}/>
        <footer>
          <button>Neue Aufgabe</button>
         </footer>
      </div>
    );
  }
  toggleState() {
    return taskID => {
      const doneCopy = this.state.done.slice();
      doneCopy[taskID] = !doneCopy[taskID];
      this.setState({ done: doneCopy });
      this.setState({ openTasks: this.state.openTasks + ( doneCopy[taskID] ? -1 : 1 ) });
    };
  }
}


// const App2 = props => {
function App(props) {

    const [openTasks,setOpenTasks] = useState(3);
    const [done,setDone]           = useState(Array(3).fill(false));
    const [tasks,setTasks]         = useState(Array(3).fill(null));

    const toggleState = taskID => {
      done[taskID] = !done[taskID];
      setDone(done);
      setOpenTasks(openTasks + ( done[taskID] ? -1 : 1 ) );
    };

    return (
      <div id="App">
        <h1>ToDos ({openTasks} offen)</h1>
        <TaskList done={done} toggleState={toggleState} tasks={tasks}/>
        <footer>
          <button>Neue Aufgabe</button>
         </footer>
      </div>
    );
}

/*
function toggleState(taskID) {
  const [done,setDone] = useState(Array(3).fill(false));
  done[taskID] = !done[taskID];
  setDone(done);

  const [openTasks,setOpenTasks] = useState(3);
  setOpenTasks(openTasks + ( done[taskID] ? -1 : 1 ) );
};
*/


App.propTypes = {
  logo: PropTypes.number
};

/*
class ToDo {
  description;
  dueDate;
  isDone;
}
*/

class TaskList extends React.Component {
  render() {
    const tasks = this.props.tasks.map( (task,taskID) => {
        return this.renderTask(task,taskID);
    });
    // const tasks = this.props.tasks.map(this.renderTask);

    return (
      <ul>
        {tasks}
      </ul>
    );
  }
 
  renderTask(task,taskID) {
    return (
      <Task taskID       = {taskID}
            done         = {this.props.done[taskID]}
            clickHandler = { () => { this.props.toggleState(taskID) }} />
    );
  }
}

function TaskList2(props) {
  const tasks = props.tasks.map( (task,taskID) => {
    return (
      <Task taskID       = { taskID }
            done         = { props.done[taskID] }
            clickHandler = { () => { props.toggleState(taskID) } } />
    );
  });

  return (<ul> {tasks} </ul>);
}


TaskList.propTypes = {
};


function Task(props) {
    const isChecked    = props.done ? "checked" : "";
    return (
      <li>
        {props.taskID}
        <label>
          <input type="checkbox" checked={isChecked} onClick={props.clickHandler} />
        </label>
        <span>Aufgabe</span>
      </li>
    );
}

Task.propTypes = {
    
};
/*
Task.state.propTypes = {
    done: PropTypes.bool,
};
*/


export default App;
