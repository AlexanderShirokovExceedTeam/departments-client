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
  setIndexOfEdit,
  deleteEntity,
  currentDepartment,
  setCurrentDepartment,
  sortedEmployee,
  setSortedEmployee,
}) => {
  const history = useHistory();
  // const [sortedEmployee, setSortedEmployee] = useState([]);

  // useEffect(() => {
  //   setSortedEmployee([...employee.filter((currentEmployee) => currentEmployee.department === currentDepartment)]);
  // }, [employee])

  const handleEdit = (editedItem, index) => {
    setIsEdit(true);
    openModal(true);
    setFormObject(editedItem);
    setIndexOfEdit(index);
  };

  const filterHandler = (departmentID) => {
    console.log(`departmentID`, departmentID);
    setCurrentDepartment(departmentID);
    axios
      .get(`http://localhost:8000/employees?department=${departmentID}`)
      .then((res) => {
        if (res) {
          setSortedEmployee(res.data.data);
        }
      })
      .catch((err) => {
        console.log(`get employees error`, err);
      });
    // setSortedEmployee([...employee.filter((currentEmployee) =>
    //   currentEmployee.department === departmentID)]);
    history.push("/employee");
  };
  return (
    <Container className="render-entity">
      {entity === "Department"
        ? departments.map((item, index) => {
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
                    handleEdit(item, index);
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
        : sortedEmployee.map((item, index) => {
            return (
              <Container
                key={`empl-prop-${index}`}
                className={`employee employee-${index}`}
              >
                <Typography>{item.email}</Typography>
                <Typography>{item.name}</Typography>
                <Typography>{item.age}</Typography>
                <Typography>{item.position}</Typography>
                <IconButton
                  type="Button"
                  onClick={() => handleEdit(item, index)}
                >
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
          })}
    </Container>
  );
};

export default RenderEntity;
