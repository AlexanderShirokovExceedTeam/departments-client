import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { useDispatch } from "react-redux";

import axios from "axios";

import { getEmployees } from "../../store/actions/employeesActions";

import { Container, Typography, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

import "./styles.scss";

const RenderEntity = ({
  entity,
  departments,
  setIsEdit,
  openModal,
  setFormObject,
  deleteEntity,
  currentDepartment,
  sortedEmployee,
  setSortedEmployee,
  setSnackmessage,
  setSnackbarOpen,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentDepartment) {
      axios
        .get(`http://localhost:8000/employees/${currentDepartment}`)
        .then((res) => {
          if (res) {
            setSortedEmployee(res.data.data);
            dispatch(getEmployees(res.data.data));
          }
        })
        .catch((err) => {
          setSnackmessage("Can not load employee");
          setSnackbarOpen(true);
        });
    }
  }, [currentDepartment]);

  const handleEdit = (editedItem) => {
    setIsEdit(true);
    openModal(true);
    setFormObject(editedItem);
  };

  const filterHandler = (departmentId) => {
    history.push(`/department/${departmentId}`);
  };

  return (
    <Container className="render-entity">
      {entity === "Department" ? (
        departments.map((item, index) => {
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
                  deleteEntity(item, index);
                  e.stopPropagation();
                }}
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
                onClick={() => deleteEntity(item, index)}
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
