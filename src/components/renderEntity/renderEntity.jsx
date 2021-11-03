import React from "react";
import { Container, Typography } from "@mui/material";
import './renderEntity.scss';

const RenderEntity = ({ entity, departments, employee }) => {
  return (
    <Container className="render-entity">
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
    </Container>
  )
}

export default RenderEntity;
