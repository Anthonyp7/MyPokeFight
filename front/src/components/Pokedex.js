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
  const date = new Date();
  const time = date.getHours();
  
  const pokecoin = ls.getItem("Poké-Coin");
  const username = ls.getItem("Username");

  const [pokemons, setPokemons] = useState([]);

  const [ids, setIds] = useState([]);
  const [tab2, setTab2] = useState([]);
  const [i, setI] = useState(0);

  const [isNight, setIsNight] = useState(false);
  const [showError, setShowError] = useState(false);

  // INFO POKEMON CARD
  const [pokeName, setPokeName] = useState("");
  const [pokeHeight, setPokeHeight] = useState("");
  const [pokeWeight, setPokeWeight] = useState("");
  const [type, setType] = useState([]);


  // INFO STATS POKEMON CARD
  const [pokeHp, setPokeHp] = useState("");
  const [pokeAttack, setPokeAttack] = useState("");
  const [pokeSpeed, setPokeSpeed] = useState("");


  


  useEffect(() => {
    
    axios.post('http://localhost:3080/pokemons',
      {
        mode: 'no-cors',
        username: username,

      }


    ).then((result) => result.data)
      .then((data) => {
        setPokemons(data.pokemonid)

        ls.setItem("Poké-Coin", pokecoin)
        data.pokemonid.forEach(id => {
          GetPokemon(id)
        });

      })

    if(time > 19 || time < 7){
      setIsNight(true);
    }

  }, []);


  const GetRandomPokemon = () => {
    if (pokecoin > 1) {
      const rand = (Math.floor(Math.random() * 905) + 1);
      GetPokemon(rand)
        .then(() => TestPoke())
      
        

    }
    else {
      
      setShowError(true);
    }

    // RECHARGEMENT POUR POUVOIR PATCH LES STATS POUR LE FIGHT
    if (pokecoin === "1"){

      const rand = (Math.floor(Math.random() * 905) + 1);
      GetPokemon(rand)
        .then(() => TestPoke())

      // window.location.reload()

      setTimeout(()=> {
        window.location.reload()
      }, 500);
    }
    
  }

  const GetPokemon = async (id) => {


    await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then((result) => result.json())
      .then((data) => {


        // SET INFO
        setPokeAttack((current) => [...current, data.stats[1].base_stat]);

        setPokeHp((current) => [...current, data.stats[0].base_stat]);
        setPokeName((current) => [...current, data.name[0].toUpperCase() + data.name.substring(1)]);

        setPokeSpeed((current) => [...current, data.stats[5].base_stat]);
        setPokeHeight((current) => [...current, data.height]);
        setPokeWeight((current) => [...current, data.weight]);
        setType((current) => [...current, data.types.map(type => type.type.name + " ")]);

        setTab2(ids.unshift(data.id));


        // MODIFICATION STATS POKEMONS POUR LE FIGHT
        axios.patch('http://localhost:3080/pokestats',
          {
            username: username,
            pokeid: data.id,
            pokehp: data.stats[0].base_stat,
            pokeattack: data.stats[1].base_stat,
            pokespeed: data.stats[5].base_stat
          })

        })
      .catch((err) => console.log(err));

  }



  const TestPoke = () => {

    // CREATION POKEMON UTILISATEUR
    axios.post('http://localhost:3080/pokemon',
      {
        mode: 'no-cors',
        username: username,
        pokeid: ids[0],
      })
    
      

      setI(i+1);


    ls.setItem("Poké-Coin", pokecoin - 1);




    // AFFICHAGE POKEMON UTILISATEUR
    axios.post('http://localhost:3080/pokemons',
      {
        mode: 'no-cors',
        username: username,
      })
      .then(res => {
        setPokemons(res.data.pokemonid);

      })

    // MODIFICATION POKECOIN UTILISATEUR
    axios.patch('http://localhost:3080/login',
      {
        mode: 'no-cors',
        username: username,
        pokecoin: ls.getItem("Poké-Coin"),
        pokeid: ids[0]
      })

    ls.setItem("PokeId", JSON.stringify(ids));

  }



  return (
    <div>
      <h1 className="load-h1">Mon Pokedex</h1>



      <Button variant="primary" className='btn-poke-coin' onClick={GetRandomPokemon}>
        Nouveau Pokémon
        <Badge bg="secondary"> {pokecoin}</Badge>
      </Button>


      <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ids[0]}.png`} alt="" />

      <Row>
        <Col>
          <Toast onClose={() => setShowError(false)} show={showError} delay={7000} autohide>
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">MyPokéFight</strong>
              <small>Erreur</small>
            </Toast.Header>
            <Toast.Body>Désolé, vous n'avez plus de PokéCoin. Gagnez des combats pour en obtenir !</Toast.Body>
          </Toast>
        </Col>
      </Row>


      <br></br><br></br>


      <div className="row">
        <div className="column">
          {pokemons.map((pokemon, index) => (

            <>

              <CardPokemon
                img={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon}.png`}
                img2={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemon}.png`}
                id={pokemon}
                name={pokeName[index]}
                type={type[index]}
                pokehp={pokeHp[index]}
                pokeattack={pokeAttack[index]}
                pokespeed={pokeSpeed[index]}
                pokeheight={pokeHeight[index] / 10}
                pokeweight={pokeWeight[index] / 10}
                fight={false}
                text={"white"}
                night={isNight}
              />

            </>
            

          ))}
        </div>
      </div>


    </div>
  );

}