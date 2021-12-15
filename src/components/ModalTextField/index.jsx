import React from "react";

import { TextField } from "@mui/material";

const ModalTextField = ({ currentKey, label, defaultValue, formikValues }) => {
  return (
    <TextField
      fullWidth
      margin="dense"
      id={currentKey}
      name={currentKey}
      label={label}
      defaultValue={defaultValue}
      onChange={(e) => {
        formikValues.setFieldValue(currentKey, e.target.value);
      }}
      error={
        formikValues.touched[currentKey] &&
        Boolean(formikValues.errors[currentKey])
      }
      helperText={
        formikValues.touched[currentKey] && formikValues.errors[currentKey]
      }
    />
  );
};

export default ModalTextField;
