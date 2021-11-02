import React from 'react';
import {
  Container,
  Typography
} from '@mui/material';
import MainContainer from './components/main/mainContainer';
import './App.scss';

const App = () => {
  return (
    <Container className="App">
      <Typography className='header' variant='h1'>
        Department CMS
      </Typography>
      <MainContainer>
        
      </MainContainer>
    </Container>
  );
}

export default App;
