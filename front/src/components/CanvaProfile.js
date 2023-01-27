import React, { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';

export default function CanvaProfile(props) {
    const ls = localStorage;

    const test = JSON.stringify(ls.getItem("PokeId"));
    // REMPLACEMENT DES CROCHETS
    const test2 = test.replace(/[\[\]]/g, "");
    // REMPLACEMENT DES GUILLEMETS
    const lspokemon = test2.replace(/["]/g, "").split(",");

  return (
    <>
      <Offcanvas show={props.show} scroll="true" {...props}>
        <Offcanvas.Header closeButton >
          <Offcanvas.Title as="h1"><img src={ls.getItem("Poké-Avatar")} alt=""/>{ls.getItem("Username")}</Offcanvas.Title>
        </Offcanvas.Header>
        <hr></hr>
        <Offcanvas.Body as='h5'>

          Vos Pokémons : <br></br><br></br>
            {lspokemon.reverse().map((pokemon, index) => (
                <>
                    <img key={index} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon}.png`} alt="" width="25%"/>
                </>
            ))}
            
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}