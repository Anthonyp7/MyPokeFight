import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import '../styles/Pokedex.css';


export default function Pokedex() {

  const ls = localStorage;
  const pokecoin = ls.getItem("Poké-Coin");
  const username = ls.getItem("Username");
  const [pokemon, setPokemon] = useState([`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${(Math.floor(Math.random() * 905) + 1)}.png`]);

  // eslint-disable-next-line
  const [tab, setTab] = useState([]);
  const [i, setI] = useState(0);

  const [showError, setShowError] = useState(false);



  const GetPokemon = () => {
    if (pokecoin > 0) {

      axios.post('http://localhost:3080/pokemon',
      {
        username: username,
        url: pokemon[i]
      })
      
      setI(i+1);
      setTab(pokemon.push(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${(Math.floor(Math.random() * 905) + 1)}.png`));
      ls.setItem("Poké-Coin", pokecoin-1);

      axios.patch('http://localhost:3080/login',
      {
        username: username,
        pokecoin: ls.getItem("Poké-Coin")
      })
    }

    else{
      setPokemon(``);
      setShowError(true);
    }
  }
  

  return (
    <div>
      <h1 className="load-h1">Mon Pokedex</h1>
      

      <Button variant="primary" className='btn-poke-coin' onClick={GetPokemon}>
        Nouveau Pokémon 
        {/* <img className='poke-coin' src='https://cdn-icons-png.flaticon.com/512/871/871383.png'/> */}
        <Badge bg="secondary">{pokecoin}</Badge>
      </Button>

      <img src={pokemon[i-1]} alt=""/>

      <Row>
      <Col xs={6}>
          <Toast onClose={() => setShowError(false)} show={showError} delay={7000} autohide>
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">MyPokéFight</strong>
              <small>11 mins ago</small>
            </Toast.Header>
            <Toast.Body>Désolé, vous n'avez plus de PokéCoin. Gagnez des combats pour en obtenir !</Toast.Body>
          </Toast>
      </Col>
    </Row>
      




    </div>
  );

}