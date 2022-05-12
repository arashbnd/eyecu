import { createContext, useContext, useReducer } from "react";
import uiReducer, { uiInitialState } from "./uiReducer";

const UIContext = createContext();
export const UIProvider = ({children}) =>{
    const [state, dispatch] = useReducer(uiReducer, uiInitialState)
    // Add actions here
    // ex log in and what not

    const value = {
        loading:state.loading,
        errors:state.errors
        
    }
    return <UIContext.Provider value={value}>{children}</UIContext.Provider>
};
const useUI = () =>{
    const context = useContext(UIContext);
    if (context === undefined){
        console.log("UI Context not working");
        throw new Error("useUI must be used within UIContext");
    }
    return context
}

export default useUI;