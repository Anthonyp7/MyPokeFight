import React, { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import '../styles/Login.css';


import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import { ToastContainer } from "react-bootstrap";


export default function Login() {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // eslint-disable-next-line
    const [pokecoin, setPokecoin] = useState(4);

    const [signin, setSignin] = useState(false);
    const navigate = useNavigate();
    const ls = localStorage;
    // eslint-disable-next-line
    const [heights, setHeights] = useState(window.innerHeight - 87 + "px");


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
                username: username,
                password: password,
                pokeavatar: pokeAvatar[i],
                pokecoin: pokecoin,
                pokeid: []
            })
            .then(res => {
                console.log("data", res.data);


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


            }).catch(err => {
                console.log(err)
            })

        setI(i + 1);
        setTab(pokeAvatar.push(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${(Math.floor(Math.random() * 905) + 1)}.png`));
    }


    const SignIn = () => {

        axios.post('http://localhost:3080/signin',
            {
                mode: 'no-cors',
                username: username,
                password: password,
                pokeavatar: pokeAvatar[i],
                pokecoin: pokecoin
            })
            .then(res => {
                console.log("data", res.data)

                if (res.data.code === 201) {
                    setShowSuccess2(true);
                    ls.setItem("Token", res.data.token)
                    ls.setItem("Username", res.data.username)
                    ls.setItem("Poké-Avatar", res.data.pokeavatar)
                    ls.setItem("Poké-Coin", res.data.pokecoin)
                    ls.setItem("PokeId", res.data.pokeid)
                    navigate(`/pokedex/${ls.getItem("Username")}`)


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


    const popover = (
        <Popover id="popover-basic">
            {showError === false && showError2 === false ?
                <Popover id="popover-basic">
                    <Popover.Header as="h3">Poké Avatar</Popover.Header>
                    <Popover.Body>
                        <img src={pokeAvatar[i - 1]} alt="" />
                    </Popover.Body>
                </Popover>
                :
                <>
                </>

            }

        </Popover>
    );

    


    return (
        <div className="body" style={{ backgroundImage: "url(https://i.imgur.com/O7ZWigt.png)", height:`${heights}`}}>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>

            <br></br>
            <h1>Connexion</h1> <br></br>
            <br></br>
            <div className="outcard">

                <Card style={{ width: '30rem' }} className="card-login">
                    <Card.Header>
                        <Nav variant="pills" defaultActiveKey="#first">
                            <Nav.Item>
                                <Nav.Link href="#signup" onClick={changeSignupForm}>Créer un compte</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="#signin" onClick={changeSigninForm}>Connexion</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Card.Header>
                    <Card.Body>

                        {/* SI ON CLIQUE SUR SIGNIN OU SIGNUP */}
                        {/* SIGNUP */}
                        {signin === false ?
                            <>
                                <Card.Title style={{ textAlign: "center" }}>Créer un compte</Card.Title> <br></br>
                                <Card.Text>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="formGroupEmail">
                                            <Form.Label>Utilisateur</Form.Label>
                                            <Form.Control onChange={(e) => { setUsername(e.target.value) }} className="inputs" type="text" placeholder="Rentrez votre nom d'utilisateur" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formGroupPassword">
                                            <Form.Label>Mot de passe</Form.Label>
                                            <Form.Control onChange={(e) => { setPassword(e.target.value) }} className="inputs" type="password" placeholder="Rentrez votre mot de passe" />
                                        </Form.Group>
                                    </Form>
                                </Card.Text>
                                <br></br>
                                <OverlayTrigger trigger="click" placement="right-start" overlay={popover} rootClose>
                                    <Button variant="success" className="btn-signup" onClick={() => { SignUp(); }} >Valider</Button>
                                </OverlayTrigger>
                            </>
                            :
                            <>
                                {/* SIGNIN */}
                                <Card.Title style={{ textAlign: "center" }}>Connexion</Card.Title> <br></br>
                                <Card.Text>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="formGroupEmail">
                                            <Form.Label>Utilisateur</Form.Label>
                                            <Form.Control onChange={(e) => { setUsername(e.target.value) }} className="inputs" type="text" value={username} placeholder="Rentrez votre nom d'utilisateur" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formGroupPassword">
                                            <Form.Label>Mot de passe</Form.Label>
                                            <Form.Control onChange={(e) => { setPassword(e.target.value) }} className="inputs" type="password" placeholder="Rentrez votre mot de passe" />
                                        </Form.Group>
                                    </Form>
                                </Card.Text>
                                <br></br>
                                <Button variant="primary" className="btn-signup" onClick={() => { SignIn(); }} >Valider</Button>
                            </>
                        }

                    </Card.Body>
                </Card>
            </div>
            <div className="poke-gif">
                <img className="darkrai" style={{ position: "absolute", top: "150px", right: "600px" }} src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/491.gif"} alt="darkrai" />
                <img className="oh-ho" style={{ position: "absolute", top: "400px", left: "350px" }} src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/250.gif"} alt="oh-ho" />
                <img style={{ position: "absolute", top: "600px", right: "400px" }} src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/334.gif"} alt="altaria" />
                <img className="boreas" style={{ position: "absolute", top: "250px", right: "50px" }} src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/641.gif"} alt="boreas" />
            </div>

            {/* SUCCESS */}

            <Row>
                <Col xs={6}>
                    <ToastContainer position="bottom-end">
                        <Toast onClose={() => setShowSuccess(false)} show={showSuccess} delay={3000} autohide>
                            <Toast.Header>
                                <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                                <strong className="me-auto">MyPokéFight</strong>
                                <small>Réussi</small>
                            </Toast.Header>
                            <Toast.Body>Your Account is created !</Toast.Body>
                        </Toast>
                    </ToastContainer>
                </Col>
            </Row>
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

