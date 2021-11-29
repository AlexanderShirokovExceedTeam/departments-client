import React from "react";

import { TextValidator } from "react-material-ui-form-validator";
import { TextField } from "@mui/material";

const UserTextField = ({
  error,
  helperText,
  onChange,
  currentKey,
  defaultValue,
  type,
  setFieldHandler,
  // validators,
  // errorMessages,
}) => {
  return (
    // <TextValidator
    // error={false}
    //   margin="dense"
    //   label={currentKey}
    //   defaultValue={defaultValue}
    //   type={type}
    //   fullWidth
    //   variant="standard"
    //   onChange={(e) => setFieldHandler(currentKey, e)}
    //   name={currentKey}
    //   validators={validators}
    //   errorMessages={errorMessages}
    // />
    <TextField
      error={error}
      helperText={helperText}
      onChange={onChange}
      margin="dense"
      label={currentKey}
      defaultValue={defaultValue}
      type={type}
      fullWidth
      variant="standard"
      onChange={(e) => setFieldHandler(currentKey, e)}
      name={currentKey}
    />
  );
};

export default UserTextField;
