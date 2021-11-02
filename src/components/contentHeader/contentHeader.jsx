import React from 'react';
import {
  Container,
  Typography,
  Button
} from '@mui/material';
import './contentHeader.scss';

const ContentHeader = ({ routeIsEmployee }) => {

  const onClickAddHandler = () => {

  }

  return (
    <Container className="content">
      <Container className="content-header">
        <Typography variant='h5'>
          {routeIsEmployee ? 'Employee' : 'Departments'}
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
