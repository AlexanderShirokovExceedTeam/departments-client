import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Container, Typography } from '@material-ui/core';
import SideBar from '../sidebar/sideBar';
import './mainContainer.scss';

const MainContainer = () => {
  return (
    <Container className="main-container">
      <SideBar />
      <Typography className="content" variant='h1'>
        content this
      </Typography>
    </Container>
  )
}

export default MainContainer;
