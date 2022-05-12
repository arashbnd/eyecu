import {
    SET_USER,
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_UNAUTHENTICATED,
    LOADING_USER,
    MARK_NOTIFICATIONS_READ,
    SET_AUTHENTICATED
  } from '../types';

  import axios from 'axios';
  import { blobToBase64 } from '../../utils/utils';
// we're gonna take out the dispatch from every part and we're gonna pass the dispatch in so we can move things around
  export const loginUser = (userData, navigate, dispatch) =>{
    dispatch({type: LOADING_UI});
    axios
    .post('/login', userData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      getUserData(dispatch);
      dispatch({ type: CLEAR_ERRORS });
      navigate("/newhome");
    })
    .catch((err) => {
      if(!err.response){
        dispatch({
          type: SET_ERRORS,
          payload: {general:"Backend Error"} // need to do this for all of them
        });
      }
      else{
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        });
      }
    });    
}

export const getUserData = (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .get('/user')
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data
      });
      dispatch({type:SET_AUTHENTICATED});
    })
    .catch((err) => console.log(err));
};

  export const test = (userData, navigate, dispatch) =>{
    dispatch({type: LOADING_UI})
  }
  export const signUpUser = (newUserData, navigate, dispatch) =>{
    dispatch({ type: LOADING_UI });
    axios
      .post('/signup', newUserData)
      .then((res) => {
        setAuthorizationHeader(res.data.token);
        getUserData(dispatch)
        dispatch({ type: CLEAR_ERRORS });
        navigate("/newhome");
      })
      .catch((err) => {
        console.log(err)
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        });
      });
}

const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
  };

export const logoutUser = (navigate, dispatch)  =>{
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({type: SET_UNAUTHENTICATED});
    navigate("/login");
}

export const uploadImage = async (dispatch, image, navigate) =>{
    dispatch({type: LOADING_UI}) // this is a maybe
    axios
    .post('/upload', image?.form_data, {
      headers: {
        "content-type": "multipart/form-data"
      }
    })
    .then((res) => {
      getUserData(dispatch)
      dispatch({ type: CLEAR_ERRORS });
      navigate("/"); // change this to navigate home
    })
    .catch((err) => {
      console.log(err)
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
    //axios.post('/upload', image, ) # need to figure out how to pass this as data not url

}