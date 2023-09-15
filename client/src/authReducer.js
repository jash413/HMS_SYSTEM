import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_AUTH':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case 'CLEAR_AUTH':
      return {
        ...state,
        user: null,
        token: null,
      };
    default:
      return state;
  }
};

const store = configureStore({
  reducer: { auth: authReducer }, // You can have multiple reducers here
});

export default store;
