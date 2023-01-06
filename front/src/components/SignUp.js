// import { useState } from "react";

// export default function SignUp() {
//   const [username, setUsername] = useState("Username");
//   const [password, setPassword] = useState("Password");

//   const handleSubmit = async () => {
//     console.log(username, password);


//     fetch("http://localhost:3080/login",
//      {
//       mode: 'no-cors',
//       method: "POST",
//       body: JSON.stringify({
//         username: username,
//         password: password,
//       })
//     })
//     .then((res) => res.json())
//     .catch((err) => console.log(err));
//   };

//   return (
//       <>
//       <h1>Sign Up</h1>
//       <input type="text" onChange={(e) => {setUsername(e.target.value)}} placeholder={username}/>
//       <input type="password" onChange={(e) => {setPassword(e.target.value)}} placeholder={password}/>
//           <input type="button" value="Random Number!" onClick={handleSubmit}/>
//       </>
//   )
// }



import React, { useState } from "react"
import axios from "axios"
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
// import { Link, useNavigate } from 'react-router-dom'


function SignUp() {
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

    const changeForm = () => {
      // if (signin === true)
      // {
      //   setSignin(false);
      // }
      // else{
      //   setSignin(true);
      // }
      setSignin(true);
      
    }

    return (
    <>
        <h1>Sign Up</h1>
        <div className="outcard">

            {/* <Link style={{ textAlign: 'center', display: 'block', marginTop: '5px' }}
                to={'/signup'}> SIGN UP </Link>
            <Link style={{ textAlign: 'center', display: 'block', marginTop: '5px' }}
                to={'/forget-pass'}> Forget Password </Link> */}

          <Card style={{ width: '30rem' }}>
            <Card.Header>
              <Nav variant="pills" defaultActiveKey="#first">
                <Nav.Item>
                  <Nav.Link href="#signup" >SignUp</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="#signin" onClick={changeForm}>SignIn</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="#disabled" disabled>
                    Disabled
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Body>
              <Card.Title>Special title treatment</Card.Title>
                {console.log(signin)}
              {signin === false ? <Card.Text>
                Signup
                Username
                <input onChange={(e) => { setUsername(e.target.value) }} value={username} className="inputs" type="text"  placeholder={username}/> <br /> <br />
                Password
                <input onChange={(e) => { setPassword(e.target.value) }} value={password} className="inputs" type="password" placeholder={password}/> <br /> <br />
              </Card.Text> : <Card.Text>
                Signin
                
              </Card.Text>
              
              }
              
              {/* <Card.Text>
                Username
                <input onChange={(e) => { setUsername(e.target.value) }} value={username} className="inputs" type="text"  placeholder={username}/> <br /> <br />
                Password
                <input onChange={(e) => { setPassword(e.target.value) }} value={password} className="inputs" type="password" placeholder={password}/> <br /> <br />
              </Card.Text> */}
              <Button variant="primary" onClick={handleSubmit} >Submit</Button>
            </Card.Body>
          </Card>
                
            
        </div>
    </>
    )
}


export default SignUp