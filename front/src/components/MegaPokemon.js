import { useState } from "react";
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import '../styles/Mega.css';


export default function MegaPoke(props) {

    const ls = localStorage;

    const [audio, setAudio] = useState(new Audio('../../public//megaEvolution.mp3'));

    const [canMegaPokemons, setCanMegaPokemons] = useState(["3","6","9","15","18","65","80","94","115","127","130","142","150","181","208","212","214","229","248","254","257","260", "282", 
    "302", "303", "306", "308", "310", "319", "323", "334", "354", "359", "362", "373", "376", "380", "381", "384", "428", "445", "448", "460", "475", "531", "719"]);
    const [megaPokemons, setMegaPokemons] = useState(["10033","10034","10036","10090","10073","10037","10071","10038","10039","10040","10041","10042","10044","10045","10072","10046","10047","10048","10049","10065","10050","10064", "10051", 
    "10066", "10052", "10053", "10054", "10055", "10070", "10087", "10067", "10056", "10057", "10074", "10089", "10076", "10062", "10063", "10079", "10088", "10058", "10059", "10060", "10068", "10069", "10075"]);


    // TROUVER L'INDEX OU LA PREMIERE VALEUR = ID DU POKEMON
    const isLargeNumber = (element) => element === props.id;
    
    // audio.load();
    // audio.play();

    

    return (
      <Modal
        {...props}
        fullscreen={true}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >

      

      
      <Modal.Body style={{backgroundImage: "url(https://cdn.wallpapersafari.com/95/72/eKFOgU.jpg)", backgroundSize: "cover"}}>
        <h1>Mega Evolution</h1>
        <div class="orb"></div>


        
        <img className="pokemon1" style={{width:"15%", marginLeft:"42%", position:"absolute", top:"35%"}} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${canMegaPokemons[canMegaPokemons.findIndex(isLargeNumber) ]}.png`} alt=""/>
        <img className="pokemon2" style={{width:"15%", marginLeft:"42%", position:"absolute", top:"35%"}} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${megaPokemons[canMegaPokemons.findIndex(isLargeNumber) ]}.png`} alt=""/>
        
        {props.night === true && props.id === "6" ?
            <>
                <img className="pokemon2" style={{width:"15%", marginLeft:"42%", position:"absolute", top:"35%"}} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${megaPokemons[canMegaPokemons.findIndex(isLargeNumber) ]}.png`} alt=""/>
            </>
            :
            <>
                <img className="pokemon2" style={{width:"15%", marginLeft:"42%", position:"absolute", top:"35%"}} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10035.png`} alt=""/>
            </>}
        
        <audio>
          <source src="../../public//megaEvolution.mp3"></source>
        </audio>
      </Modal.Body>

      
    </Modal>
    
    )

  



}