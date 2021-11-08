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
import './modalAddEdit.scss';

const departmentFields = [
  'name',
  'description'
  //  '_id'
];

const employeeFields = [
  'email',
  'name',
  'age',
  'position',
  // 'departmentName'
];

const ModalAddEdit = ({ departments, employee, setEmployee, openModal, closeHandler, okHandler, entity, modalAction }) => {
  const [formObject, setFormObject] = useState(typeof entity !== 'string' ? entity : {});
  const [selectDepartment, setSelectDepartment] = useState('');

  const selectDepartmentHandler = (e) => {
    setSelectDepartment(e.target.value);
  }

  return (
    <Dialog
      aria-labelledby="scalable-modal"
      className="scalable-modal"
      open={openModal}
      onClose={closeHandler}
    >
      <DialogTitle>{modalAction} {entity}</DialogTitle>
      <DialogContent>
        <Container component="form" onSubmit={() => {console.log('submit!')}}>
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
                }}
              />
            ) :
            <>
              {
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
                    }}
                  />
                )
              }
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
                  // onChange={(e) => {
                  //   setSelectDepartment(e.target.value);
                  //   setFormObject({ ...formObject, departmentName: e.target.value });
                  // }}
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
            </>
          }
        </Container>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => {
          closeHandler()
          setFormObject({})
        }}>Close</Button>
        <Button onClick={() => {
          // okHandler(formObject)
          okHandler({ ...formObject, departmentName: selectDepartment })
          setFormObject({})
        }}>Add/Edit</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ModalAddEdit;
