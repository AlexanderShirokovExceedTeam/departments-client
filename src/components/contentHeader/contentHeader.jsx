import React from 'react';
import {
  Container,
  Typography,
  Button
} from '@mui/material';
import RenderEntity from '../renderEntity/renderEntity';
import './contentHeader.scss';

const ContentHeader = ({ openModal, entity, departments, employee }) => {
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
      <RenderEntity
        entity={entity}
        departments={departments}
        employee={employee}
      />
    </Container>
  )
}

export default ContentHeader;
