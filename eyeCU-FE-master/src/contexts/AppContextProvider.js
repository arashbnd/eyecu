import React, { createContext, useCallback, useMemo, useReducer, useContext, useEffect } from "react";
import { combineComponents } from "../utils/combine";
// token stuff
import axios from "axios";
import jwtDecode from "jwt-decode";
import { processDispatch } from "../utils/utils";
import { SET_AUTHENTICATED, SET_UNAUTHENTICATED, SET_USER } from "./types";

import { AuthProvider } from "./AuthContext/AuthContext";
import { UIProvider } from "./UIContext/UIContext";
import { getUserData, logoutUser } from "./AuthContext/AuthActions";
import authReducer, { authIntialState } from "./AuthContext/authReducer";
import uiReducer, { uiInitialState } from "./UIContext/uiReducer";
const providers = [
    AuthProvider,
    UIProvider
]

const reducers = {
    authReducer:authReducer,
    uiReducer: uiReducer
}

const initialState = {
    authIntialState: authIntialState,
    uiInitialState: uiInitialState
}
    
const combineDispatch = (...dispatches) => (action) => {
  dispatches.forEach((dispatch) => dispatch(action));
}

const combineDictionaries = (dics) =>{
    
}
const combineReducers = (slices) => {
    return (state, action) =>
      Object.keys(slices).reduce(
        (acc, prop) => ({
          ...acc,
          [prop]: slices[prop](acc[prop], action)
        }),
        state
      )
  }
  
const reduceReducers = (...reducers) => { 
    return (state, action) =>
      reducers.reduce((acc, nextReducer) => nextReducer(acc, action), state)
  }

export const GlobalContext = createContext({});
export const DispatchContext = createContext();
export const StateContext = createContext();

export const GlobalContextProvider = ({ children }) =>{
    
    const [authState, authDispatch] = useReducer(authReducer, authIntialState);
    const [uiState, uiDispatch] = useReducer(uiReducer, uiInitialState);



    const combinedDispatch = useCallback(combineDispatch(authDispatch, uiDispatch), [authDispatch, uiDispatch]);
    const combinedState = useMemo(()=>({authState, uiState, }, [authState, uiState]));

    useEffect(()=>{
      console.log("looking for token")
      const token = localStorage.FBIdToken;
      if (token){
        console.log("found token")
        const decodedToken = jwtDecode(token);
        if ((decodedToken.exp * 1000) < Date.now()){
          console.log("Token does not work")
          processDispatch(combinedDispatch, SET_UNAUTHENTICATED)
          logoutUser(combinedDispatch); // no idea if this works 
          window.location.href = '/signup'; // TODO change back to login
        }
        else{
          console.log("setting token");
          processDispatch(combinedDispatch, SET_AUTHENTICATED);
          axios.defaults.headers.common['Authorization'] = token;
          processDispatch(combinedDispatch, SET_USER);
          getUserData(combinedDispatch)
          }
      }
    }, [])

    return(
        <DispatchContext.Provider value={combinedDispatch}>
            <StateContext.Provider value={combinedState}>
                {children}
            </StateContext.Provider>
        </DispatchContext.Provider>
        // <GlobalContext.Provider value={store}>
        //     {children}
        // </GlobalContext.Provider>
    )
}



export const AppContextProvider = combineComponents(...providers);