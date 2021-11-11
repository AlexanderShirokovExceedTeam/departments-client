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
  const [indexOfEdit, setIndexOfEdit] = useState('')
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
    departments.map(item => {
      console.log(item.name === entityObject.name);
    })
    const func = () => {
      setOpenModal(false);
      setIsEdit(false);
      setIndexOfEdit('');
    }

    if (entityObject.label === 'Department') {
      if (departments.map(item => item.name === entityObject.name)) {
        console.log("ENTER UNIQUE NAME!")
      } else if (isEdit && entityObject.name) {
        departments.splice(indexOfEdit, 1, entityObject);
        setDepartments([...departments]);
        func();
      } else if (!isEdit && entityObject.name) {
        setDepartments([...departments, entityObject]);
        func();
      } else {
        console.log("NAME IS REQUIRED!")
      }
    } else if (entityObject.label === 'Employee') {
      if (isEdit && entityObject.email && entityObject.name && entityObject.age && entityObject.position) {
        employee.splice(indexOfEdit, 1, entityObject);
        setEmployee([...employee]);
        func();
      } else if (!isEdit && entityObject.email && entityObject.name && entityObject.age && entityObject.position) {
        setEmployee([...employee, entityObject]);
        func();
      } else {
        console.log("FILL ALL REQUIRED FIELDS!")
      }
    }
  }

  const deleteEntity = (objectForDelete, indexOfDelete) => {
    if (objectForDelete.label === 'Department') {
      departments.splice(indexOfDelete, 1);
      setDepartments([...departments]);
    } else if (objectForDelete.label === 'Employee') {
      employee.splice(indexOfDelete, 1);
      setEmployee([...employee]);
    }
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
          setIndexOfEdit={setIndexOfEdit}
          deleteEntity={deleteEntity}
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
