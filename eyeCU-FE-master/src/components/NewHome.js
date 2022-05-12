import React from 'react'
import Sidebar from './Sidebar'
import Lock from './Lock'
import Video from './Video'
export default function NewHome() {
    return (
        <div>
            <Sidebar active={"dashboard"}/>
            <section id='content'>
                <main>
                    <div className="head-title">
                        <div className="left">
                            <h1>Home</h1>
                            <ul className="breadcrumb">
                                <li>
                                    <a href="#">Dashboard</a>
                                </li>
                                <li><i className='bx bx-chevron-right'></i></li>
                                <li>
                                    <a className="active" href="#">Home</a>
                                    {/**This part is where we have the most active part of the board?? */}
                                </li>
                            </ul>
                        </div>
                    </div>
    
                    <div className="table-data">
                        <div className="order">
                            <div className="head" height="50%">
                                <h3>Camera</h3>
                            </div>
                            <div className="video-feature" id="videoFeature">
                                {/** Add logic here to add the live video feed  */}
                                <Video/>
                                {/* <img src="img\solidblack-background.jpg" width="100%" className="feature-img" id="displayImg"/> */}
                            </div>
                        </div>
                        <div className="todo">
                            <div className="head" style={{display: "none"}}>
                                <h3>Activity Logs</h3>
                                <i className='bx bx-plus'></i>
                                <i className='bx bx-filter'></i>
                            </div>
                            <ul className="todo-list" style={{display: "none"}}>
                                <li className="completed">
                                    <p>Vi Nguyen was recognized</p>
                                    <i className='bx bx-dots-vertical-rounded'></i>
                                </li>
                                <li className="completed">
                                    <p>You granted access to Vi Nguyen</p>
                                    <i className='bx bx-dots-vertical-rounded'></i>
                                </li>
                                <li className="not-completed">
                                    <p>An unknown person was recognized</p>
                                    <i className='bx bx-dots-vertical-rounded'></i>
                                </li>
                                <li className="completed">
                                    <p>You granted access to Vi Nguyen</p>
                                    <i className='bx bx-dots-vertical-rounded'></i>
                                </li>
                                <li className="completed">
                                    <p>An unknown person was recognized</p>
                                    <i className='bx bx-dots-vertical-rounded'></i>
                                </li>
                            </ul>
                        </div>
                    </div>
    
                    <ul className="box-info">
                    <li>
                        <span>
                            <i className='bx bxs-user-check'></i>
                        </span>
                        <span className="text">
                            <h3>Face Recognition</h3>
                            <p>Vi Nguyen</p>
                        </span>
                    </li>
                    <li>
                        {/* <span>
                            <i id="lock-icon" className='bx bxs-lock-alt'></i> 
                            <i id="unlock-icon" className='bx bxs-lock-open-alt' style={{display:"none"}}></i>
                        </span>
                        <span className="text">
                            <h3 className="box-title">Grant Access</h3>
                            <div className="buttons">
                                <button id="lock-btn" className="unlock-btn" type="submit"
                                    onclick="toggleLock()">Unlock</button>
                            </div>
                        </span> */}
                        <Lock/>
                    </li>
                    <li>
                        <i className='bx bxs-phone-call'></i>
                        <span className="text">
                            <h3>Emergency</h3>
                            <button className="emergency-btn" type="submit">Call 911</button>
                        </span>
                    </li>
                </ul>
    
    
    
                </main>
            </section>
    
        </div>
      )
}
