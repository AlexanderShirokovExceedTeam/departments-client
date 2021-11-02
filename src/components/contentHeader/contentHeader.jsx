import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Container,
  Typography,
  Button
} from '@mui/material';
import './contentHeader.scss';

const ContentHeader = () => {
  const location = useLocation();

  const onClickAddHandler = () => {

  }

  return (
    <Container className="content">
      <Container className="content-header">
        <Typography variant='h5'>
          {location.pathname.includes('/departments') ? 'Departments' : 'Employee'}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onClickAddHandler()}
        >
          Add
        </Button>
      </Container>
      <Container>
        <Typography variant='h4'>
          temp content text
        </Typography>
      </Container>
    </Container>
  )
}

export default ContentHeader;
