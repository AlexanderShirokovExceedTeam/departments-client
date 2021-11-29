import React, { useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Container,
  
} from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { ValidatorForm } from "react-material-ui-form-validator";

import UserTextField from "../UserTextField/index";

const validationSchemaDepartment = yup.object().shape({
  name: yup.string().required('Field is required'),
  description: yup.string().max(20, 'Field is 20 symbols max'),
});

const validationSchemaEmployee = yup.object().shape({
  email: yup.string().email('Invalid email').required('Field is required'),
  name: yup.string().required('Field is required'),
  age: yup.number().required('Field is required').positive().integer(),
  position: yup.string().required('Field is required'),
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
  
  const setFieldHandler = (key, e) => {
    setFormObject({ ...formObject, [key]: e.target.value });
  };
  
  const onSubmit = (e, fObject) => {
    if (e.key === "Enter") {
      submitForm(fObject);
      setFormObject({});
    }
  };
  
  const formik = useFormik({
    initialValues: entity === "Department" ? {
      name: formObject.name,
      // name: "test",
      description: formObject.description,
    } : {
      email: formObject.email,
      name: formObject.name,
      age: formObject.age,
      position: formObject.position,
    },
    validationSchema: entity === "Department" ? validationSchemaDepartment : validationSchemaEmployee,
    onSubmit: (values) => {
      console.log(`values`, values);
    }
  })

  return (
    <Dialog
      aria-labelledby="scalable-modal"
      className="scalable-modal"
      open={openModal}
      onClose={() => closeHandler(false)}
    >
      <DialogTitle>
        {isEdit ? "Edit" : "Add"}{" "}
        {entity === "Employee" ? "employee" : "department"}
      </DialogTitle>
      <form
        noValidate
        autoComplete="off" 
        instantValidate
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit()
          // submitForm({ ...formObject });
          // setFormObject({});
        }}
        onError={(errors) => {
          console.log("Validation error", errors)
        }}
      >
        <DialogContent>
          {entity === "Department" ? (
            <Container
              component="form"
              // onKeyPress={(e) => onSubmit(e, { ...formObject })}
            >
              <UserTextField
                currentKey="name"
                // defaultValue={formObject.name}
                defaultValue={formik.values.name}
                onChange={formik.handleChange}
                type="text"
                setFieldHandler={setFieldHandler}
                // validators={['required']}
                // errorMessages={['This field is required']}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <UserTextField
                error={formik.touched.description && Boolean(formik.errors.description)}
                currentKey="description"
                // defaultValue={formObject.description}
                defaultValue={formik.values.description}
                type="text"
                setFieldHandler={setFieldHandler}
              />
            </Container>
          ) : (
            <Container component="form">
              <UserTextField
                currentKey="email"
                // defaultValue={formObject.email}
                defaultValue={formik.values.email}
                type="email"
                setFieldHandler={setFieldHandler}
                // validators={['required', 'isEmail']}
                // errorMessages={['This field is required', 'Email invalid']}
                // required={true}
              />
              <UserTextField
                currentKey="name"
                // defaultValue={formObject.name}
                defaultValue={formik.values.name}
                type="text"
                setFieldHandler={setFieldHandler}
                // validators={['required']}
                // errorMessages={['This field is required']}
                // required={true}
              />
              <UserTextField
                currentKey="age"
                // defaultValue={formObject.age}
                defaultValue={formik.values.age}
                type="number"
                setFieldHandler={setFieldHandler}
                // validators={["required", "minNumber:1", "maxNumber:100"]}
                // errorMessages={[
                //   'This field is required',
                //   "value must be positive",
                //   "value must be less or equal 100",
                // ]}
                // required={true}
              />
              <UserTextField
                currentKey="position"
                // defaultValue={formObject.position}
                defaultValue={formik.values.position}
                type="text"
                setFieldHandler={setFieldHandler}
                // validators={['required']}
                // errorMessages={['This field is required']}
                // required={true}
              />
            </Container>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              closeHandler(false);
              setFormObject({});
              setIsEdit(false);
            }}
          >
            Close
          </Button>
          <Button
            type="submit"
            // disabled={}
          >{isEdit ? "Edit" : "Add"}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ModalForm;
