import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Container,
  Typography,
  IconButton
} from "@mui/material";
import { Edit, Delete } from '@mui/icons-material';
import './renderEntity.scss';

const RenderEntity = ({ entity, departments, employee, setIsEdit, openModal, setFormObject, setIndexOfEdit, deleteEntity, currentDepartment, setCurrentDepartment }) => {
  const history = useHistory();
  const [sortedEmployee, setSortedEmployee] = useState([]);

  useEffect(() => {
    setSortedEmployee([...employee.filter((currentEmployee) => currentEmployee.departmentName === currentDepartment)]);
  }, [employee])
  
  const handleEdit = (editedItem, index) => {
    setIsEdit();
    openModal();
    setFormObject(editedItem);
    setIndexOfEdit(index);
  }

  const filterHandler = (currentDepartmentName) => {
    setCurrentDepartment(currentDepartmentName);
    setSortedEmployee([...employee.filter((currentEmployee) =>
      currentEmployee.departmentName === currentDepartmentName)]);
    history.push('/employee');
  }

  return (
    <Container className="render-entity">
      {
        entity.label === 'Department' ?
          departments.map((item, index) => {
            const filteredEmployee = employee.filter((currentEmployee) =>
              currentEmployee.departmentName === item.name);
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
                  onClick={(e) => {
                    handleEdit(item, index);
                    e.stopPropagation();
                  }}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  type="Button"
                  onClick={(e) => {
                    deleteEntity(item, index);
                    e.stopPropagation();
                  }}
                  disabled={filteredEmployee.length !== 0}
                >
                  <Delete />
                </IconButton>
              </Container>
            )
          }) :
          sortedEmployee.map((item, index) => {
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
                  onClick={() => handleEdit(item, index)}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  type="Button"
                  onClick={() => deleteEntity(item, index)}
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
