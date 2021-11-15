import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Container,
  Typography
} from "@mui/material";
import { TextValidator, SelectValidator, ValidatorForm } from "react-material-ui-form-validator";
import UserTextField from "../userTextField/userTextField";
import './modalAddEdit.scss';

const ModalAddEdit = ({ openModal, closeHandler, okHandler, entityLabel, isEdit, formObject, setFormObject, setIsEdit }) => {
  // const [selectDepartment, setSelectDepartment] = useState('');
  // const selectDepartmentHandler = (e) => {
  //   setSelectDepartment(e.target.value);
  //   setFormObject({ ...formObject, departmentName: e.target.value})
  // }
  
  const setFieldHandler = (key, e) => {
    setFormObject({ ...formObject, [key]: e.target.value })
  }

  const onSubmit = (e, fObject) => {
    if (e.key === "Enter") {
      okHandler(fObject)
      setFormObject({})
    }
  };
  
  return (
    <ValidatorForm
      // ref="form"
      // onSubmit={console.log('submit')}
      // onError={errors => console.log(errors)}
    >
      <Dialog
        aria-labelledby="scalable-modal"
        className="scalable-modal"
        open={openModal}
        onClose={() => closeHandler(false)}
      >
        <DialogTitle>{isEdit ? 'Edit' : 'Add'} {entityLabel}</DialogTitle>
        <DialogContent>
          {
            (entityLabel === 'Department') ?
            <Container
              component="form"
              onKeyPress={(e) =>
                onSubmit(e, { ...formObject, label: entityLabel })
              }
            >
              <UserTextField
                currentKey='name'
                value={formObject.name}
                type="text"
                setFieldHandler={setFieldHandler}
                // validators={['required']}
                // errorMessages={['this field is required']}
                required={true}
              />
              <UserTextField
                currentKey='description'
                value={formObject.description}
                type="text"
                setFieldHandler={setFieldHandler}
              />
            </Container> :
            <Container component="form">
              <UserTextField
                currentKey='email'
                value={formObject.email}
                type="email"
                setFieldHandler={setFieldHandler}
                validators={['isEmail']}
                errorMessages={['email is not valid']}
                required={true}
              />
              <UserTextField
                currentKey='name'
                value={formObject.name}
                type="text"
                setFieldHandler={setFieldHandler}
                required={true}
                // validators={['required']}
                // errorMessages={['this field is required']}
              />
              <UserTextField
                currentKey='age'
                value={formObject.age}
                type="number"
                setFieldHandler={setFieldHandler}
                validators={['minNumber:1', 'maxNumber:100']}
                errorMessages={['value must be positive', 'value must be less or equal 100']}
                required={true}
              />
              <UserTextField
                currentKey='position'
                value={formObject.position}
                type="text"
                setFieldHandler={setFieldHandler}
                required={true}
              />
              {/* <TextField
                margin="dense"
                className="departmentField"
                name="inputDepartment"
                variant="outlined"
                required
                fullWidth
                id="inputDepartment"
                value={isEdit ? formObject.departmentName : selectDepartment}
                select
                label="departmentName"    //  if (isEdit) value = ''
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
              </TextField> */}
            </Container>
          }
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
            closeHandler(false)
            setFormObject({})
            setIsEdit(false)
          }}
          >Close</Button>
          <Button
            onClick={() => {
              okHandler({ ...formObject, label: entityLabel })
              setFormObject({})
            }}
            type="onSubmit"
          >{isEdit ? 'Edit' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
    </ValidatorForm>
  )
}

export default ModalAddEdit;
