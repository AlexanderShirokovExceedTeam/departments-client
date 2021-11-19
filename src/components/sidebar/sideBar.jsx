import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@mui/material';
import './sideBar.scss';

const SideBar = () => {

  return (
    <Container className="sidebar">
      <Link to="/departments">Departments</Link>
      {/* <Link to="/employee/all">Employee</Link> */}
    </Container>
  )
}

export default SideBar;
