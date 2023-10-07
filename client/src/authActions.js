// Define Redux actions for authentication
export const setAuth = ({ user, token }) => {
    return {
      type: 'SET_AUTH',
      payload: { user, token },
    };
  };
  
  export const clearAuth = () => {
    return {
      type: 'CLEAR_AUTH',
    };
  };
  