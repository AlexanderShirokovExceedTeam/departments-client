import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Container, Typography } from '@material-ui/core';
import './mainContainer.scss';

const MainContainer = () => {
  return (
    <Container className="main-container">      
      <Typography className="sidebar" variant='h1'>
        sidebar this
      </Typography>
      <Typography className="content" variant='h1'>
        content this
      </Typography>
    </Container>
  )
}

export default MainContainer;
