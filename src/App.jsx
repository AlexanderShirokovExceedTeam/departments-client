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

const department = {
  label: 'Department',
  name: '',
  description: ''
}

const employee = {
  label: 'Employee',
  email: '',
  name: '',
  age: '',
  position: '',
  departmentName: ''
}

const App = () => {

  return (
    <Container className="App">
      <Typography className='header' variant='h1'>
        Department CMS
      </Typography>
      <Switch>
        <Route path='/departments' render={() => <MainContainer entity={department}/>} />
        <Route path='/employee' render={() => <MainContainer entity={employee}/>} />
        <Redirect from='/' to='departments'/>
      </Switch>
    </Container>
  );
}

export default App;
