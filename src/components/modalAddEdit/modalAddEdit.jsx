import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Container
} from "@mui/material";
import './modalAddEdit.scss';

const departmentFields = [
  'name',
  'description'
];

const employeeFields = [
  'email',
  'name',
  'age',
  'position',
  // '_Department'
];

const ModalAddEdit = ({ openModal, closeHandler, okHandler, entity, modalAction }) => {
  const [formObject, setFormObject] = useState(typeof entity !== 'string' ? entity : {});

  return (
    <Dialog
      aria-labelledby="scalable-modal"
      className="scalable-modal"
      open={openModal}
      onClose={closeHandler}
    >
      <DialogTitle>{modalAction} {entity}</DialogTitle>
      <DialogContent>
        <Container component="form">
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
                onChange={(e) => {
                  setFormObject({ ...formObject, [item]: e.target.value })
                  console.log(formObject)
                }}
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
                onChange={(e) => {
                  setFormObject({ ...formObject, [item]: e.target.value })
                  console.log(formObject)
                }}
              />
            )
          }
        </Container>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => {
          closeHandler()
          setFormObject({})
        }}>Close</Button>
        <Button onClick={() => {
          okHandler(formObject)
          setFormObject({})
        }}>Add/Edit</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ModalAddEdit;
