import React from 'react';
import PropTypes from 'prop-types';
// import logo from './logo.svg';
import './App.css';


class App extends React.Component {
  render() {
    const openTasks = 5;
    return (
      <div id="App">
        <h1>ToDos ({openTasks} offen)</h1>
        <TaskList />
        <footer>
          <button>Neue Aufgabe</button>
         </footer>
      </div>
    );
/*
    return React.createElement('div',null,{
      React.createElement('h1',null,null),
      React.createElement(TaskList,null,null),
      React.createElement('footer',null,{
        React.createElement('button',null,null)
      }
    });
*/
    /*
      <div id="App">
        <TaskHeader />
        <TaskList />
        <TaskFooter />
      </div>

    */
  }
}

App.propTypes = {
  logo: PropTypes.number
};


class TaskList extends React.Component {
  render() {
    return (
      <ul>
        <Task />
        <Task />
        <Task />
      </ul>
      );
  }
}


TaskList.propTypes = {
};


class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      done: false,
    };
  }
  render() {
    const message      = this.state.done ? "+" : "-";
//    const message      = "<script>alert('boo')</script>";
    const isChecked    = this.state.done ? "checked" : "";
/*
    const clickHandler = this.state.done ? () => { return; } 
                                         : () => { this.setState({ done: true }) }
                         ;
*/
    const clickHandler = () => { this.setState({ done: !this.state.done }) };
    return (
      <li>
        {message}
        <label>
          <input type="checkbox" checked={isChecked} onClick={clickHandler} />
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
