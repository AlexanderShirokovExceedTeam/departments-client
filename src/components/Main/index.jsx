import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import {
  getDepartmentsAsync,
  createDepartmentAsync,
  editDepartmentAsync,
  deleteDepartmentAsync,
} from "../../store/actions/departmentsActions";
import {
  createEmployeeAsync,
  editEmployeeAsync,
  deleteEmployeeAsync,
} from "../../store/actions/employeesActions";

import SideBar from "../SideBar/index";
import Header from "../Header/index";
import RenderEntity from "../RenderEntity/index";
import ModalForm from "../ModalForm/index";

import { Container, Snackbar, Typography } from "@mui/material";

import "./styles.scss";

const Main = ({ entity }) => {
  const [openModal, setOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formObject, setFormObject] = useState(null);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [snackmessage, setSnackmessage] = useState("");

  let { id } = useParams();
  const dispatch = useDispatch();

  const closeModal = () => {
    setOpenModal(false);
    setFormObject(null);
  };

  const departmentsAsync = useSelector(
    (store) => store.reducerDepartments.departments
  );

  const employeeAsync = useSelector(
    (store) => store.reducerEmployees.employees
  );

  useEffect(() => {
    dispatch(getDepartmentsAsync());
  }, []);

  const submitForm = (entityObject) => {
    Object.keys(entityObject).forEach((key) => {
      if (typeof entityObject[key] === "string") {
        return (entityObject[key] = entityObject[key].trim());
      }
    });

    switch (entity) {
      case "Department":
        if (isEdit) {
          dispatch(editDepartmentAsync(entityObject, departmentsAsync));
        } else {
          dispatch(createDepartmentAsync(entityObject));
        }
        break;
      case "Employee":
        const tempEmployee = { ...entityObject, department: id };

        if (isEdit) {
          dispatch(editEmployeeAsync(tempEmployee, employeeAsync));
        } else {
          dispatch(createEmployeeAsync(tempEmployee));
        }
        break;
      default:
    }
    setIsEdit(false);
    closeModal();
  };

  const createEntity = () => {
    setFormObject({});
    setOpenModal(true);
  };

  const deleteEntity = (entityObject) => {
    if (entity === "Department") {
      dispatch(deleteDepartmentAsync(entityObject._id));
    } else {
      dispatch(deleteEmployeeAsync(entityObject._id));
    }
  };

  return (
    <>
      <Typography className="header" variant="h1">
        Department CMS
      </Typography>
      <Container className="main-container">
        <SideBar />
        <Container className="content">
          <Header createEntity={createEntity} entity={entity} />
          <RenderEntity
            entity={entity}
            openModal={setOpenModal}
            setIsEdit={setIsEdit}
            setFormObject={setFormObject}
            deleteEntity={deleteEntity}
            currentDepartment={id}
            setSnackmessage={setSnackmessage}
            setSnackbarOpen={setSnackbarOpen}
          />
        </Container>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={isSnackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          message={snackmessage}
        />
        {formObject ? (
          <ModalForm
            openModal={openModal}
            closeHandler={closeModal}
            entity={entity}
            isEdit={isEdit}
            submitForm={submitForm}
            formObject={formObject}
            setIsEdit={setIsEdit}
          />
        ) : null}
      </Container>
    </>
  );
};

export default Main;
