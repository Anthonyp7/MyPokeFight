import React, { useState } from "react"
import axios from "axios"
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
// import { Link, useNavigate } from 'react-router-dom'


export default function Login() {
    // const navigate = useNavigate()
    const [username, setUsername] = useState("Username")
    const [password, setPassword] = useState("Password")

    const [signin, setSignin] = useState(false);

    const handleSubmit = () => {
      alert("User Created!");
      console.log(username, password)

      axios.post('http://localhost:3080/login',
          {
              mode: 'no-cors',
              username: username,
              password: password
          })
          .then(res => {
              console.log(res.data)

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
        
        return (
          <>
            <Alert variant="info">
              This is a  alert—check it out!
            </Alert>
          </>
        )

    }

    const changeSigninForm = () => {
      // if (signin === true)
      // {
      //   setSignin(false);
      // }
      // else{
      //   setSignin(true);
      // }
      setSignin(true);
      
    }

    const changeSignupForm = () => {
        // if (signin === true)
        // {
        //   setSignin(false);
        // }
        // else{
        //   setSignin(true);
        // }
        setSignin(false);
        
      }

    return (
    <>
        <h1>Register</h1>
        <div className="outcard">

            {/* <Link style={{ textAlign: 'center', display: 'block', marginTop: '5px' }}
                to={'/signup'}> SIGN UP </Link>
            <Link style={{ textAlign: 'center', display: 'block', marginTop: '5px' }}
                to={'/forget-pass'}> Forget Password </Link> */}

          <Card style={{ width: '30rem' }}>
            <Card.Header>
              <Nav variant="pills" defaultActiveKey="#first">
                <Nav.Item>
                  <Nav.Link href="#signup" onClick={changeSignupForm}>SignUp</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="#signin" onClick={changeSigninForm}>SignIn</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="#disabled" disabled>
                    Disabled
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Body>

              {signin === false ? 
              <>
                <Card.Title>SignUp</Card.Title> <br></br>
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
              </>
              : 
              <>
                <Card.Title>SignIn</Card.Title>
                <Card.Text>
                    Signin
                    
                </Card.Text>
              </>
              }
              <br></br>
              <Button variant="primary" onClick={handleSubmit} >Submit</Button>
            </Card.Body>
          </Card>
                
            
        </div>
    </>
    )
}

