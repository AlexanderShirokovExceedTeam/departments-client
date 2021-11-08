import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  IconButton
} from "@mui/material";
import { Edit } from '@mui/icons-material';
import { Delete } from '@mui/icons-material';
import './renderEntity.scss';

const RenderEntity = ({ entity, departments, employee }) => {
  const [sortedEmployee, setSortedEmployee] = useState('');

  const handleEdit = () => {
    //  setEntity current edited value
  }

  const handleDelete = () => {
    
  }

  const filterHandler = (currentDepartmentName, currentIndex) => {
    setSortedEmployee([...employee.filter((asd) => 
      asd.departmentName === currentDepartmentName)]);
    //  entity='Employee'
    console.log('currentIndex is', currentIndex);
    console.log('sortedEmployee.departmentName is', sortedEmployee.departmentName);
    console.log('currentDepartmentName is', currentDepartmentName);
  }
  console.log('sortedEmployee is', sortedEmployee);
  
  return (
    <Container className="render-entity">
      {
        entity === 'Departments' ?
        departments.map((item, index) => {
          return (
            <Container
              key={`dep-prop-${index}`}
              className={`department department-${index}`}
              onClick={() => filterHandler(item.name, index)}
            >
              <Typography>
                {item.name}
              </Typography>
              <Typography>
                {item.description}
              </Typography>
              <IconButton
                type="Button"
                onClick={() => handleEdit()}
              >
                <Edit />
              </IconButton>
              <IconButton
                type="Button"
                onClick={() => handleDelete()}
                disabled={true}
              >
                <Delete />
              </IconButton>
            </Container>
          )
        }) :
        entity === 'Employee' ?
        employee.map((item, index) => {
          return (
            <Container
              key={`empl-prop-${index}`}
              className={`employee employee-${index}`}
            >
              <Typography>
                {item.email}
              </Typography>
              <Typography>
                {item.name}
              </Typography>
              <Typography>
                {item.age}
              </Typography>
              <Typography>
                {item.position}
              </Typography>
              <IconButton
                type="Button"
                onClick={() => handleEdit()}
              >
                <Edit />
              </IconButton>
              <IconButton
                type="Button"
                onClick={() => handleDelete()}
              >
                <Delete />
              </IconButton>
            </Container>
          )
        }) :
        <>
        </>
      }
    </Container>
  )
}

export default RenderEntity;
