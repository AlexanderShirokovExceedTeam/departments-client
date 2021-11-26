import React from "react";

import { TextValidator } from "react-material-ui-form-validator";

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
      name={currentKey}
    />
  );
};

export default UserTextField;
