import { Switch, Route, Redirect, Link } from 'react-router-dom';
import { Container } from '@material-ui/core';
import './sideBar.scss';

const SideBar = () => {

  return (
    <Container className="sidebar">
      <Link to="/departments">Departments</Link>
      <Link to="/employee">Employee</Link>
    </Container>
  )
}

export default SideBar;
