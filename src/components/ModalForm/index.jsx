import React, { useEffect } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Container,
  TextField,
} from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";

import UserTextField from "../UserTextField/index";

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
  setFormObject,
  setIsEdit,
}) => {
  const setFieldHandler = (e) => {
    setFormObject({ ...formObject, [e.target.name]: e.target.value });
  };

  // useEffect(() => {
  //   if (formObject?.name && formObject?.description) {
  //     console.log(`exists`, )
  //   }
  // }, [formObject])
  console.log(`formObject`, formObject)
  const formikDepartment = useFormik({
    initialValues: {
      name: formObject.name,
      description: formObject.description,
    },
    validationSchema: validationSchemaDepartment,
    onSubmit: (values, actions) => {
      console.log(`values department`, values);
      submitForm({
        _id: formObject._id,
        name: values.name,
        description: values.description,
      });
      actions.resetForm();
      setFormObject(null);
    },
    onReset: () => {
      setFormObject(null);
    },
  });

  console.log(`formObject`, formObject);

  const formikEmployee = useFormik({
    initialValues: {
      email: formObject.email,
      name: formObject.name,
      age: formObject.age,
      position: formObject.position,
    },
    validationSchema: validationSchemaEmployee,
    onSubmit: (values, actions) => {
      console.log(`values`, values)
      submitForm({
        _id: formObject._id,
        email: values.email,
        name: values.name,
        age: values.age,
        position: values.position,
      });
      actions.resetForm();
      setFormObject(null);
    },
    onReset: () => {
      setFormObject(null);
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
            onChange={(e) => setFieldHandler(e)}
          >
            <DialogContent>
              {entity === "Department" ? (
                <Container component="form">
                  <TextField
                    fullWidth
                    margin="dense"
                    id="name"
                    name="name"
                    label="Name"
                    defaultValue={formObject.name}
                    value={formikDepartment.values.name}
                    onChange={(e) => {
                      formikDepartment.setFieldValue('name', e.target.value)
                    }}
                    error={
                      formikDepartment.touched.name &&
                      Boolean(formikDepartment.errors.name)
                    }
                    helperText={
                      formikDepartment.touched.name &&
                      formikDepartment.errors.name
                    }
                  />
                  <TextField
                    fullWidth
                    margin="dense"
                    id="description"
                    name="description"
                    label="Description"
                    defaultValue={formObject.description}
                    value={formikDepartment.values.description}
                    onChange={(e) => {
                      formikDepartment.setFieldValue('description', e.target.value)
                    }}
                    error={
                      formikDepartment.touched.description &&
                      Boolean(formikDepartment.errors.description)
                    }
                    helperText={
                      formikDepartment.touched.description &&
                      formikDepartment.errors.description
                    }
                  />
                </Container>
              ) : (
                <Container component="form">
                  <TextField
                    fullWidth
                    margin="dense"
                    id="email"
                    name="email"
                    label="Email"
                    defaultValue={formObject.email}
                    value={formikEmployee.values.email}
                    onChange={(e) => {
                      formikEmployee.setFieldValue('email', e.target.value)
                    }}
                    error={
                      formikEmployee.touched.email &&
                      Boolean(formikEmployee.errors.email)
                    }
                    helperText={
                      formikEmployee.touched.email &&
                      formikEmployee.errors.email
                    }
                  />
                  <TextField
                    fullWidth
                    margin="dense"
                    id="name"
                    name="name"
                    label="Name"
                    defaultValue={formObject.name}
                    value={formikEmployee.values.name}
                    onChange={(e) => {
                      formikEmployee.setFieldValue('name', e.target.value)
                    }}
                    error={
                      formikEmployee.touched.name &&
                      Boolean(formikEmployee.errors.name)
                    }
                    helperText={
                      formikEmployee.touched.name && formikEmployee.errors.name
                    }
                  />
                  <TextField
                    fullWidth
                    margin="dense"
                    id="age"
                    name="age"
                    label="Age"
                    defaultValue={formObject.age}
                    value={formikEmployee.values.age}
                    onChange={(e) => {
                      formikEmployee.setFieldValue('age', e.target.value)
                    }}
                    error={
                      formikEmployee.touched.age &&
                      Boolean(formikEmployee.errors.age)
                    }
                    helperText={
                      formikEmployee.touched.age && formikEmployee.errors.age
                    }
                  />
                  <TextField
                    fullWidth
                    margin="dense"
                    id="position"
                    name="position"
                    label="Position"
                    defaultValue={formObject.position}
                    value={formikEmployee.values.position}
                    onChange={(e) => {
                      formikEmployee.setFieldValue('position', e.target.value)
                    }}
                    error={
                      formikEmployee.touched.position &&
                      Boolean(formikEmployee.errors.position)
                    }
                    helperText={
                      formikEmployee.touched.position &&
                      formikEmployee.errors.position
                    }
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
              <Button
                type="submit"
                // disabled={}
              >
                {isEdit ? "Edit" : "Add"}
              </Button>
            </DialogActions>
          </form>
      </Dialog>
  );
};

export default ModalForm;
