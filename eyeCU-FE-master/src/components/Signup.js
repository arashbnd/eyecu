import React, {useContext, useEffect, useRef, useState} from 'react'
import { Alert, Form, Button, Card } from 'react-bootstrap'
import { Link, useNavigate } from "react-router-dom"
import { loginUser, signUpUser, test } from '../contexts/AuthContext/AuthActions';
import { DispatchContext, StateContext } from '../contexts/AppContextProvider';
export default function Signup() {
    const userRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [localErrors, setLocalErrors] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    // const [globalState, globalDispatch] = useContext(GlobalContext);
    const dispatch = useContext(DispatchContext);
    const [authState, uiState] = useContext(StateContext);
    if(authState.authenticated){
      navigate("/newhome");
    }
    const [authenticated, setAuthenticated] = useState(authState.authenticated);
    const [errors, setErrors] = useState(uiState.errors)
    const [nonLocalLoading, setNonLocalLoading] = useState(uiState.loading)
    //const [nonlocalErrors, setNonlocalErrors] = useState(uiState);
    // Todo we must figure out how to get the errors from the state to the be presented - Done
    // Must add validation on front end before sending over to the front end
    
    // This function will update our errors ors 
    useEffect(()=>{
      setErrors(uiState.errors)
      setNonLocalLoading(uiState.loading)
    }, [uiState.errors, uiState.loading])

    function handleSubmit(e){
        e.preventDefault()
        setErrors({});
        setLoading(true)
        if(passwordRef.current.value != passwordConfirmRef.current.value){
          return setErrors({general:"Passwords do not match!"}); // need to keep errors here
        }
        const object = {
          username: userRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
          confirmPassword: passwordConfirmRef.current.value 
        }
        signUpUser(object, navigate, dispatch)

    }
  return (
  // style={{maxWidth:'400px'}}
      <div className="w-100" style={{}}>
      <Card id="signup-card">
          <Card.Body>
              <h2 className='text-center mb-4'style={{fontSize:'300%'}}> Sign Up</h2>
              {errors && <Alert variant="danger">{errors.general}</Alert>}
          </Card.Body>
          <Form onSubmit={handleSubmit}>
              <Form.Group id="username">
                <Form.Label style={{fontSize:'100%'}}>Username</Form.Label>
                <Form.Control type="username" style={{padding:'5px',fontSize:'100%'}} ref={userRef}required/>
              </Form.Group>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" style={{padding:'5px',fontSize:'100%'}} ref={emailRef}required/>
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password"style={{padding:'5px',fontSize:'100%'}} ref={passwordRef}required/>
              </Form.Group>
              <Form.Group id="password-confirm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control type="password" style={{padding:'5px',fontSize:'100%'}}ref={passwordConfirmRef}required/>
              </Form.Group>
              <Button  id="signup-button" type="submit" style={{padding:'5px',fontSize:'100%'}} disable={loading.toString() || nonLocalLoading.toString()}className='w-100'>Sign Up</Button>
          </Form>
          <h3>Already have an account? <Link to="/login">Log In</Link></h3>
      </Card>
      {/* <div className='w-100 text-center mt-2'>
          Already have an account? <Link to="/login">Log In</Link>
      </div> */}
    </div>
  )
}
