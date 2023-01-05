import React, { useState } from "react";

export default function SignUp() {
    const [username, setUsername] = useState("Username");
    const [password, setPassword] = useState("Password");

    fetch("http://localhost:3080/login", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })

    return (
        <>
        <h1>Sign Up</h1>
        <input type="text" class="form-control" id="floatingInput" placeholder={username}/>
        <input type="password" class="form-control" id="floatingInput" placeholder={password}/>
            <input type="button" value="Random Number!"/>
        </>
    )
}