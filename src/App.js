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
        <Task taskID='0' done={this.props.done[0]} clickHandler = {() => { this.props.toggleState(0) }} />
        <Task taskID='1' done={this.props.done[1]} clickHandler = {() => { this.props.toggleState(1) }} />
        <Task taskID='2' done={this.props.done[2]} clickHandler = {() => { this.props.toggleState(2) }} />
      </ul>
      );
  }
}


TaskList.propTypes = {
};


class Task extends React.Component {
  render() {
    const isChecked    = this.props.done ? "checked" : "";
    return (
      <li>
        {this.props.taskID}
        <label>
          <input type="checkbox" checked={isChecked} onClick={this.props.clickHandler} />
        </label>
        <span>Aufgabe</span>
      </li>
    );
  }
}
//             <input type="checkbox" onClick={() => this.setState({ done: true }) } />

Task.propTypes = {
    
};
/*
Task.state.propTypes = {
    done: PropTypes.bool,
};
*/


export default App;
