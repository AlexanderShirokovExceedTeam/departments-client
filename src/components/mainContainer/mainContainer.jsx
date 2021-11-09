import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import SideBar from '../sidebar/sideBar';
import HeaderComponent from '../headerComponent/headerComponent';
import RenderEntity from '../renderEntity/renderEntity';
import ModalAddEdit from '../modalAddEdit/modalAddEdit';
import './mainContainer.scss';

const MainContainer = ({ entity }) => {
  const [openModal, setOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [formObject, setFormObject] = useState(entity);

  useEffect(() => {
    if (localStorage.getItem('departments')) {
      setDepartments(JSON.parse(localStorage.getItem('departments')));
    }    
    if (localStorage.getItem('employee')) {
      setEmployee(JSON.parse(localStorage.getItem('employee')));
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('departments', JSON.stringify(departments));
  }, [departments])

  useEffect(() => {
    localStorage.setItem('employee', JSON.stringify(employee));
  }, [employee])

  const okHandler = (entityObject) => {
    if (entity.label === 'Department') {
      setDepartments([...departments, entityObject]);
    } else if (entity.label === 'Employee') {
      setEmployee([...employee, entityObject]);
    } else {
      //  if entity is object
    }
    
    setOpenModal(false);
  }

  return (
    <Container className="main-container">
      <SideBar />
      <Container className="content">
        <HeaderComponent
          openModal={() => setOpenModal(true)}
          label={entity.label}
        />
        <RenderEntity
          entity={entity}
          departments={departments}
          employee={employee}
          openModal={() => setOpenModal(true)}
          setIsEdit={() => setIsEdit(true)}
          okHandler={okHandler}
          formObject={formObject}
          setFormObject={setFormObject}
        />
      </Container>
      <ModalAddEdit
        departments={departments}
        openModal={openModal}
        closeHandler={() => setOpenModal(false)}
        entity={entity}
        isEdit={isEdit}
        okHandler={okHandler}
        formObject={formObject}
        setFormObject={setFormObject}
      />
    </Container>
  )
}

export default MainContainer;
