import React, { useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Container,
  TextField
} from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";

import UserTextField from "../UserTextField/index";

const validationSchemaDepartment = yup.object().shape({
  name: yup.string().required('Field is required'),
  description: yup.string().max(20, 'Field is 20 symbols max'),
});

const validationSchemaEmployee = yup.object().shape({
  Email: yup.string().email('Invalid email').required('Field is required'),
  Name: yup.string().required('Field is required'),
  Age: yup.number().required('Field is required').positive().integer(),
  Position: yup.string().required('Field is required'),
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
    initialValues: {
      name: formObject.name,
      description: formObject.description,
    },
    validationSchema: validationSchemaDepartment,
    onSubmit: (values) => {
      console.log(`values`, values);
      submitForm({ ...values });
      // submitForm({ ...formObject });
      setFormObject({});
    },
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
        // onSubmit={(e) => {
        //   e.preventDefault();
        //   formik.handleSubmit(e);
        //   // submitForm({ ...formObject });
        //   // setFormObject({});
        // }}
        onSubmit={formik.handleSubmit}
      >
        <DialogContent>
          {entity === "Department" ? (
            <Container
              component="form"
            >
              <TextField
                fullWidth
                margin="dense"
                id="name"
                name="name"
                label="Name"
                value={formik.values.name}
                // value={formObject.name}
                onChange={formik.handleChange}
                // onChange={(e) => setFieldHandler("name", e)}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              {/* <UserTextField
                currentKey="name"
                // defaultValue={formObject.name}
                value={formik.values.name}
                onChange={formik.handleChange}
                type="text"
                setFieldHandler={setFieldHandler}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              /> */}
              <TextField
                fullWidth
                margin="dense"
                id="description"
                name="description"
                label="Description"
                value={formik.values.description}
                // value={formObject.description}
                onChange={formik.handleChange}
                // onChange={(e) => setFieldHandler("Description", e)}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
                />
                {/* <UserTextField
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  currentKey="description"
                  // defaultValue={formObject.description}
                  value={formik.values.description}
                  type="text"
                  setFieldHandler={setFieldHandler}
                /> */}
            </Container>
          ) : (
            <Container component="form">
              <UserTextField
                currentKey="email"
                // defaultValue={formObject.email}
                defaultValue={formik.values.email}
                type="email"
                setFieldHandler={setFieldHandler}
              />
              <UserTextField
                currentKey="name"
                // defaultValue={formObject.name}
                defaultValue={formik.values.name}
                type="text"
                setFieldHandler={setFieldHandler}
              />
              <UserTextField
                currentKey="age"
                // defaultValue={formObject.age}
                defaultValue={formik.values.age}
                type="number"
                setFieldHandler={setFieldHandler}
              />
              <UserTextField
                currentKey="position"
                // defaultValue={formObject.position}
                defaultValue={formik.values.position}
                type="text"
                setFieldHandler={setFieldHandler}
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
