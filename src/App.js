import React from 'react';
import PropTypes from 'prop-types';
// import logo from './logo.svg';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      done      : Array(3).fill(false),
      openTasks : 3,
    };
  }
  render() {
    return (
      <div id="App">
        <h1>ToDos ({this.state.openTasks} offen)</h1>
        <TaskList done={this.state.done} toggleState={this.toggleState()} />
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

App.propTypes = {
  logo: PropTypes.number
};


class TaskList extends React.Component {
  render() {
    return (
      <ul>
        {this.renderTask(0)}
        {this.renderTask(1)}
        {this.renderTask(2)}
      </ul>
      );
  }
  renderTask(taskID) {
    return (
      <Task taskID       = {taskID}
            done         = {this.props.done[taskID]}
            clickHandler = { () => { this.props.toggleState(taskID) }} />
    );
  }
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
