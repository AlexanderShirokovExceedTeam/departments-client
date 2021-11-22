import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Container, Typography, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import "./renderEntity.scss";

const RenderEntity = ({
  entity,
  departments,
  employee,
  setIsEdit,
  openModal,
  setFormObject,
  deleteEntity,
  currentDepartment,
  sortedEmployee,
  setSortedEmployee,
}) => {
  const history = useHistory();

  useEffect(() => {
    if (currentDepartment) {
      axios
        .get(`http://localhost:8000/employees/${currentDepartment}`)
        .then((res) => {
          if (res) {
            setSortedEmployee(res.data.data);
          }
        })
        .catch((err) => {
          console.log(`get employees error`, err);
        });
      }
  }, [currentDepartment])

  const handleEdit = (editedItem) => {
    setIsEdit(true);
    openModal(true);
    setFormObject(editedItem);
  };

  const filterHandler = (departmentID) => {
    history.push(`/department/${departmentID}`);
  };
  
  return (
    <Container className="render-entity">
      {entity === "Department" ? (
        departments.map((item, index) => {
          const renderedEmployee = sortedEmployee;
          return (
            <Container
              key={`dep-prop-${index}`}
              className={`department department-${index}`}
              onClick={() => filterHandler(item._id)}
            >
              <Typography>{item.name}</Typography>
              <Typography>{item.description}</Typography>
              <IconButton
                type="Button"
                onClick={(e) => {
                  handleEdit(item);
                  e.stopPropagation();
                }}
              >
                <Edit />
              </IconButton>
              <IconButton
                type="Button"
                onClick={(e) => {
                  deleteEntity(item, index, item._id);
                  e.stopPropagation();
                }}
                // disabled={renderedEmployee.length !== 0}
              >
                <Delete />
              </IconButton>
            </Container>
          );
        })
      ) : sortedEmployee.length > 0 ? (
        sortedEmployee.map((item, index) => {
          return (
            <Container
              key={`empl-prop-${index}`}
              className={`employee employee-${index}`}
            >
              <Typography>{item.email}</Typography>
              <Typography>{item.name}</Typography>
              <Typography>{item.age}</Typography>
              <Typography>{item.position}</Typography>
              <IconButton type="Button" onClick={() => handleEdit(item)}>
                <Edit />
              </IconButton>
              <IconButton
                type="Button"
                onClick={() => deleteEntity(item, index, item._id)}
              >
                <Delete />
              </IconButton>
            </Container>
          );
        })
      ) : (
        <Container className="empty-sorted-employee">
          <Typography align="center" color="lightgray" variant="h3">
            Empty
          </Typography>
        </Container>
      )}
    </Container>
  );
};

export default RenderEntity;
