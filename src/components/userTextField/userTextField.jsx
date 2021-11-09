import React from "react";
import { TextField } from "@mui/material";
import './userTextField.scss';

const UserTextField = ({ currentKey, value, setFieldHandler }) => {
  return (
    <TextField
      margin="dense"
      label={currentKey}
      value={value}
      type="text"
      fullWidth
      variant="standard"
      onChange={(e) => setFieldHandler(currentKey, e)}
    />
  )
}

export default UserTextField;
