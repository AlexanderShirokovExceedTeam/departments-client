import React from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import { Container } from '@mui/material';
import './sideBar.scss';

const SideBar = ({ setRouteIsEmployee }) => {

  return (
    <Container className="sidebar">
      <Link        
        to="/departments"
        onClick={() => setRouteIsEmployee(false)}
      >Departments</Link>
      <Link
        to="/employee"
        onClick={() => setRouteIsEmployee(true)}
      >Employee</Link>
    </Container>
  )
}

export default SideBar;
