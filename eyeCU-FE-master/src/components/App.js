import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import Signup from "./Signup";
import Login from "./Login";
import Home from "./Home";
import axios from 'axios';
import jwtDecode from "jwt-decode";
import { AppContextProvider } from "../contexts/AppContextProvider";
import { GlobalContextProvider, StateContext, DispatchContext } from "../contexts/AppContextProvider";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { getUserData, logoutUser } from "../contexts/AuthContext/AuthActions";
import { SET_AUTHENTICATED } from "../contexts/types"
import Video from "./Video";
import Profile from "./Profile";
import { processDispatch } from "../utils/utils";
import Settings from "./Settings";
import NewHome from "./NewHome";
axios.defaults.baseURL = 'http://localhost:5001'

function App() {
  return (
    <Container className="d-flex align-items-center justify-content-center" style={{minHeight:'100vh'}}>
    <GlobalContextProvider>
      <Router>
              <Routes>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/settings" element={<Settings/>}/>
                <Route path="/newhome" element={<NewHome/>}/>
                <Route path="*" element={<Navigate to={{pathname: "/newhome"}} />} />
              </Routes>
      </Router>
      </GlobalContextProvider>
    </Container>
  );
}

export default App;
