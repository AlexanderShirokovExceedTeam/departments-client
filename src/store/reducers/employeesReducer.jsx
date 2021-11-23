const initialState = {
  employees: [],  //  get it from database?
}

export const reducerEmployees = (state = initialState, action) => {
  const { employees } = state;

  switch (action.type) {
    case "GET_EMPLOYEES":
      return {
        ...state,
        Department: action.department,    //
        Description: action.description,  //
      };
    case "ADD_EMPLOYEE":
      return {
        ...state,
        Department: action.department,
        Description: action.description,
      };
    case "EDIT_EMPLOYEE":
      return {
        ...state,
        Department: action.department,
        Description: action.description,
      };
    case "DELETE_EMPLOYEE":
      return {
        ...state,
        Department: action.department,    //
        Description: action.description,  //
      };    
    default:
      return state;
  }
};
