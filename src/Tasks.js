import React, { useState, useEffect, useRef } from 'react';
import { Formik, useFormik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import './App.css';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Form as BSForm } from 'react-bootstrap';

// const App2 = props => {
function Tasks(props) {

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
      <ErrorBoundary
        done={done}
        toggleState={toggleState}
        tasks={tasks}
        handleNewTask={handleNewTask}
        openTasks={openTasks}
        />
    );
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div> Error! </div>
      );
    } else {
      return (
        <React.Fragment>
          <h1>ToDos ({this.props.openTasks} offen)</h1>
          <TaskList
            done={this.props.done}
            toggleState={this.props.toggleState}
            tasks={this.props.tasks}
          />
          <NewTask 
            handleNewTask={this.props.handleNewTask}
          />
        </React.Fragment>
      );
/*
      return (
        <React.Fragment>
          <h1>ToDos ({this.props.openTasks} offen)</h1>
          { dynamicList(Task,"tasks") }
          <NewTask 
            handleNewTask={this.props.handleNewTask}
          />
        </React.Fragment>
*/
    }
  }
  componentDidCatch(error,errorInfo) {
    this.state = { hasError: true };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
}


class ErrorBoundaryIdeal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }
  render() {
    return (
      <TaskList { ...this.props } />
    );
  }
  componentDidCatch(error,errorInfo) {
    this.state = { hasError: true };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
}


/*
class ToDo {
  description;
  dueDate;
  isDone;
}
*/


function dynamicList(Component,listName) {
  
//  const {listName,maxSize,usePagination,...childProps} = props;

  return ( (props) => {
    const children = props[listName].map( (elem,elemID) => {
      return (
        <Component {...props}  elemID={elemID} />
      );
    });

    return (<ul> {children} </ul>);
  });
}

function DynamicList(Component,listName) {
  
//  const {listName,maxSize,usePagination,...childProps} = props;

  return ( (props) => {

    const children = props[listName].map( (elem,elemID) => {
      
      const comp = new Component();
      comp.props = props;
      comp.props.elemID = elemID;
      return comp.render();
    });

    return (<ul> {children} </ul>);
  });
}

function TaskList(props) {
  const tasks = props.tasks.map( (task,taskID) => {
    return (
      <Task taskID       = { taskID }
            done         = { props.done[taskID] }
            clickHandler = { () => { props.toggleState(taskID) } } />
    );
  });

  return (
    <Container>
      {tasks}
    </Container>
  );
}

function Task(props) {
    const isChecked    = props.done ? "checked" : "";
    return (
      <Row>
        <Col>
          {props.taskID}
        </Col>  
        <Col>
          <label>
            <BSForm.Check checked={isChecked} onClick={props.clickHandler} />
          </label>
        </Col>
        <Col>
          <span>Aufgabe</span>
        </Col>
      </Row>
    );
}


function NewTask2(props) {

  const MyInput = React.forwardRef( (props,ref) => {
    return <NewTaskInput />
  });

  const inputRef = useRef(null);


  return (
    <footer>
      <MyInput />
      <NewTaskButton input={inputRef} handleNewTask={ props.handleNewTask } />
    </footer>
  );
}

function NewTaskInput(props) {

  return (
      <label>
      Neu:
        <input type="text" />
      </label>
  );
}

function NewTaskButton(props) {
 
  useEffect( () => 
    { console.log(props.input); }
  );

  // const currentText = props.input.current.value;
  const currentText = "";

  return (    
      <button onClick={ () => props.handleNewTask(currentText) } >+</button>
  );
}



function NewTask3(props) {

  const validate = (values) => {
    const errors = {};
    if (values.todoName.length < 6) {
      errors.todoName = 'Name zu kurz';
    }
    if (!/^[a-zA-Z]*$/i.test(values.todoName)) {
      errors.somethingRandom = 'Darf nur aus Buchstaben bestehen';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      todoName: "",
    },
    validate,
    onSubmit: (values) => {
      props.handleNewTask(values.todoName);
    },
  });

  return (
    <form onSubmit={ formik.handleSubmit } >
      <label>
      { formik.errors.todoName
        ? <div class="error"> { formik.errors.todoName } </div>
        : null
      }
      { formik.errors.somethingRandom
        ? <div class="error"> { formik.errors.somethingRandom } </div>
        : null
      }
      Neu:
        <input type="text"
               name="todoName"
               value={ formik.values.todoName }
               onChange={ formik.handleChange }
               onBlur={ formik.handleBlur }/>
      </label>
      <button type="submit">+</button>
    </form>
  );
}

function NewTask4(props) {

  const formik = useFormik({
    initialValues: {
      todoName: "",
    },
    validationSchema: Yup.object({
      todoName: Yup.string().min(7,'Zu kurz').required('muss angegeben werden'),
    }),
    onSubmit: (values) => {
      props.handleNewTask(values.todoName);
    },
  });

  return (
    <form onSubmit={ formik.handleSubmit } >
      <label>
      { formik.touched.todoName && formik.errors.todoName
        ? <div class="error"> { formik.errors.todoName } </div>
        : null
      }
      Neu:
        <input { ...formik.getFieldProps('todoName') } />
      </label>
      <button type="submit">+</button>
    </form>
  );
}

function NewTask5(props) {

  // throw new Error('bang');

  return (
    <Formik
      initialValues= { {
         todoName: "",
        }}
      validationSchema= {
        Yup.object({
          todoName: Yup.string().min(7,'Zu kurz').required('muss angegeben werden'),
        }) }
      onSubmit= {
        (values) => { props.handleNewTask(values.todoName); }
      }
    >
    { formik => (
        <Form>
          <div class="error">
            <ErrorMessage name="todoName"/>
          </div>
          <BSForm.Label htmlForm="todoName">Neu:</BSForm.Label>
          <Field name="todoName" type="text" />
          <Button variant='primary' type="submit">+</Button>
        </Form>
    ) }
    </Formik>
  );
}

function NewTask(props) {
  const formik = useFormik({
    initialValues: {
      todoName: "",
    },
    validationSchema: Yup.object({
      todoName: Yup.string().min(7,'Zu kurz').required('muss angegeben werden'),
    }),
    onSubmit: (values) => {
      props.handleNewTask(values.todoName);
    },
  });

  return (
    <Container>
      <Row>
        <Col>
          <BSForm onSubmit={ formik.handleSubmit } >
          <BSForm.Group>
            <BSForm.Label>
            { formik.touched.todoName && formik.errors.todoName
              ? <div class="error"> { formik.errors.todoName } </div>
              : null
            }
            Neu:
            </BSForm.Label>
            <BSForm.Control { ...formik.getFieldProps('todoName') } />
          </BSForm.Group>
          <Button type="submit">+</Button>
          </BSForm>
        </Col>
      </Row>
    </Container>
  );
}

export { Task, NewTask, Tasks };

