// import React from 'react'

// export default function Login() {
//   return (
//     <div>Login</div>
//   )
// }

import React, {useContext, useEffect, useRef, useState} from 'react'
import { Alert, Form, Button, Card } from 'react-bootstrap'
import { Link, useNavigate } from "react-router-dom"
import { loginUser, test } from '../contexts/AuthContext/AuthActions';
import { DispatchContext, StateContext } from '../contexts/AppContextProvider';
export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [localErrors, setLocalErrors] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useContext(DispatchContext);
    const [authState, uiState] = useContext(StateContext);
    if(authState.authenticated){
      navigate("/newhome");
    }
    const [authenticated, setAuthenticated] = useState(authState.authenticated);
    const [errors, setErrors] = useState(uiState.errors)
    const [nonLocalLoading, setNonLocalLoading] = useState(uiState.loading)
    useEffect(()=>{
      setErrors(uiState.errors)
      setNonLocalLoading(uiState.loading)
    }, [uiState.errors, uiState.loading])

    function handleSubmit(e){
        e.preventDefault()
        setErrors({});
        setLoading(true)
        const object = {
          username: emailRef.current.value,
          password: passwordRef.current.value,
        }
        loginUser(object, navigate, dispatch)

    }
  return (
    // style={{maxWidth:'400px'}}
      <div className="w-100" style ={{}} > 
      <Card>
          <Card.Body>
              <h1 className='text-center mb-4' style={{fontSize:'300%'}}>Log in</h1>
              {errors && <Alert variant="danger">{errors.general}</Alert>}
          </Card.Body>
          <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label style={{fontSize:'150%'}}>Username</Form.Label>
                <Form.Control type="username" style={{padding:'5px',fontSize:'100%'}} ref={emailRef}required/>
              </Form.Group>
              <Form.Group id="password">
                <Form.Label style={{fontSize:'150%'}}>Password</Form.Label>
                <Form.Control  type="password" style={{padding:'5px',fontSize:'100%'}} ref={passwordRef}required/>
              </Form.Group>
              <Button id="login-button" type="submit" disable={loading.toString() || nonLocalLoading.toString()}className='w-100'><p>Log In</p></Button>
          </Form>
          <h3>Don't have an account?</h3> <Link to="/signup"><h3>Sign up</h3></Link>
      </Card>
      {/* the "don't have an account, sign up" was outside of the card, I put it inside */}
      {/* <div className='w-100 text-center mt-2'> 
          Don't have an account? <Link to="/signup">Sign up</Link>
      </div> */}
    </div>
  )
}
