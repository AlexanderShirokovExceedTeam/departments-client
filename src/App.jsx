import React from 'react';
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import {
  Container,
  Typography
} from '@mui/material';
import MainContainer from './components/mainContainer/mainContainer';
import './App.scss';

const App = () => {
  const entDepartments = {
    label: 'Department',
    name: '',
    description: ''
  }

  const entEmployee = {
    label: 'Employee',
    email: '',
    name: '',
    age: '',
    position: '',
    departmentName: ''
  }

  return (
    <Container className="App">
      <Typography className='header' variant='h1'>
        Department CMS
      </Typography>
      <Switch>
        <Route path='/departments' render={() => <MainContainer entity={entDepartments}/>} />
        <Route path='/employee' render={() => <MainContainer entity={entEmployee}/>} />
        <Redirect from='/' to='departments'/>
      </Switch>
    </Container>
  );
}

export default App;
