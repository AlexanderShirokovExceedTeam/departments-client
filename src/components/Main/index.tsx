import React, { useState, useEffect, FC } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/index";

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

import { IDepartment, IEmployee } from "../../types";

import { Container, Snackbar, Typography } from "@mui/material";

import "./styles.scss";

interface IMainProps {
  entity: string
}

interface IEntityObject {
  name: string,
  description?: string,
  email?: string,
  age?: number,
  position?: string,
}

const Main: FC<IMainProps> = ({ entity }) => {
  const [openModal, setOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formObject, setFormObject] = useState<any>(null);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [snackmessage, setSnackmessage] = useState("");

  let { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const closeModal = () => {
    setOpenModal(false);
    setFormObject(null);
  };

  const departmentsAsync = useSelector(
    (store: RootState) => store.reducerDepartments.departments
  );

  const employeeAsync = useSelector(
    (store: RootState) => store.reducerEmployees.employees
  );

  useEffect(() => {
    dispatch(getDepartmentsAsync());
  }, []);

  const submitForm = (entityObject: any) => {
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

  const deleteEntity = (entityObject: IDepartment | IEmployee) => {
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
