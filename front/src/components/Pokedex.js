import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import '../styles/Pokedex.css';
import CardPokemon from './Card';


export default function Pokedex() {

  const ls = localStorage;
  const pokecoin = ls.getItem("Poké-Coin");
  const username = ls.getItem("Username");

  const rand = (Math.floor(Math.random() * 905) + 1);
  const [pokemons, setPokemons] = useState([]);

  const [id, setId] = useState([]);
  const [tab2, setTab2] = useState([]);

  const [showError, setShowError] = useState(false);

  // INFO POKEMON Card
  const [pokeCard, setPokeCard] = useState("");

  const [pokeCardHeight, setPokeCardHeight] = useState("");
  const [pokeCardWeight, setPokeCardWeight] = useState("");


  // INFO STATS POKEMON Card
  const [pokeCardHp, setPokeCardHp] = useState("");
  const [pokeCardAttack, setPokeCardAttack] = useState("");
  const [pokeCardSpeed, setPokeCardSpeed] = useState("");



  const GetPokemon = () => {
    if (pokecoin > 0) {


      fetch(`https://pokeapi.co/api/v2/pokemon/${rand}/`)
        .then((result) => result.json())
        .then((data) => {
          console.log("data.result", data)


          setTab2(id.unshift(data.id));//

          TestPoke();
        })
        .catch((err) => console.log(err));
    }

    else {
      setShowError(true);
    }
  }


  const TestPoke = () => {

    // CREATION POKEMON UTILISATEUR
    axios.post('http://localhost:3080/pokemon',
      {
        mode: 'no-cors',
        username: username,
        pokeid: id[0]
      })


    ls.setItem("Poké-Coin", pokecoin - 1);



    // MODIFICATION POKECOIN UTILISATEUR
    axios.patch('http://localhost:3080/login',
      {
        mode: 'no-cors',
        username: username,
        pokecoin: ls.getItem("Poké-Coin")
      })

    // AFFICHAGE POKEMON UTILISATEUR
    axios.post('http://localhost:3080/pokemons',
      {
        mode: 'no-cors',
        username: username,
      })
      .then(res => {
        setPokemons(res.data.pokemonid);

      })

    console.log(pokemons);
  }



  return (
    <div>
      <h1 className="load-h1">Mon Pokedex</h1>


      <Button variant="primary" className='btn-poke-coin' onClick={GetPokemon}>
        Nouveau Pokémon
        {/* <img className='poke-coin' src='https://cdn-icons-png.flaticon.com/512/871/871383.png'/> */}
        <Badge bg="secondary">{pokecoin}</Badge>
      </Button>


      <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id[0]}.png`} alt="" />

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


      <br></br><br></br>





      {/* <ul>
          <li>
            <div className="row">
              <div className="column">
                <div className="card">
                  {pokemon.map((ad, index) => (
                    <tr key={"index-" + index}>
                      <br></br>

                      <br></br>
                      <td>
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ad}.png`} />
                      </td>
                    </tr>
                  ))}
                </div>
              </div>
            </div>
          </li>
        </ul> */}


      <div className="row">
        <div className="column">
          <div className="card">
            {pokemons.map((pokemon, index) => (
              <>
                <ul>
                  <CardPokemon
                    img={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon}.png`}
                  // name={pokeCard}
                  // stathp={pokeCardHp}
                  // statattack={pokeCardAttack}
                  // statspeed={pokeCardSpeed}
                  // height={pokeCardHeight / 10}
                  // weight={pokeCardWeight / 10}
                  />

                  {/* <tr key={"index-" + index}>
                    <br></br>

                    <br></br>
                    <td>
                      <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ad}.png`} />
                    </td>
                  </tr> */}
                </ul>
              </>

            ))}
          </div>
        </div>
      </div>





      {/* <ul>
          <li>
            <div className="row">
              <div className="column">
                <div className="card">
                  {pokemon.map((ad, index) => (
                    <tr key={"index-" + index}>
                      <br></br>
                      Attack:<b>{ad.stats[1].base_stat}</b>
                      Hp: <b>{ad.stats[0].base_stat}</b>
                      Order: <b>{ad.order}</b>
                      Defense: <b>{ad.stats[2].base_stat}</b>
                      <br></br>
                      ID: <td>{ad.id}</td>
                      NAME<td>{ad.name}</td>
                      type:<td>{ad.types[0].type.name}</td>
                      <td>
                        <img src={ad.sprites.front_default} />
                      </td>
                      <button id={ad.id} onClick={() => Test(ad.id)}>
                        Add To pokedex
                      </button>
                    </tr>
                  ))}
                </div>
              </div>
            </div>
          </li>
        </ul> */}


    </div>
  );

}