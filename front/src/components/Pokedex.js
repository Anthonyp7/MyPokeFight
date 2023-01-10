import React, { useState, useEffect } from 'react';
// import { useNavigate } from "react-router-dom";

export default function Pokedex() {
  // const ls =localStorage
  // const navigate = useNavigate();

  // const token = ls.getItem("Token")
  // if (token === null){
  //   navigate('/login')
  // }

//   useEffect(() => {
//     const token = ls.getItem('Token')
//     if (!token) {
//         navigate('/login')
//     }
// }, [])

  return (
    <div>
      <h1 className="load-h1">Mon Pokedex</h1>

      <p></p>


      <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
      <input type="button" value="Random Number!" />




    </div>
  );

}