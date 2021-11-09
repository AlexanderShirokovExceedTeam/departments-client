import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  IconButton
} from "@mui/material";
import { Edit } from '@mui/icons-material';
import { Delete } from '@mui/icons-material';
import './renderEntity.scss';

const RenderEntity = ({ entity, departments, employee, setIsEdit, openModal, okHandler, formObject, setFormObject }) => {
  const [sortedEmployee, setSortedEmployee] = useState('');

  const handleEdit = (editedItem) => {
    setIsEdit();
    openModal();
    setFormObject(editedItem);
  }

  const handleDelete = (item, index) => {
    
  }

  const filterHandler = (currentDepartmentName) => {
    setSortedEmployee([...employee.filter((currentEmployee) =>
      currentEmployee.departmentName === currentDepartmentName)]);
  }
  
  return (
    <Container className="render-entity">
      {
        entity.label === 'Department' ?
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
                onClick={() => handleEdit(item)}
              >
                <Edit />
              </IconButton>
              <IconButton
                type="Button"
                onClick={() => handleDelete(item, index)}
                disabled={true}
              >
                <Delete />
              </IconButton>
            </Container>
          )
        }) :
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
                onClick={() => handleEdit(item)}
              >
                <Edit />
              </IconButton>
              <IconButton
                type="Button"
                onClick={() => handleDelete(item, index)}
              >
                <Delete />
              </IconButton>
            </Container>
          )
        })
      }
    </Container>
  )
}

export default RenderEntity;
