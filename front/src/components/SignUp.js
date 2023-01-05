import React, { useState } from "react";

export default function SignUp() {
    const [username, setUsername] = useState("Username");
    const [password, setPassword] = useState("Password");

    const handleSubmit = async () => {
      console.log(username, password);
  
      fetch("http://localhost:3080/login", {
        mode: 'no-cors',
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
      // .then((data) => {
      //   if (data.msg === undefined) {
      //     alert(data.error);
      //     setUsername("");
      //     setPassword("");
      //   }
      //   if (data.msg !== undefined) {
      //     alert(data.msg);
      //     setUsername("");
      //     setPassword("");
      //   }
      // })
        .catch((err) => console.log(err));
    }

    return (
        <>
        <h1>Sign Up</h1>
        <input type="text" onChange={(e) => {setUsername(e.target.value)}} placeholder={username}/>
        <input type="password" onChange={(e) => {setPassword(e.target.value)}} placeholder={password}/>
            <input type="button" value="Random Number!" onClick={handleSubmit}/>
        </>
    )
}