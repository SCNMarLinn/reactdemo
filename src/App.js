import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { Tasks, NewTask, Task } from './Tasks.js';
import Projects from './Projects.js';
import { Button, Container, Row, Col, Nav } from 'react-bootstrap';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useRouteMatch,
    useParams,
    useLocation
  } from 'react-router-dom';

function App(props) {
    return (
      <Router>
        <Nav>
          <Nav.Item>
            <Nav.Link>
              <Link to='/planning'>Planung</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              <Link to='/test'>Test</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              <Link to='/files'>Dateien</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              <Link to='/weather'>Wetter</Link>
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <Switch>
          <Route path='/planning'>
            <Planning/>
          </Route>
          <Route path='/planung'>
            <Redirect to='/planning' />
          </Route>

          <Route path='/files'>
            <Files/>
          </Route>

          <Route path='/weather'>
            <Weather/>
          </Route>

          <Route path='/:taskID'>
            <RedirectToTask/>
          </Route>

          <Route exact path='/'>
            <h1>Hello World</h1>
          </Route>
          <Route path='*'>
            <div>
              <h1>404 not found</h1>
            </div>
          </Route>
        </Switch>
      </Router>
    );
}
/*
/planning/tasks
/planning/projects
/files
*/

function RedirectToTask(props) {
  let { taskID } = useParams();
  const match    = useRouteMatch();

  return (
    <Redirect to={ `/planning/task/${taskID}` } />
  );
}

function Planning(props) {

  const match =  useRouteMatch();

  return (
      <Router>
        <nav>
          <ul>
            <li>
              <Link to={ `${match.path}/tasks` }>Aufgaben</Link>
            </li>
            <li>
              <Link to={ `${match.path}/projects` }>Projekte</Link>
            </li>
            <li>
              <Link to={ `${match.path}/task/new` }>Neue Aufgabe</Link>
            </li>            
            <li>
              <Link to={ `${match.path}/task/next` }>Nächste Aufgabe</Link>
            </li>
          </ul>
        </nav>

        <Switch>

          <Route path={ `${match.path}/tasks/:isDone` } children={ <FilteredTasks/> } />
          <Route path={ `${match.path}/tasks2` } children={ <FilteredTasks2/> } />

          <Route path={ `${match.path}/tasks` } >
            <Tasks/>
          </Route>
          <Route path={ `${match.path}/projects` }>
            <Projects/>
          </Route>
          <Route path={ `${match.path}/task/new` } children={ <NewTaskWrapper/> } />
          <Route path={ `${match.path}/task/next` } children={ <SingleTask/> } />
          <Route path={ `${match.path}/task/:taskID` } children={ <SingleTask/> } />
          <Route exact path={ match.path }>
            <h1>Hello Planning</h1>
          </Route>
          <Route path='*'>
            <div>
              <h1>404 not found</h1>
            </div>
          </Route>
        </Switch>
      </Router>
  );
}

function FilteredTasks2(props) {
  const useQuery = () => { return new URLSearchParams(useLocation().search) };
  const isDone = useQuery().get('isdone');

  useEffect( () => {console.log(isDone); } );

  return (
    <React.Fragment>
      <hr/>
      <div> Zeige nur Aufgaben, die { isDone ? '' : 'nicht' } erledigt sind.</div>
      <Tasks/>
    </React.Fragment>
  );
}

function FilteredTasks(props) {
  let { isDone } = useParams();
  return (
    <React.Fragment>
      <hr/>
      <div> Zeige nur Aufgaben, die { isDone==='true' ? '' : 'nicht' } erledigt sind.</div>
      <Tasks/>
    </React.Fragment>
  );
}

function NewTaskWrapper(props) {
  return (
    <NewTask handleNewTask={ null } />
  );
}

function SingleTask(props) {

  let { taskID } = useParams();

  if (taskID === null){
    taskID = 0;
  }

  if ( taskID > 3 ) {
    return (
      <React.Fragment>
        <p class="error">Keine Aufgabe mit ID { taskID } gefunden</p>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Task taskID       = { taskID }
            done         = { true }
            clickHandler = { null } />
    </React.Fragment>
  );

}


function Files(props) {
  return (
    <React.Fragment>
      <h1>Dateien</h1>
      <ul>
        <li>Datei 1</li>
        <li>Datei 2</li>
        <li>Datei 3</li>
      </ul>
    </React.Fragment>
  );
}

function Weather(props) {

  const [result,setResultOuter] = useState(null);

  useEffect( () => {
    
    axios.get('https://api.weather.gov/points/39.7456,-97.0892')
         .then( newResult => {
            setResultOuter(newResult.data.properties.forecast);
         })
  });

  return (
    <React.Fragment>
      <h1>Wetter</h1>
      <div>{ result }</div>
    </React.Fragment>
  );
}

// besser: class Weather …

export default App;