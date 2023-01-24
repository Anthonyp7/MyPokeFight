import { useState } from "react";
import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export default function Mega(props) {

    // const ls = localStorage;

    // const [canMegaPokemons, setCanMegaPokemons] = useState(["3","6","9","15","18","65","80","94","115","127","130","142","150","181","208","212","214","229","248","254","257","260"]);
    // const [megaPokemons, setMegaPokemons] = useState(["10033","10034","10036","10036","10037","10036","10037","10038","10034","10034","10034","10034","10034","10034","10034","10046","10034","10034","10034","10034","10050","10034"]);


    // const [test, setTest] = useState(megaPokemons.indexOf(ls.getItem("PokeId").includes("212")));
    // return (
    //     <>
    //         <h1>Mega</h1>

    //         <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${megaPokemons[(canMegaPokemons).indexOf(`212`)]}.png`} alt=""/>
    //         {/* canMegaPokemons[(megaPokemons).indexOf(`${ls.getItem("PokeId").includes("212")}`)] */}

    //     </>
    // )


    // const [fullscreen, setFullscreen] = useState(true);
    // const [show, setShow] = useState(false);

    // function handleShow(breakpoint) {
    //     setFullscreen(breakpoint);
    //     setShow(true);
    // }

    // return (
    //     <Modal {...props} show={props.show} fullscreen={fullscreen} onHide={() => setShow(false)}>
    //     <Modal.Header closeButton>
    //       <Modal.Title>Modal</Modal.Title>
    //     </Modal.Header>
    //     <Modal.Body>Modal body content
    //     <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/257.png" alt=""/></Modal.Body>
    //   </Modal>
    // )

    return(
      <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable="true"

    >

      <div>


        <Modal.Header closeButton >
          <Modal.Title id="contained-modal-title-vcenter">

          </Modal.Title>
        </Modal.Header>
        <Modal.Body >

          <div className="card mb-3" >
            <div className="row g-0">
              <div className="col-md-8">
                <div className="card-body">
                  <h2 className="card-title">t</h2>
                  <p className="card-text">Taille:  m <br></br>
                    Poids:  kg</p>
                  <br></br>

                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>

        </Modal.Footer>
      </div>
    </Modal>
    )



}