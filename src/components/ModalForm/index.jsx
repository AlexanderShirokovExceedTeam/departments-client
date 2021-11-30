import React, { useState, useEffect } from "react";

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
  const [resetForm, setResetForm] = useState(formObject);

  // useEffect(() => {

  // }, [])

  const setFieldHandler = (e) => {
    // setFormObject({ ...formObject, [key]: e.target.value });
    console.log(`e`, e.target.value);
    console.log(`e`, e.target.name);
    setFormObject({ ...formObject, [e.target.name]: e.target.value });
  };

  // const onSubmit = (e, fObject) => {
  //   if (e.key === "Enter") {
  //     submitForm(fObject);
  //     setFormObject({});
  //   }
  // };
  console.log(`formObject__`, formObject)

  const formikDepartment = useFormik({
    initialValues: {
      name: formObject.name,
      description: formObject.description,
    },
    validationSchema: validationSchemaDepartment,
    onSubmit: (values, actions) => {
      console.log(`values__`, values);

      // setFormObject({ ...changedValues });
      submitForm({
        _id: formObject._id,
        name: values.name,
        description: values.description
      });
      //  set changed values to form
      // actions.setFieldValue(formObject[])
      // setFormObject({});
      
      actions.resetForm();

      setFormObject({});
    },
    onReset: (() => {
      setFormObject({});     
    })

  })

  const formikEmployee = useFormik({
    initialValues: {
      email: formObject.email,
      name: formObject.name,
      age: formObject.age,
      position: formObject.position,
    },
    validationSchema: validationSchemaEmployee,
    onSubmit: (values, actions) => {
      console.log(`values`, values);
      // setFormObject({ ...values });      
      submitForm({
        _id: formObject._id,
        email: values.email,
        name: values.name,
        age: values.age,
        position: values.position,
      });
      actions.resetForm({
        values: {
          email: formObject.email,
          name: formObject.name,
          age: formObject.age,
          position: formObject.position,
        },
      });
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
        onSubmit={ entity === "Department" ? formikDepartment.handleSubmit : formikEmployee.handleSubmit }
        onChange={(e) => setFieldHandler(e)}
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
                defaultValue={formObject.name}
                value={formikDepartment.values.name}
                // value={formObject.name}
                onChange={formikDepartment.handleChange}
                // onChange={(e) => setFieldHandler("name", e)}
                error={formikDepartment.touched.name && Boolean(formikDepartment.errors.name)}
                helperText={formikDepartment.touched.name && formikDepartment.errors.name}
              />
              <TextField
                fullWidth
                margin="dense"
                id="description"
                name="description"
                label="Description"
                defaultValue={formObject.description}
                value={formikDepartment.values.description}
                // value={formObject.description}
                onChange={formikDepartment.handleChange}
                // onChange={(e) => setFieldHandler("Description", e)}
                error={formikDepartment.touched.description && Boolean(formikDepartment.errors.description)}
                helperText={formikDepartment.touched.description && formikDepartment.errors.description}
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
                // value={formObject.description}
                onChange={formikEmployee.handleChange}
                // onChange={(e) => setFieldHandler("Description", e)}
                error={formikEmployee.touched.email && Boolean(formikEmployee.errors.email)}
                helperText={formikEmployee.touched.email && formikEmployee.errors.email}
              />
              <TextField
                fullWidth
                margin="dense"
                id="name"
                name="name"
                label="Name"
                defaultValue={formObject.name}
                value={formikEmployee.values.name}
                // value={formObject.description}
                onChange={formikEmployee.handleChange}
                // onChange={(e) => setFieldHandler("Description", e)}
                error={formikEmployee.touched.name && Boolean(formikEmployee.errors.name)}
                helperText={formikEmployee.touched.name && formikEmployee.errors.name}
              />
              <TextField
                fullWidth
                margin="dense"
                id="age"
                name="age"
                label="Age"
                defaultValue={formObject.age}
                value={formikEmployee.values.age}
                // value={formObject.description}
                onChange={formikEmployee.handleChange}
                // onChange={(e) => setFieldHandler("Description", e)}
                error={formikEmployee.touched.age && Boolean(formikEmployee.errors.age)}
                helperText={formikEmployee.touched.age && formikEmployee.errors.age}
              />
              <TextField
                fullWidth
                margin="dense"
                id="position"
                name="position"
                label="Position"
                defaultValue={formObject.position}
                value={formikEmployee.values.position}
                // value={formObject.description}
                onChange={formikEmployee.handleChange}
                // onChange={(e) => setFieldHandler("Description", e)}
                error={formikEmployee.touched.position && Boolean(formikEmployee.errors.position)}
                helperText={formikEmployee.touched.position && formikEmployee.errors.position}
              />               
            </Container>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              formikDepartment.handleReset();
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
