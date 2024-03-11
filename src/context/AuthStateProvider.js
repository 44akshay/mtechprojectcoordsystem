import React, { createContext, useContext, useReducer } from 'react'

export const UserStateContext=createContext();

export const AuthStateProvider = ({reducer,initialState,children}) => {
  return (
       <UserStateContext.Provider value={useReducer(reducer,initialState)}>
            {children}
       </UserStateContext.Provider> 
     )
}

export const useAuthStateValue=()=>useContext(UserStateContext);