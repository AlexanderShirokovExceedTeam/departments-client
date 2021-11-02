import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import SideBar from '../sidebar/sideBar';
import ContentHeader from '../contentHeader/contentHeader';
import './mainContainer.scss';

const MainContainer = () => {

  return (
    <Container className="main-container">
      <SideBar />
      <ContentHeader />
    </Container>
  )
}

export default MainContainer;
