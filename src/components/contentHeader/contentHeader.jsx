import React from 'react';
import {
  Container,
  Typography,
  Button
} from '@mui/material';
import RenderEntity from '../renderEntity/renderEntity';
import './contentHeader.scss';

const ContentHeader = ({ openModal, entity, departments, employee }) => {
  console.log(`departments`, departments)
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
      {
        departments.map((item, index) => {
          <Container
            key={`dep-prop-${index}`}
          >
            <Typography>
              {item.name}
            </Typography>
            <Typography>
              {item.description}
            </Typography>
          </Container>
        })
      }
      {/* <Container className="render-entity">
      {
        entity === 'Departments' ?
        departments.map((item, index) => {
          <Container
            key={`dep-prop-${index}`}
          >
            {
              item.map(property => {
                <Typography>
                  {property}
                </Typography>
              })
            }
          </Container>
        }) :
        entity === 'Employee' ?
        employee.map((item, index) => {
          <Container
          key={`empl-prop-${index}`}
          >
            {
              item.map(property => {
                <Typography>
                  {property}
                </Typography>
              })
            }
          </Container>
        }) :
        <>
        </>
      }
    </Container> */}
      {/* <RenderEntity
        entity={entity}
        departments={departments}
        employee={employee}
      /> */}
    </Container>
  )
}

export default ContentHeader;
