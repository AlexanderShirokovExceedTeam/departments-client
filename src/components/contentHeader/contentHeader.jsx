import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Container,
  Typography,
  Button
} from '@mui/material';
import './contentHeader.scss';

const ContentHeader = ({ openModal, entity }) => {
  return (
    <Container className="content">
      <Container className="content-header">
        <Typography variant='h5'>
          {entity}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={openModal}
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
