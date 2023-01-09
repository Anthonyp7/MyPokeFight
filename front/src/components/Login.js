import React, { useState } from "react"
import axios from "axios"
import { Navigate, useNavigate } from "react-router-dom";
import '../styles/Login.css';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';


export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [signin, setSignin] = useState(false);
    const navigate = useNavigate();

    const [showSuccess, setShowSuccess] = useState(false);
    const [showSuccess2, setShowSuccess2] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showError2, setShowError2] = useState(false);
    const [showError3, setShowError3] = useState(false);

    // eslint-disable-next-line
    const [pokeAvatar, setPokeAvatar] = useState([`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${(Math.floor(Math.random() * 905) + 1)}.png`]);

    // eslint-disable-next-line
    const [tab, setTab] = useState([]);
    const [i, setI] = useState(0);


    const SignUp = () => {

      console.log(username, password)

      axios.post('http://localhost:3080/login',
          {
              mode: 'no-cors',
              username: username,
              password: password,
              pokeavatar: pokeAvatar[i]
          })
          .then(res => {
            console.log("data", res.data)              

            
              // VERIFICATION CREATE SUCCESS OU ERROR
            if (res.data.code === 201) {
                setShowSuccess(true);
            }
            else if (res.data.code === 400) {
                setShowError(true);
            }
            else if (res.data.code === 401) {
                setShowError2(true);
            }
            //   if (res.data.code === 200) {
            //       // move to home
            //       navigate('/')
            //       localStorage.setItem('TOKEN', res.data.token)
            //       localStorage.setItem('EMAIL', res.data.email)
            //   }


          }).catch(err => {
              console.log(err)
        })
        // console.log("pokeAvatar-mongo", pokeAvatar);
        // console.log("pokeAvatar-mongo-user", pokeAvatar[i]);
        
        

        setI(i+1);
        setTab(pokeAvatar.push(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${(Math.floor(Math.random() * 905) + 1)}.png`));
    }


    const SignIn = () => {
  
        axios.post('http://localhost:3080/signin',
            {
                mode: 'no-cors',
                username: username,
                password: password,
                pokeavatar: pokeAvatar[i]
            })
            .then(res => {
                console.log("data", res.data)

                if (res.data.code === 201) {
                    setShowSuccess2(true);
                    navigate('/')
                }
                else if (res.data.code === 400) {
                    setShowError(true);
                }
                else if (res.data.code === 402) {
                    setShowError3(true);
                }

            }).catch(err => {
                console.log(err)
            })
            console.log(username, password)
    }



    const changeSigninForm = () => {
      setSignin(true);
    }

    const changeSignupForm = () => {
        setSignin(false);
    }

    // const changePokeAvatar = () => {
    //     setPokeAvatar(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${(Math.floor(Math.random() * 905) + 1)}.png`);
    //     console.log("pokeAvatar func", pokeAvatar);
    // }

    const popover = (
        <Popover id="popover-basic">
            {showError === false || showError2 === false ?
                <Popover id="popover-basic">
                    <Popover.Header as="h3">Poké Avatar</Popover.Header>
                    <Popover.Body>
                        <img src={pokeAvatar[i-1]} alt=""/>
                    </Popover.Body>
                </Popover>
            :
            <Popover id="popover-basic">
            </Popover>
            
            }
        
        </Popover>
    );
    

    return (
        <div className="body" style={{backgroundImage: "url(https://i.imgur.com/O7ZWigt.png)"}}>

            <br></br>
            <h1>Register</h1> <br></br>
            <br></br>
            <div className="outcard">

                <Card style={{ width: '30rem' }} className="card-login">
                    <Card.Header>
                    <Nav variant="pills" defaultActiveKey="#first">
                        <Nav.Item>
                        <Nav.Link href="#signup" onClick={changeSignupForm}>SignUp</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link href="#signin" onClick={changeSigninForm}>SignIn</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    </Card.Header>
                    <Card.Body>

                        {/* SI ON CLIQUE SUR SIGNIN OU SIGNUP */}
                        {/* SIGNUP */}
                    {signin === false ? 
                    <>
                        <Card.Title style={{ textAlign: "center" }}>Create an Account</Card.Title> <br></br>
                        <Card.Text>
                            <Form>
                                <Form.Group className="mb-3" controlId="formGroupEmail">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control onChange={(e) => { setUsername(e.target.value) }} className="inputs" type="text"  placeholder="Username"/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formGroupPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control onChange={(e) => { setPassword(e.target.value) }} className="inputs" type="password" placeholder="Password"/>
                                </Form.Group>
                            </Form>
                        </Card.Text> 
                        <br></br>
                        <OverlayTrigger trigger="click" placement="right-start" overlay={popover} rootClose>
                            {/* disabled */}
                            <Button variant="success" className="btn-signup" onClick={() => {SignUp(); }} >Create</Button>
                        </OverlayTrigger>
                    </>
                    : 
                    <>
                    {/* SIGNIN */}
                        <Card.Title style={{ textAlign: "center" }}>SignIn</Card.Title> <br></br>
                        <Card.Text>
                            <Form>
                                <Form.Group className="mb-3" controlId="formGroupEmail">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control onChange={(e) => { setUsername(e.target.value) }} className="inputs" type="text" value={username} placeholder="Username"/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formGroupPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control onChange={(e) => { setPassword(e.target.value) }} className="inputs" type="password" placeholder="Password"/>
                                </Form.Group>
                            </Form>
                        </Card.Text> 
                        <br></br>
                        {/* <OverlayTrigger trigger="click" placement="right-start" overlay={popover} rootClose> */}
                            {/* disabled */}
                            <Button variant="primary" className="btn-signup"  onClick={() => {SignIn(); }} >Connect</Button>
                        {/* </OverlayTrigger> */}
                    </>
                    }
                    
                    </Card.Body>
                </Card>
            </div>
            <img style={{ position: "absolute", top: "150px", right: "600px" }} src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/491.gif"} alt="darkrai" />
            <img style={{ position: "absolute", top: "400px", left: "350px" }} src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/250.gif"} alt="oh-ho" />
            <img style={{ position: "absolute", top: "600px", right: "400px" }} src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/334.gif"} alt="altaria" />
            <img style={{ width:"2%", position: "absolute", bottom: "153px", left: "-10px" }} src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/321.gif"} alt="wailord" />
            <img style={{ position: "absolute", top: "650px", right: "800px" }} src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/567.gif"} alt="boreas" />
            <img style={{ position: "absolute", top: "250px", right: "50px" }} src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/641.gif"} alt="{pokemon}" />

            {/* <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/641.gif"} alt="{pokemon}" /> */}

            {/* SUCCESS */}
            <Alert show={showSuccess2} variant="info" className="alert-login" onClick={() => setShowSuccess2(false)} dismissible>
                Login Successful  !
            </Alert>
            <Alert show={showSuccess} variant="info" className="alert-login" onClick={() => setShowSuccess(false)} dismissible>
                Your Account is created !
            </Alert>
            {/* ERROR CREATE */}
            <Alert show={showError} variant="danger" className="alert-login" onClick={() => setShowError(false)} dismissible>
                Username or Password Missing !
            </Alert>
            <Alert show={showError2} variant="danger" className="alert-login" onClick={() => setShowError2(false)} dismissible>
                Username Already Chosen !
            </Alert>
            {/* ERROR CONNECTION */}
            <Alert show={showError3} variant="danger" className="alert-login" onClick={() => setShowError3(false)} dismissible>
                Username or Password is Incorrect !
            </Alert>
        </div>
    )
}

