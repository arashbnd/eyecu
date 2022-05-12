import { createContext, useContext, useReducer } from "react";
import authReducer, { authIntialState } from "./authReducer";
import axios from "axios";
import {
    SET_USER,
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_UNAUTHENTICATED,
    LOADING_USER,
  } from '../types';

const AuthContext = createContext();
export const AuthProvider = ({children}) =>{
    const [state, dispatch] = useReducer(authReducer, authIntialState)
    // Add actions here
    // ex log in and what not

    const loginUser = (userData) => (dispatch) =>{
        dispatch({type:LOADING_UI})
        axios.post('/login', userData)
        .then((res) =>{
            
        })
        .catch((err) =>{
            dispatch({type:SET_ERRORS, payload:err.reponse.data})
        })
    }

    const setAuthorizationHeader = (token) =>{
        const FBIdToken = `Bearer ${token}`;
        localStorage.setItem('FBIdToken', FBIdToken);
        axios.defaults.headers.common['Authorization'] = FBIdToken;
    }

    const value = {
        authenticated: state.authenticated,
        user:state.user
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};
const useAuth = () =>{
    const context = useContext(AuthContext);
    if (context === undefined){
        console.log("Auth Context not working");
        throw new Error("useAuth must be used within AuthContext");
    }
    return context
}

export default useAuth;