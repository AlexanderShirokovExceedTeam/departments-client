import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import SideBar from '../sidebar/sideBar';
import ContentHeader from '../contentHeader/contentHeader';
import ModalAddEdit from '../modalAddEdit/modalAddEdit';
import './mainContainer.scss';

const MainContainer = ({ entity }) => {
  const [openModal, setOpenModal] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [employee, setEmployee] = useState([]);

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
    if (entity === 'Departments') {
      setDepartments([...departments, entityObject]);
    } else if (entity === 'Employee') {
      setEmployee([...employee, entityObject]);
    } else {
      //  if entity is object
    }
    console.log('entityObject', entityObject);
    setOpenModal(false);
  }

  return (
    <Container className="main-container">
      <SideBar />
      <ContentHeader
        openModal={() => setOpenModal(true)}
        entity={entity}
        departments={departments}
        employee={employee}
      />

      <ModalAddEdit
        departments={departments}
        employee={employee}
        setEmployee={setEmployee}
        openModal={openModal}
        closeHandler={() => setOpenModal(false)}
        okHandler={okHandler}
        modalAction='Create'
        entity={entity}
      />
    </Container>
  )
}

export default MainContainer;
