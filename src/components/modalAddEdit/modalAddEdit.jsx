import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  // DialogContentText,
  DialogTitle,
  Container,
} from "@mui/material";
import UserTextField from "../userTextField/userTextField";
import './modalAddEdit.scss';

const ModalAddEdit = ({ departments, openModal, closeHandler, okHandler, entity, isEdit, formObject, setFormObject }) => {
  //  add some boolean state for switch between ADD & EDIT
  const [selectDepartment, setSelectDepartment] = useState('');

  const selectDepartmentHandler = (e) => {
    setSelectDepartment(e.target.value);
    setFormObject({ ...formObject, departmentName: e.target.value})
  }

  const setFieldHandler = (key, e) => {
    setFormObject({ ...formObject, [key]: e.target.value })
  }
  
  return (
    <Dialog
      aria-labelledby="scalable-modal"
      className="scalable-modal"
      open={openModal}
      onClose={closeHandler}
    >
      <DialogTitle>{isEdit ? 'Edit' : 'Add'} {entity.label}</DialogTitle>
      <DialogContent>
        {
          (entity.label === 'Department') ?
          <Container component="form">
            <UserTextField
              currentKey='name'
              value={formObject.name}
              setFieldHandler={setFieldHandler}
            />
            <UserTextField
              currentKey='description'
              formObject={formObject.description}
              setFieldHandler={setFieldHandler}
            />
          </Container> :          
          <Container component="form">
            <UserTextField
              currentKey='email'
              formObject={formObject.email}
              setFieldHandler={setFieldHandler}
            />
            <UserTextField
              currentKey='name'
              formObject={formObject.name}
              setFieldHandler={setFieldHandler}
            />
            <UserTextField
              currentKey='age'
              formObject={formObject.age}
              setFieldHandler={setFieldHandler}
            />
            <UserTextField
              currentKey='position'
              formObject={formObject.position}
              setFieldHandler={setFieldHandler}
            />
            <TextField
              margin="dense"
              className="departmentField"
              name="inputDepartment"
              variant="outlined"
              required
              fullWidth
              id="inputDepartment"
              value={selectDepartment}
              select
              label="departmentName"
              type="text"
              onChange={(e) => selectDepartmentHandler(e)}
              SelectProps={{
                native: true,
              }}          
            >
            {
              departments.map((option) => (
                <option key={option.name} value={option.name}>
                  {option.name}
                </option>
              ))
            }
            </TextField>
          </Container> 
        }
      </DialogContent>
      <DialogActions>
        <Button onClick={() => {
          closeHandler()
          setFormObject({})
        }}>Close</Button>
        <Button onClick={() => {
          okHandler({ ...formObject })
          setFormObject({})
        }}>{isEdit ? 'Edit' : 'Add'}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ModalAddEdit;
