import React, { useContext, useEffect, useRef, useState } from 'react'
import { DispatchContext, StateContext } from '../contexts/AppContextProvider'
import { authIntialState } from '../contexts/AuthContext/authReducer';
import { uploadImage } from '../contexts/AuthContext/AuthActions';
import { useNavigate } from "react-router-dom"
import { Alert,Form, Button, Container, Row, Col, Card, Modal } from "react-bootstrap"
export default function Home() {
  const dispatch = useContext(DispatchContext);
  const [authState, uiState] = useContext(StateContext);
  console.log(authState)
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
  // useEffect(()=>{

  // }, [authState])
  const [selectedPicture, setSelectedPicture] = useState(null);
  const [changePicture, setChangePicture] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleClose = () => setChangePicture(!changePicture); // also add getting rid of picture

  const handlePictureChange = (e) =>{
    e.preventDefault();
    setChangePicture(!changePicture)
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    uploadImage(dispatch, selectedPicture, navigate);
  }
  const handleUploadPicture = (e) =>{
    if (e.target.files && e.target.files[0]){
      let img = e.target.files[0];
      const formData = new FormData();
      
      formData.append('file', img);
      formData.append('fileName', img.name);
      formData.append('fileType', img.type);
      formData.append('entityName', img.name);
      const all_data ={
        form_data: formData,
        img: URL.createObjectURL(img)
      }
      setSelectedPicture(all_data) // todo get rid of old image so we dont destroy the local memory
    }
  }

  return (
    <Container fluid>
                <Col>
                    <div className="Content">
                        <Card className="Tile">
                            <Card.Body className="TileHead">
                                <h2>Profile</h2>
                            </Card.Body>
                        </Card>
                        <Card className="Tile">
                            <Card.Body className="TileBody">
                                <strong>Name: {userData?.full_name}</strong>
                                <hr/>
                                <strong>{changePicture.toString()}</strong>
                                <br></br>
                                <br></br> 
                                <img src={userData?.image}/> 
                                <Form onSubmit={handlePictureChange}>
                                    <Button type="submit">Change Picture</Button>   
                                </Form>                    
                            </Card.Body>
                        </Card>
                    </div>
                </Col>
                <Modal show={changePicture} onHide={handleClose}> 
                    <Modal.Header closeButton>
                      <Modal.Title>
                        New Picture
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    {errors && <Alert variant="danger" style={{fontSize:"20px"}}>{errors.general}</Alert>}
                        <img  width={"250px"} src={selectedPicture?.img} />
                    </Modal.Body>
                    <Modal.Footer>
                      <form>
                          <Button onClick={()=>{inputRef.current?.click()}}variant="primary" > {/* add logic so it uploads picture here*/}
                              {selectedPicture == null ? "Upload Picture" : "Upload New Picture"}
                              <input type="file" ref={inputRef} className="d-none" accept="image/png, image/jpeg" onChange={handleUploadPicture} />
                          </Button>
                          
                      </form>
                      <Button variant="primary" onClick={handleSubmit} disabled={selectedPicture === null}> {/* add logic so it uploads picture here*/}
                          Save Changes
                      </Button>
                  </Modal.Footer>
              </Modal>
    </Container>
  )
}
