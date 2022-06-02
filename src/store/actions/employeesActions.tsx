import axios from "axios";
import { types } from "../types/employeeActionTypes";
import { IDepartment, IEmployee } from "../../types"

export const fetchDataStart = () => {
  return {
    type: types.FETCH_DATA_START,
  }
}

export const fetchDataError = (error: any) => {
  return {
    type: types.FETCH_DATA_ERROR,
    payload: error,
  }
}

export const getEmployeesSuccess = (employees: any) => {
  return {
    type: types.GET_EMPLOYEES_SUCCESS,
    payload: employees,
  };
};

export const getEmployees = (currentDepartment: string) => {
  return (dispatch: Function) => {
    dispatch(fetchDataStart());
    axios
      .get(`http://localhost:8000/employees/${currentDepartment}`)
      .then((res) => {
        if (res) {
          dispatch(getEmployeesSuccess(res.data.data));
        }
      })
      .catch((err) => {
        console.log(`err`, err);
        dispatch(fetchDataError(err));
      });
  };
};

export const createEmployeeSuccess = (newEmployee: IEmployee) => {
  return {
    type: types.ADD_EMPLOYEE_SUCCESS,
    payload: newEmployee,
  };
};

export const createEmployee = (newEmployee: IEmployee) => {
  return (dispatch: Function) => {
    dispatch(fetchDataStart());
    axios
      .post("http://localhost:8000/employee/add", newEmployee)
      .then((res) => {
        if (res) {
          dispatch(createEmployeeSuccess(res.data.data));
        }
      })
      .catch((err) => {
        console.log(`err`, err);
        dispatch(fetchDataError(err));
      });
  };
};

export const editEmployeeSuccess = (employee: IEmployee) => {
  return {
    type: types.EDIT_EMPLOYEE_SUCCESS,
    payload: employee,
  };
};

export const editEmployee = (employee: IEmployee, employees: any) => {
  return (dispatch: Function) => {
    dispatch(fetchDataStart());
    axios
      .patch(`http://localhost:8000/employee/edit/${employee._id}`, employee)
      .then((res) => {
        if (res) {
          const tempSortedEmployee = employees.map((item: IEmployee) => {
            if (item._id === res.data._id) {
              return res.data;
            }

            return item;
          });

          dispatch(editEmployeeSuccess(tempSortedEmployee));
        }
      })
      .catch((err) => {
        console.log(`err`, err);
        dispatch(fetchDataError(err));
      });
  };
};

export const deleteEmployeeSuccess = (employeeId: string) => {
  return {
    type: types.DELETE_EMPLOYEE_SUCCESS,
    payload: employeeId,
  };
};

export const deleteEmployee = (employeeId: any) => {
  return (dispatch: Function) => {
    dispatch(fetchDataStart());
    axios
      .delete(`http://localhost:8000/employee/delete/${employeeId}`)
      .then(() => {
        dispatch(deleteEmployeeSuccess(employeeId));
      })
      .catch((err) => {
        console.log(`err`, err);
        dispatch(fetchDataError(err));
      });
  };
};
