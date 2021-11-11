import React from "react";
import { TextField } from "@mui/material";
import { TextValidator, SelectValidator, ValidatorForm } from "react-material-ui-form-validator";
import './userTextField.scss';

const UserTextField = ({ currentKey, value, type, setFieldHandler, validators, errorMessages, required }) => {
  return (
    // <TextField
    //   // required={true}
    //   margin="dense"
    //   label={currentKey}
    //   value={value}
    //   // type="number"
    //   type={type}
    //   fullWidth
    //   variant="standard"
    //   onChange={(e) => setFieldHandler(currentKey, e)}
    //   error={error}
    //   helperText={errorText}
    // />
    <TextValidator
      margin="dense"
      label={currentKey}
      value={value}
      type={type}
      fullWidth
      required={required}
      variant="standard"
      onChange={(e) => setFieldHandler(currentKey, e)}
      name={currentKey}
      validators={validators}
      errorMessages={errorMessages}
    />
  )
}

export default UserTextField;
