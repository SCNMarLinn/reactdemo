import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './App.css';

// const App2 = props => {
function App(props) {

    const [openTasks,setOpenTasks] = useState(3);
    const [done,setDone]           = useState(Array(3).fill(false));
    const [tasks,setTasks]         = useState(Array(3).fill(null));


    useEffect( function onRender() {
      document.title = `${openTasks} Aufgaben offen`;
      return function cleanup() {}
    } );
    /*
    useEffect( function onRender() {
      document.title = `${openTasks} Aufgaben offen`;
    } );
    */
    const toggleState = taskID => {
      done[taskID] = !done[taskID];
      setDone(done);
      setOpenTasks(openTasks + ( done[taskID] ? -1 : 1 ) );
    };

    const handleNewTask = (newTask) => {
      tasks.push(newTask);
      setTasks(tasks);
      setOpenTasks(openTasks + 1);
      done.push(false);
      setDone(done);
    };

    return (
      <div id="App">
        <h1>ToDos ({openTasks} offen)</h1>
        <TaskList done={done} toggleState={toggleState} tasks={tasks}/>
        <NewTask handleNewTask={handleNewTask} />
      </div>
    );
}


/*
class ToDo {
  description;
  dueDate;
  isDone;
}
*/

function TaskList(props) {
  const tasks = props.tasks.map( (task,taskID) => {
    return (
      <Task taskID       = { taskID }
            done         = { props.done[taskID] }
            clickHandler = { () => { props.toggleState(taskID) } } />
    );
  });

  return (<ul> {tasks} </ul>);
}

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


function NewTask(props) {

  const [currentText,setText] = useState("");

  return (
    <footer>
      <label>
      Neu:
        <input type="text" value={ currentText } onChange={ (event) => setText(event.target.value) } />
      </label>
      <button onClick={ () => props.handleNewTask(currentText) } >+</button>
    </footer>
  );
}

export default App;
