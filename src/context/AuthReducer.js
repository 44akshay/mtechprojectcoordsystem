export const authInitialState = {
    user: null
  };
  
  const authReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN":
        return { 
          user: action.payload
        };
      case "LOGOUT":
        return {
          user: null
        };
        case "CHANGE_ROLE":
            return {
              ...state,
              user: {
                ...state.user,
                role: action.payload
              }
            };
      default:
        return {
          ...state
        };
    }
  };
  
  export default authReducer;
  