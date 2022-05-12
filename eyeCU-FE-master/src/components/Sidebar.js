import React, {useRef, useState, useContext, useEffect} from 'react'
import { DispatchContext, StateContext } from '../contexts/AppContextProvider'
/**
 * 
 * Need to add logic to logout
 * Need to disable my camera and activity logs. can't do this otherwise it looks wonky
 * Need to add to pass prop to tell us which file it is
 * Need to add logic here to grab the picture from local storage of context
 */
 import { useNavigate } from "react-router-dom"
 import { logoutUser} from '../contexts/AuthContext/AuthActions';
export default function Sidebar(props) {
    const menuBar = useRef(null);
    const sidebar = useRef(null);
    const logoText = useRef(null);
    const logo = useRef(null);

    const handleMenuBarClick = () =>{
        if(logoText.current.style.display !== "none"){
            sidebar.current.classList.toggle('hide');
            logoText.current.style.display = "none";
            logo.current.style.width = "100%";
        }
        else {
            sidebar.current.classList.toggle('hide');
            logoText.current.style.display = "block";
            logo.current.style.width = "20%";
        }
    }


    const darkModeToggle = useRef(null);
    const handleDarkModeToggle = () =>{
        if(document.body.classList.contains("dark")){
            document.body.classList.remove("dark");
        }
        else{
            document.body.classList.add("dark");
        }
    }

    const navigate = useNavigate();
    const dispatch = useContext(DispatchContext);
    const [authState, uiState] = useContext(StateContext);
    const [authenticated, setAuthenticated] = useState(authState.authenticated)
    const [userData, setUserData] = useState(authState.user_data)
    const [errors, setErrors] = useState(uiState.errors)
    const [nonLocalLoading, setNonLocalLoading] = useState(uiState.loading)
    useEffect(()=>{
      setAuthenticated(authState.authenticated)
      setUserData(authState.user_data)
    }, [authState])
  
    useEffect(()=>{
      setErrors(uiState.errors)
      setNonLocalLoading(uiState.loading)
    }, [uiState.errors, uiState.loading])

  return (
    <div>
        <section id="sidebar" ref={sidebar}>
            <a class="brand"> {/** Need to add active to this part */}
                <svg id="logo" viewBox="-100,-100,200,200" style={{width: "20%"}} ref={logo}>
                    <image id="user" x="-40" y="-40" width="80" height="80" href="img/user.svg" />
                    <image id="checkmark" x="10" y="-60" width="40" height="40" href="img/green_check.svg" />
                    <g id="bodies"></g>
                    <g id="edges"></g>
                </svg><br/>
                <span class="text" id="logoText" ref={logoText}>EyeCU</span>
            </a>
            <ul class="side-menu top">
                <li className={props.active === 'dashboard'? 'active' : ''}> {/** Here is where we add the logic for which one is clicked on */}
                    <a onClick={ () => navigate("/newhome")}>
                        <i class='bx bxs-dashboard'></i>
                        <span class="text" id="dashboard">Dashboard</span>
                    </a>
                </li>
                <li>
                    <a>
                        <i class='bx bxs-camera-home'></i>
                        <span class="text" id="myCamera">My Camera</span>
                    </a>
                </li>
                <li>
                    <a>
                        <i class='bx bxs-doughnut-chart'></i>
                        <span class="text">Activity Logs</span>
                    </a>
                </li>
            </ul>
            <ul class="side-menu">
                <li className={props.active === 'settings'? 'active' : ''}>
                    <a  onClick={() => navigate("/settings")}>
                        <i class='bx bxs-cog'></i>
                        <span class="text" id="settings">Settings</span>
                    </a>
                </li>
                <li>
                    <a onClick={()=>logoutUser(navigate, dispatch)} class="logout">
                        <i class='bx bxs-log-out-circle'></i>
                        <span class="text" id="logout">Logout</span>
                    </a>
                </li>
            </ul>
        </section>

        <section id="content">
            <nav>
                <i className='bx bx-menu' ref={menuBar} onClick={handleMenuBarClick}></i>
                <form action="#" style={{visibility: "hidden"}}>
                    <div className="form-input">
                        <input type="search" placeholder="Search..."/>
                        <button type="submit" className="search-btn"><i className='bx bx-search'></i></button>
                    </div>
                </form>
                <input type="checkbox" id="switch-mode" hidden ref={darkModeToggle} onClick={handleDarkModeToggle}/>
                <label for="switch-mode" className="switch-mode"></label>
                <a  className="notification">
                    <i className='bx bxs-bell'></i>
                    <span className="num">8</span>
                </a>
                <a onClick={ () => navigate("/settings")} className="profile">
                    {userData?.image ? 
                            <>
                            <img src={userData?.image} id="miniProfile"/>
                            </>
                        :
                        <>
                            <img src={'/img/user.png'} id="miniProfile"/>
                        </>
                        }
                </a>
            </nav>
        </section>


    </div>
  )
}
