import React, { FC } from "react";

import { TextField } from "@mui/material";
import { IDepartment, IEmployee } from "../../types";
import { FormikConfig, FormikErrors, FormikTouched } from "formik";

// type FormikValues = {
//   setFieldValue: (
//     field: string,
//     value: any,
//     shouldValidate?: boolean | undefined
//   ) => Promise<FormikErrors<IDepartment | IEmployee>> | Promise<void>;
//   touched: FormikTouched<IDepartment | IEmployee>,
// };

interface IProps {
  currentKey: string;
  label: string;
  defaultValue: string;
  formikValues: FormikConfig<IDepartment | IEmployee>
}

const ModalTextField: FC<IProps> = ({
  currentKey,
  label,
  defaultValue,
  formikValues,
}) => {
  console.log(`formikValues`, formikValues);
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
