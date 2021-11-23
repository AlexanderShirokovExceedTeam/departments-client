import { useDispatch, useSelector } from "react-redux";

const dispatch = useDispatch();
const departments = useSelector(state => state.departments)

// const getDepartments = () => {
//   dispatch({type: "GET_DEPARTMENTS"})  //  payload: "http://localhost:8000/departments" ??
// }

// getDepartments,
// createDepartment,
// editDepartment,
// deleteDepartment,