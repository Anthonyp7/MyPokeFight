import React, { useState, useEffect } from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';


export default function Pokedex() {

  const ls = localStorage;
  const pokecoin = ls.getItem("Poké-Coin");
  const [pokemon, setPokemon] = useState("");
  const [showError, setShowError] = useState(false);

  const RandPokemon = () => {
    if (pokecoin > 0) {
      setPokemon(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${(Math.floor(Math.random() * 905) + 1)}.png`);
      ls.setItem("Poké-Coin", pokecoin-1);
    }
    else{
      setPokemon(``);
      setShowError(true);
    }
  }
  

  return (
    <div>
      <h1 className="load-h1">Mon Pokedex</h1>
      

      <Button variant="primary" onClick={RandPokemon}>
        Nouveau Pokémon <Badge bg="secondary">{pokecoin}</Badge>
      </Button>

      <img src={pokemon} alt=""/>

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