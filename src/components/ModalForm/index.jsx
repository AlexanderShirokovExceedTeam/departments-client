import React, { useRef, useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Container,
} from "@mui/material";
import { ValidatorForm } from "react-material-ui-form-validator";

import UserTextField from "../UserTextField/index";

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
  const inputRef = useRef("ref");
  const [errors, setErrors] = useState({}); //  or useState(false)

  const setFieldHandler = (key, e, isEdit, entity) => { //  I can try to validate data right here. Get isEdit as parameter, it may be needed
    if (entity === "Department") {
      switch (key) {
        case "name":

          break;
        case "description":

          break;
          // default:
          //   return false;
      }
    } else {
      switch (inputName) {
        case "email":

          break;
        case "name":

          break;
        case "age":

          break;
        case "position":

          break;
        // default:
        //   return false;
      }
    }
    setFormObject({ ...formObject, [key]: e.target.value });
  };

  const onSubmit = (e, fObject) => {
    if (e.key === "Enter") {
      submitForm(fObject);
      setFormObject({});
    }
  };
  
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
      <ValidatorForm
        ref={inputRef}
        onSubmit={() => {
          submitForm({ ...formObject });
          setFormObject({});
        }}
        onError={(errors) => console.log(errors)}
      >
        <DialogContent>
          {entity === "Department" ? (
            <Container
              component="form"
              onKeyPress={(e) => onSubmit(e, { ...formObject })}
            >
              <UserTextField
                currentKey="name"
                value={formObject.name}
                type="text"
                setFieldHandler={setFieldHandler}
                required={true}
              />
              <UserTextField
                currentKey="description"
                value={formObject.description}
                type="text"
                setFieldHandler={setFieldHandler}
              />
            </Container>
          ) : (
            <Container component="form">
              <UserTextField
                currentKey="email"
                value={formObject.email}
                type="email"
                setFieldHandler={setFieldHandler}
                validators={["isEmail"]}
                errorMessages={["email is not valid"]}
                required={true}
              />
              <UserTextField
                currentKey="name"
                value={formObject.name}
                type="text"
                setFieldHandler={setFieldHandler}
                required={true}
              />
              <UserTextField
                currentKey="age"
                value={formObject.age}
                type="number"
                setFieldHandler={setFieldHandler}
                validators={["minNumber:1", "maxNumber:100"]}
                errorMessages={[
                  "value must be positive",
                  "value must be less or equal 100",
                ]}
                required={true}
              />
              <UserTextField
                currentKey="position"
                value={formObject.position}
                type="text"
                setFieldHandler={setFieldHandler}
                required={true}
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
      </ValidatorForm>
    </Dialog>
  );
};

export default ModalForm;
