import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";
import './modalAddEdit.scss';

const departmentFields = [
  'Name',
  'Descroption'
];

const employeeFields = [
  'Email',
  'Name',
  'Age',
  'Position',
  '_Department'
];

const ModalAddEdit = ({ openModal, closeHandler, okHandler, entity, modalAction }) => {

  return (
    <Dialog
      aria-labelledby="scalable-modal"
      className="scalable-modal"
      open={openModal}
      onClose={closeHandler}
    >
      <DialogTitle>{modalAction} {entity}</DialogTitle>
      <DialogContent>
        {
          (entity === 'Departments') ? 
          departmentFields.map((item, index) => 
            <TextField
              key={`department_${index}`}
              margin="dense"
              id={item}
              label={item}
              type="text"
              fullWidth
              variant="standard"
            />
          ) :
          employeeFields.map((item, index) => 
            <TextField
              key={`employee_${index}`}
              margin="dense"
              id={item}
              label={item}
              type="text"
              fullWidth
              variant="standard"
            />
          )
        }
      </DialogContent>
      <DialogActions>
        <Button onClick={closeHandler}>Close</Button>
        <Button onClick={okHandler}>Add/Edit</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ModalAddEdit;
