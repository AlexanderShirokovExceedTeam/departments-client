import React from "react";

import { TextField } from "@mui/material";

const UserTextField = ({
  error,
  helperText,
  onChange,
  currentKey,
  defaultValue,
  type,
  setFieldHandler,
}) => {
  return (
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
