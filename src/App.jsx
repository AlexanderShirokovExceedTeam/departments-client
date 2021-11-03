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
  return (
    <Container className="App">
      <Typography className='header' variant='h1'>
        Department CMS
      </Typography>
      <Switch>
        <Route path='/departments' render={() => <MainContainer entity='Departments'/>} />
        <Route path='/employee' render={() => <MainContainer entity='Employee'/>} />
        <Redirect from='/' to='departments'/>
      </Switch>
    </Container>
  );
}

export default App;
