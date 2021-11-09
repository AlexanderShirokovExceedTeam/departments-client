import React from 'react';
import {
  Container,
  Typography,
  Button
} from '@mui/material';
import './headerComponent.scss';

const HeaderComponent = ({ openModal, label}) => {
  return (
    <Container className="content-header">
      <Typography variant='h5'>
        {label}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={openModal}
      >
        Add
      </Button>
    </Container>
  )
}

export default HeaderComponent;
