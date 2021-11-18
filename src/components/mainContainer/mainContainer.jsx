import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import axios from 'axios';
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
  const [currentDepartment, setCurrentDepartment] = useState('');
  const [sortedEmployee, setSortedEmployee] = useState([]);
  
  useEffect(() => {
    axios
      .get("http://localhost:8000/departments")
      .then((res) => {
        if (res) {
          setDepartments(res.data.data);
        }
      })
      .catch((err) => {
        console.log(`get departments error`, err);
      });

    axios
      .get(`http://localhost:8000/employees?department=${currentDepartment}`)
      .then((res) => {
        if (res) {
          setSortedEmployee(res.data.data);
        }
      })
      .catch((err) => {
        console.log(`get employees error`, err);
      });
  }, []);

  const okHandler = (entityObject) => {

    // Object.keys(entityObject).map(key => entityObject[key] = entityObject[key].trim());

    const closeModal = () => {
      setOpenModal(false);
      setIsEdit(false);
      setIndexOfEdit('');
    }
    if (entity === "Department") {
      const { _id, name, description } = entityObject;
      if (isEdit && name) {
        axios.patch('http://localhost:8000/department/edit', entityObject)
          .then(res => {
            if (res) {
              console.log(`res.data.data`, res.data.data)
              setDepartments(res.data.data)
            }
          }).catch(err => {
            console.log(`edit department error`, err);
          });
        closeModal();
      } else if (!isEdit && name) {
        axios.post('http://localhost:8000/department/add', entityObject)
          .then(res => {
            if (res) {
              setDepartments([...departments, res.data.data]);
            }
          }).catch(err => {
            console.log(`add department error`, err);
          });
        closeModal();
      } else {
        console.log("NAME IS REQUIRED!")
      }
    } else {
      const tempEmployee = { ...entityObject, department: currentDepartment }
      const { _id, email, name, age, position } = tempEmployee;
      if (isEdit && email && name && age && position) {
        axios.patch('http://localhost:8000/employee/edit', tempEmployee)
        .then(res => {
          if (res) {
            // setSortedEmployee(res.data.data);
            // sortedEmployee.splice(indexOfEdit, 1, tempEmployee);
            // setSortedEmployee([...sortedEmployee, res.data.data]);
          }
        }).catch(err => {
          console.log('edit employee error', err);
        });
        closeModal();
      } else if (!isEdit && email && name && age && position) {
        axios.post('http://localhost:8000/employee/add', tempEmployee)
          .then(res => {
            if (res) {
              setSortedEmployee([...sortedEmployee, res.data.data]);
            }
          }).catch(err => {
            console.log(`add employee error`, err);
          })
        closeModal();
      } else {
        console.log("FILL ALL REQUIRED FIELDS!")
      }
    }
  }

  const deleteEntity = (objectForDelete, indexOfDelete, idOfDelete) => {
    if (entity === "Department") {
      axios
        .delete(`http://localhost:8000/department/delete?_id=${idOfDelete}`)
        .then(() => {
          departments.splice(indexOfDelete, 1);
          setDepartments([...departments]);
        })
        .catch((err) => {
          console.log(`delete department error`, err);
        });
    } else {
      axios
        .delete(`http://localhost:8000/employee/delete?_id=${idOfDelete}`)
        .then(() => {
          const index = sortedEmployee.indexOf(objectForDelete);
          sortedEmployee.splice(index, 1);
          setSortedEmployee([...sortedEmployee]);
        })
        .catch((err) => {
          console.log("delete employee error", err);
        });
    }
  };
console.log(`sortedEmployee`, sortedEmployee)
  return (
    <Container className="main-container">
      <SideBar />
      <Container className="content">
        <HeaderComponent
          openModal={setOpenModal}
          entity={entity}
        />
        <RenderEntity
          entity={entity}
          departments={departments}
          employee={employee}
          openModal={setOpenModal}
          setIsEdit={setIsEdit}
          okHandler={okHandler}
          formObject={formObject}
          setFormObject={setFormObject}
          setIndexOfEdit={setIndexOfEdit}
          deleteEntity={deleteEntity}
          currentDepartment={currentDepartment}
          setCurrentDepartment={setCurrentDepartment}
          sortedEmployee={sortedEmployee}
          setSortedEmployee={setSortedEmployee}
        />
      </Container>
      <ModalAddEdit
        departments={departments}
        openModal={openModal}
        closeHandler={setOpenModal}
        entity={entity}
        isEdit={isEdit}
        okHandler={okHandler}
        formObject={formObject}
        setFormObject={setFormObject}
        setIsEdit={setIsEdit}
      />
    </Container>
  )
}

export default MainContainer;
