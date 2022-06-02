import React, { useEffect, FC } from "react";
import { useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { IDepartment, IEmployee } from "../../types";

import { getEmployees } from "../../store/actions/employeesActions";

import { Container, Typography, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import withLoader from "../WithLoader";

import "./styles.scss";

interface IRenderEntityProps {
  entity: string;
  setIsEdit: any;
  openModal: any;
  setFormObject: any;
  deleteEntity: any;
  currentDepartment: string;
  // setSnackmessage: any,
  // setSnackbarOpen: any,
}

const RenderEntity: FC<IRenderEntityProps> = ({
  entity,
  setIsEdit,
  openModal,
  setFormObject,
  deleteEntity,
  currentDepartment,
  // setSnackmessage,
  // setSnackbarOpen,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const departments = useSelector(
    (store: RootState) => store.reducerDepartments.departments
  );

  const employee = useSelector(
    (store: RootState) => store.reducerEmployees.employees
  );

  useEffect(() => {
    if (currentDepartment) {
      dispatch(getEmployees(currentDepartment));
    }
  }, [currentDepartment]);

  const handleEdit = (editedItem: any) => {
    setIsEdit(true);
    openModal(true);
    setFormObject(editedItem);
  };

  const filterHandler = (departmentId: string | undefined) => {
    history.push(`/department/${departmentId}`);
  };

  return (
    <Container className="render-entity">
      {entity === "Department" ? (
        departments.map((item: IDepartment, index: number) => {
          return (
            <Container
              key={`dep-prop-${index}`}
              className={`department department-${index}`}
              onClick={() => filterHandler(item._id)}
            >
              <Typography>{item.name}</Typography>
              <Typography>{item.description}</Typography>
              <IconButton
                onClick={(e) => {
                  handleEdit(item);
                  e.stopPropagation();
                }}
              >
                <Edit />
              </IconButton>
              <IconButton
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
      ) : employee.length ? (
        employee.map((item: IEmployee, index: number) => {
          return (
            <Container
              key={`empl-prop-${index}`}
              className={`employee employee-${index}`}
            >
              <Typography>{item.email}</Typography>
              <Typography>{item.name}</Typography>
              <Typography>{item.age}</Typography>
              <Typography>{item.position}</Typography>
              <IconButton onClick={(e) => handleEdit(item)}>
                <Edit />
              </IconButton>
              <IconButton onClick={(e) => deleteEntity(item, index)}>
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

export default withLoader(RenderEntity);
