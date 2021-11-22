import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import SideBar from "../sidebar/sideBar";
import HeaderComponent from "../headerComponent/headerComponent";
import RenderEntity from "../renderEntity/renderEntity";
import ModalAddEdit from "../modalAddEdit/modalAddEdit";

import { Container, Snackbar } from "@mui/material";
import "./mainContainer.scss";

const MainContainer = ({ entity }) => {
  const [openModal, setOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [employee, setEmployee] = useState([]); //  if i need to render all employees
  const [formObject, setFormObject] = useState(entity);
  const [sortedEmployee, setSortedEmployee] = useState([]);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [snackmessage, setSnackmessage] = useState("");

  let { id } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:8000/departments")
      .then((res) => {
        setDepartments(res.data.data);
      })
      .catch((err) => {
        setSnackmessage("Can not load departments");
        setSnackbarOpen(true);
      });
    //  get all employee if it needed
  }, []);

  useEffect(() => {
    if (entity === "Department") {
      setSortedEmployee([]);
    }
  }, [entity]);

  const okHandler = (entityObject) => {
    Object.keys(entityObject).map((key) => {
      if (typeof entityObject[key] === "string")
        entityObject[key] = entityObject[key].trim();
    });

    const closeModal = () => {
      setOpenModal(false);
      setIsEdit(false);
    };

    if (entity === "Department") {
      const { _id, name } = entityObject;

      if (isEdit && name) {
        axios
          .patch(`http://localhost:8000/department/edit/${_id}`, entityObject)
          .then((res) => {
            if (res) {
              const editedDepartments = departments.map((item) => {
                if (item._id === res.data._id) {
                  return res.data;
                }
                return item;
              });
              setDepartments(editedDepartments);
            }
          })
          .catch((err) => {
            setSnackmessage(
              "Edit department error. Name is required and must be unique."
            );
            setSnackbarOpen(true);
          });
      } else if (!isEdit && name) {
        axios
          .post("http://localhost:8000/department/add", entityObject)
          .then((res) => {
            if (res) {
              setDepartments([...departments, res.data.data]);
            }
          })
          .catch((err) => {
            setSnackmessage(
              "Add department error. Name is required and must be unique."
            );
            setSnackbarOpen(true);
          });
      } else {
        setSnackmessage("Error. Name is required.");
        setSnackbarOpen(true);
      }
    } else {
      const tempEmployee = { ...entityObject, department: id };
      const { _id, email, name, age, position } = tempEmployee;

      if (isEdit && email && name && age && position) {
        axios
          .patch(`http://localhost:8000/employee/edit/${_id}`, tempEmployee)
          .then((res) => {
            if (res) {
              const tempSortedEmployee = sortedEmployee.map((item) => {
                if (item._id === res.data._id) {
                  return res.data;
                }
                return item;
              });
              setSortedEmployee(tempSortedEmployee);
            }
          })
          .catch((err) => {
            setSnackmessage("Edit employee error. Fill all required fields.");
            setSnackbarOpen(true);
          });
      } else if (!isEdit && email && name && age && position) {
        axios
          .post("http://localhost:8000/employee/add", tempEmployee)
          .then((res) => {
            if (res) {
              setSortedEmployee([...sortedEmployee, res.data.data]);
            }
          })
          .catch((err) => {
            setSnackmessage("Add employee error. Fill all required fields.");
            setSnackbarOpen(true);
          });
      } else {
        setSnackmessage("Error. Fill all required fields.");
        setSnackbarOpen(true);
      }
    }
    closeModal();
  };

  const deleteEntity = (objectForDelete, indexOfDelete, idOfDelete) => {
    if (entity === "Department") {
      axios
        .delete(`http://localhost:8000/department/delete/${idOfDelete}`)
        .then((res) => {
          departments.splice(indexOfDelete, 1);
          setDepartments([...departments]);
        })
        .catch(() => {
          setSnackmessage("Can not delete department with employee");
          return setSnackbarOpen(true);
        });
    } else {
      axios
        .delete(`http://localhost:8000/employee/delete/${idOfDelete}`)
        .then(() => {
          const index = sortedEmployee.indexOf(objectForDelete);
          sortedEmployee.splice(index, 1);
          setSortedEmployee([...sortedEmployee]);
        })
        .catch(() => {
          setSnackmessage("Can not find deleted employee");
          setSnackbarOpen(true);
        });
    }
  };

  return (
    <Container className="main-container">
      <SideBar />
      <Container className="content">
        <HeaderComponent openModal={setOpenModal} entity={entity} />
        <RenderEntity
          entity={entity}
          departments={departments}
          employee={employee}
          openModal={setOpenModal}
          setIsEdit={setIsEdit}
          okHandler={okHandler}
          formObject={formObject}
          setFormObject={setFormObject}
          deleteEntity={deleteEntity}
          currentDepartment={id}
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
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={isSnackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message={snackmessage}
      />
    </Container>
  );
};

export default MainContainer;
