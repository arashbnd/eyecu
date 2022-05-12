import { SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED } from "../types"



export const authIntialState = {
    authenticated: false,
    user: {}
}

const authReducer = (state = authIntialState, action) =>{
    switch (action.type){
        case SET_AUTHENTICATED:
            return{
                ...state,
                authenticated:true
            };
        case SET_UNAUTHENTICATED:
            return authIntialState;
        case SET_USER:
            return{
                authenicated: true,
                ...action.payload
            };
        default:
            return state;
    }

}

export default authReducer;