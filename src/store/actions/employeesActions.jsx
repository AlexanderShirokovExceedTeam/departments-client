import { useDispatch, useSelector } from "react-redux";

const dispatch = useDispatch();
const employees = useSelector(state => state.employees)