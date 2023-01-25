import { useState } from "react";
import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link, useNavigate } from "react-router-dom";
import '../styles/Mega.css';


export default function MegaPoke(props) {

    const ls = localStorage;

    const [audio, setAudio] = useState(new Audio('../../public//megaEvolution.mp3'));

    const [canMegaPokemons, setCanMegaPokemons] = useState(["3","6","9","15","18","65","80","94","115","127","130","142","150","181","208","212","214","229","248","254","257","260"]);
    const [megaPokemons, setMegaPokemons] = useState(["10033","10034","10036","10036","10037","10037","10037","10038","10034","10034","10034","10034","10034","10034","10034","10046","10034","10034","10034","10034","10050","10034"]);


    // TROUVER L'INDEX OU LA PREMIERE VALEUR = ID DU POKEMON
    const isLargeNumber = (element) => element == props.id;
    
    // audio.load();
    audio.play();

    return (
      <Modal
      {...props}
      fullscreen={true}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      
      
    >
      {/* <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header> */}
      <Modal.Body style={{backgroundImage: "url(https://cdn.wallpapersafari.com/95/72/eKFOgU.jpg)", backgroundSize: "cover"}}>
      <h1>Mega Evolution</h1>
      <div class="orb"></div>



        <img className="pokemon1" style={{width:"15%", marginLeft:"42%", position:"absolute", top:"35%"}} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${canMegaPokemons[canMegaPokemons.findIndex(isLargeNumber) ]}.png`} alt=""/>
        <img className="pokemon2" style={{width:"15%", marginLeft:"42%", position:"absolute", top:"35%"}} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${megaPokemons[canMegaPokemons.findIndex(isLargeNumber) ]}.png`} alt=""/>
         {/* canMegaPokemons[(megaPokemons).indexOf(`${ls.getItem("PokeId").includes("212")}`)] */}
         
        <audio>
          <source src="../../public//megaEvolution.mp3"></source>
        </audio>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => {
          props.onHide();
          // navigate('/pokedex');
          window.location.reload()
          
          }}>Close</Button>
      </Modal.Footer>
    </Modal>
    )
    console.log("ok")

  



}