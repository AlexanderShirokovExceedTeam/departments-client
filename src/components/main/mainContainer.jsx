import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import SideBar from '../sidebar/sideBar';
import ContentHeader from '../contentHeader/contentHeader';
import './mainContainer.scss';

const MainContainer = () => {
  const [routeIsEmployee, setRouteIsEmployee] = useState(false);

  return (
    <Container className="main-container">
      <SideBar
        setRouteIsEmployee={setRouteIsEmployee}
      />
      <ContentHeader
        routeIsEmployee={routeIsEmployee}
      />
    </Container>
  )
}

export default MainContainer;
