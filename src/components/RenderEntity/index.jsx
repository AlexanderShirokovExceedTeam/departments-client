import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { getEmployeesAsync } from "../../store/actions/employeesActions";

import { Container, Typography, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

import "./styles.scss";

const RenderEntity = ({
  entity,
  setIsEdit,
  openModal,
  setFormObject,
  deleteEntity,
  currentDepartment,
  setSnackmessage,
  setSnackbarOpen,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const departments = useSelector(
    (store) => store.reducerDepartments.departments
  );

  const employee = useSelector((store) => store.reducerEmployees.employees);

  useEffect(() => {
    if (currentDepartment) {
      dispatch(getEmployeesAsync(currentDepartment));
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
                  deleteEntity(item);
                  e.stopPropagation();
                }}
              >
                <Delete />
              </IconButton>
            </Container>
          );
        })
      ) : employee.length > 0 ? (
        employee.map((item, index) => {
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
