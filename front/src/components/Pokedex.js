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

  const [antho, setAntho] = useState("");

  const rand = (Math.floor(Math.random() * 905) + 1);
  const [pokemons, setPokemons] = useState([]);
  const [isShiny, setIsShiny] = useState(Math.floor(Math.random() * 10) + 1);

  const [id, setId] = useState([]);
  const [tab2, setTab2] = useState([]);

  const [test, setTest] = useState([]);
  const [datas, setDatas] = useState([]);


  const [showError, setShowError] = useState(false);

  // INFO POKEMON Card
  const [pokeName, setPokeName] = useState("");

  const [pokeHeight, setPokeHeight] = useState("");
  const [pokeWeight, setPokeWeight] = useState("");


  // INFO STATS POKEMON Card
  const [pokeHp, setPokeHp] = useState("");
  const [pokeAttack, setPokeAttack] = useState("");
  const [pokeSpeed, setPokeSpeed] = useState("");



  const GetPokemon = () => {
    if (pokecoin > 0) {

      // async function pokedata(){
        
        fetch(`https://pokeapi.co/api/v2/pokemon/${rand}/`)
          .then((result) => result.json())
          .then((data) => {
            // console.log("data.result", data.height)
            setDatas(data);
            setIsShiny(Math.floor(Math.random() * 10) + 1)
            

            // SET INFO
            setPokeAttack((current) => [...current, data.stats[1].base_stat]);
            // setPokeHp(data.stats[0].base_stat);
            setPokeHp((current) => [...current, data.stats[0].base_stat]);
            setPokeName((current) => [...current, data.name[0].toUpperCase() + data.name.substring(1)]);

            setPokeSpeed((current) => [...current, data.stats[5].base_stat]);
            setPokeHeight((current) => [...current, data.height]);
            setPokeWeight((current) => [...current, data.weight]);

            // console.log("pokemonheight", data.height)
            // console.log("pokemonattt", pokeAttack)

            // console.log("data.name", data.name)

            setTab2(id.unshift(data.id));//

            TestPoke();
          })
          .catch((err) => console.log(err));
      // }
        
    }

    else {
      setShowError(true);
    }
  }

  console.log("isShiny", isShiny);


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
        // setPokemons(datas);
        // setPokemons(pokemons.unshift(res.data.pokemonid, datas));
        console.log("pokemons", pokemons);
        ls.setItem("Pokemons", pokemons);




      })

    // console.log(data);
  }



  return (
    <div>
      <h1 className="load-h1">Mon Pokedex</h1>


      
      <Button variant="primary" className='btn-poke-coin' onClick={GetPokemon}>
        Nouveau Pokémon 
        {/* <img className='poke-coin' src='https://cdn-icons-png.flaticon.com/512/871/871383.png'/> */}
        <Badge bg="secondary"> {pokecoin}</Badge>
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
    

      <div className="row">
        <div className="column">
            {pokemons.map((pokemon, index) => (
              
              
                <CardPokemon
                  img={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon}.png`}
                  img2={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemon}.png`}
                  isShiny={isShiny}
                  name={pokeName[index]}
                  pokehp={pokeHp[index]}
                  pokeattack={pokeAttack[index]}
                  pokespeed={pokeSpeed[index]}
                  pokeheight={pokeHeight[index] / 10}
                  pokeweight={pokeWeight[index] / 10}
                />


                // <CardPokemon
                //   img={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon}.png`}
                //   name={pokeName[index]}
                //   pokehp={pokeHp[index]}
                //   pokeattack={pokeAttack[index]}
                //   pokespeed={pokeSpeed[index]}
                //   pokeheight={pokeHeight[index] / 10}
                //   pokeweight={pokeWeight[index] / 10}
                // />

          

            ))}
        </div>
      </div>


    </div>
  );

}