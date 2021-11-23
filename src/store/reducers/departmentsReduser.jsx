const initialState = {
  departments: [],  //  get it from database?
}

export const reducerDepartments = (state = initialState, action) => {
  const { departments } = state;
  
  switch (action.type) {
    case "GET_DEPARTMENTS":
      return {
        ...state,
        Department: action.department,    //
        Description: action.description,  //
      };
    case "ADD_DEPARTMENT":
      return {
        ...state,
        Department: action.department,
        Description: action.description,
      };
    case "EDIT_DEPARTMENT":
      return {
        ...state,
        Department: action.department,
        Description: action.description,
      };
    case "DELETE_DEPARTMENT":
      return {
        ...state,
        Department: action.department,    //
        Description: action.description,  //
      };    
    default:
      return state;
  }
};
