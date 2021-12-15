import React from "react";

import { useFormik } from "formik";
import * as yup from "yup";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Container,
} from "@mui/material";

import ModalTextField from "../ModalTextField/index";

const validationSchemaDepartment = yup.object().shape({
  name: yup.string().required("Field is required"),
  description: yup.string().max(20, "Field is 20 symbols max"),
});

const validationSchemaEmployee = yup.object().shape({
  email: yup.string().email("Invalid email").required("Field is required"),
  name: yup.string().required("Field is required"),
  age: yup.number().required("Field is required").positive().integer(),
  position: yup.string().required("Field is required"),
});

const ModalForm = ({
  openModal,
  closeHandler,
  submitForm,
  entity,
  isEdit,
  formObject,
  setIsEdit,
}) => {
  const formikDepartment = useFormik({
    initialValues: {
      name: formObject.name,
      description: formObject.description,
    },

    validationSchema: validationSchemaDepartment,

    onSubmit: (values) => {
      submitForm({
        _id: formObject._id,
        name: values.name,
        description: values.description,
      });
    },
  });

  const formikEmployee = useFormik({
    initialValues: {
      email: formObject.email,
      name: formObject.name,
      age: formObject.age,
      position: formObject.position,
    },

    validationSchema: validationSchemaEmployee,

    onSubmit: (values) => {
      submitForm({
        _id: formObject._id,
        email: values.email,
        name: values.name,
        age: values.age,
        position: values.position,
      });
    },
  });

  return (
    <Dialog
      aria-labelledby="scalable-modal"
      className="scalable-modal"
      open={openModal}
      onClose={closeHandler}
    >
      <DialogTitle>
        {isEdit ? "Edit" : "Add"}{" "}
        {entity === "Employee" ? "employee" : "department"}
      </DialogTitle>
      <form
        onSubmit={
          entity === "Department"
            ? formikDepartment.handleSubmit
            : formikEmployee.handleSubmit
        }
      >
        <DialogContent>
          {entity === "Department" ? (
            <Container>
              <ModalTextField
                currentKey="name"
                label="Name"
                defaultValue={formObject.name}
                formikValues={formikDepartment}
              />
              <ModalTextField
                currentKey="description"
                label="Description"
                defaultValue={formObject.description}
                formikValues={formikDepartment}
              />
            </Container>
          ) : (
            <Container>
              <ModalTextField
                currentKey="email"
                label="Email"
                defaultValue={formObject.email}
                formikValues={formikEmployee}
              />
              <ModalTextField
                currentKey="name"
                label="Name"
                defaultValue={formObject.name}
                formikValues={formikEmployee}
              />
              <ModalTextField
                currentKey="age"
                label="Age"
                defaultValue={formObject.age}
                formikValues={formikEmployee}
              />
              <ModalTextField
                currentKey="position"
                label="Position"
                defaultValue={formObject.position}
                formikValues={formikEmployee}
              />
            </Container>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              closeHandler();
              setIsEdit(false);
              entity === "Department"
                ? formikDepartment.handleReset()
                : formikEmployee.handleReset();
            }}
          >
            Close
          </Button>
          <Button type="submit">{isEdit ? "Edit" : "Add"}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ModalForm;
