import React from "react";

import { TextValidator } from "react-material-ui-form-validator";

import "./userTextField.scss";

const UserTextField = ({
  currentKey,
  value,
  type,
  setFieldHandler,
  validators,
  errorMessages,
  required,
}) => {
  return (
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
  );
};

export default UserTextField;
