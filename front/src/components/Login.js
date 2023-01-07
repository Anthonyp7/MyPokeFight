import React, { useState } from "react"
import axios from "axios"
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

    const [show, setShow] = useState(false);

    const [pokeAvatar, setPokeAvatar] = useState("");


    const handleSubmit = () => {
      console.log(username, password)

      const pokeimg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${(Math.floor(Math.random() * 905) + 1)}.png`;

      console.log("pokeImg", pokeimg);
      console.log("pokeAvatar", pokeAvatar);

      setPokeAvatar(pokeimg);
      console.log("pokeAvatar", pokeAvatar);

      axios.post('http://localhost:3080/login',
          {
              mode: 'no-cors',
              username: username,
              password: password,
              pokeavatar: pokeAvatar
          })
          .then(res => {
              console.log(res.data)

              if (!username || !password) {
                  alert('Missing');
              }

              // if (res.data.code === 500) {
              //     alert('User Not Found')
              // }
              // if (res.data.code === 404) {
              //     alert('Password is wrong')
              // }
              // if (res.data.code === 200) {
              //     // move to home
              //     navigate('/')
              //     localStorage.setItem('TOKEN', res.data.token)
              //     localStorage.setItem('EMAIL', res.data.email)
              // }
          }).catch(err => {
              console.log(err)
        })
        setShow(true);

        console.log("pokeAvatar", pokeAvatar);

        

    }

    const changeSigninForm = () => {
      setSignin(true);
    }

    const changeSignupForm = () => {
        setSignin(false);
    }

    const popover = (
        <Popover id="popover-basic">
          <Popover.Header as="h3">Poké Avatar</Popover.Header>
          <Popover.Body>
            <img src={pokeAvatar} alt=""/>
          </Popover.Body>
        </Popover>
    );
    

    return (
        <div className="body" style={{backgroundImage: "url(https://i.imgur.com/O7ZWigt.png)"}}>
        {/* <div className="test" style={{backgroundImage: "url(https://i.pinimg.com/originals/ba/e4/9c/bae49c28470b4d0878cf12528bbd540c.jpg)", backgroundSize: "75%"}}> */}

            

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
                            <Button variant="primary" className="btn-signup" onClick={handleSubmit} >Create</Button>
                        </OverlayTrigger>
                    </>
                    : 
                    <>
                        <Card.Title style={{ textAlign: "center" }}>SignIn</Card.Title>
                        <Card.Text>
                            Signin
                        </Card.Text>
                    </>
                    }
                    
                    </Card.Body>
                </Card>
            </div>
            <img style={{ position: "absolute", top: "150px", right: "600px" }} src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/384.gif"} alt="rayquaza" />
            <img style={{ position: "absolute", top: "400px", left: "350px" }} src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/250.gif"} alt="{pokemon}" />
            <img style={{ position: "absolute", top: "600px", right: "400px" }} src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/334.gif"} alt="{pokemon}" />
            <img style={{ width:"2%", position: "absolute", bottom: "153px", left: "-10px" }} src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/321.gif"} alt="{pokemon}" />
            <img style={{ position: "absolute", top: "650px", right: "800px" }} src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/567.gif"} alt="{pokemon}" />
            <img style={{ position: "absolute", top: "250px", right: "50px" }} src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/641.gif"} alt="{pokemon}" />

            {/* <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/641.gif"} alt="{pokemon}" /> */}

            <Alert show={show} variant="info" className="alert-login" onClick={() => setShow(false)} dismissible>
                Your Account is created !
            </Alert>
        </div>
    )
}

