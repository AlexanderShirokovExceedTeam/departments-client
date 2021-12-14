import React, { FC } from "react";

import { TextField } from "@mui/material";

interface IProps {
  currentKey: string,
  label: string,
  defaultValue: string,
  formikValues: any,
}

const ModalTextField: FC<IProps> = ({ currentKey, label, defaultValue, formikValues }) => {
// const ModalTextField = ({ currentKey, label, defaultValue, formikValues }) => {
  console.log(`formikValues`, formikValues);
  console.log(typeof formikValues)
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
