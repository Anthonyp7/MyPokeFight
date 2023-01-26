import React, { useState } from "react";
import CardPokemon from "./Card";
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import '../styles/Liste.css';

export default function ResearchBar () {
    // const [searchValue, setSearchValue] = useState();
    // const [datas, setDatas] = useState([]);

    // const handleSearchChange = event => {
    //     setSearchValue(event.target.value);
    //     fetch(`https://pokeapi.co/api/v2/pokemon/${event.target.value}`)
    //     .then(response => response.json())
    //     .then(data => {
    //         setDatas(data)
            
    //         // mettre a jour l'etat avec les données récupérées
    //     })
    //     .catch(error => console.error(error));
    // }

    // const handleSearchSubmit = event => {
    //     event.preventDefault();
    //     // fetch(`https://pokeapi.co/api/v2/pokemon/${searchValue}`)
    //     // .then(response => response.json())
    //     // .then(data => {
    //     //     setDatas(data)
    //     //     console.log(data)
            
    //     //     // mettre a jour l'etat avec les données récupérées
    //     // })
    //     // .catch(error => console.error(error));
    // }

    // return (
    //     <form onSubmit={handleSearchSubmit}>
    //         <input type="text" value={searchValue} onChange={handleSearchChange} placeholder="Search for a Pokemon" />
    //         <button type="submit">Search</button>
            
    //         {console.log("datas test2", datas)}
            
    //         {datas && <div>{datas.name}
    //         {console.log(searchValue)}
    //         {console.log("datas test", datas)}

            

    //         {/* {searchValue === undefined ? null : */}
    //         <CardPokemon
    //         img={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${datas.id}.png`}
    //         img2={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${datas.id}.png`}
    //         isShiny={0}
    //         name={datas.name}
            
    //         pokeheight={datas.height / 10}
    //         pokeweight={datas.weight / 10}
    //         fight={false}
    //       />
    //       {/* } */}

            
    //         </div>}
    //     </form>
    // );


  const [searchTerm, setSearchTerm] = useState('');
  const [pokemon, setPokemon] = useState([]);

  async function handleSearch() {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);
    setPokemon(response.data);
  }

  return (
    <div>
      {/* <input
        type="text"
        placeholder="Entrer le nom ou l'id d'un Pokemon"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

    <button onClick={handleSearch}>Rechercher</button> */}



        <input class="c-checkbox" type="checkbox" id="checkbox"/>
        <div class="c-formContainer">
            <form class="c-form" action="">
                <input class="c-form__input" pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$" required type="text"
        placeholder="Entrer le nom ou l'id d'un Pokemon"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}/>
                <label class="c-form__buttonLabel" for="checkbox">
                <button class="c-form__button" type="button" onClick={handleSearch}>Rechercher</button>
                </label>
                <label class="c-form__toggle" for="checkbox" data-title="Rechercher un Pokémon"></label>
            </form>
        </div>


      
      {pokemon.name && (
        <div>

        {/* <CardPokemon
            img={pokemon.sprites.front_default}
            img2={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemon.id}.png`}
            isShiny={0}
            name={pokemon.name}
            text={"black"}
            pokeheight={pokemon.height / 10}
            pokeweight={pokemon.weight / 10}
            fight={false}
        /> */}

            <br></br>


            <Card  border="dark" style={{ width: '17rem', display: 'inline-block', marginRight: '0 px', marginLeft: "5%", marginBottom: '40px' }}>
                <Card.Img variant="top" src={pokemon.sprites.front_default} /><br></br>


                <Card.Title>{pokemon.name[0].toUpperCase() + pokemon.name.substring(1)}</Card.Title>
                <Card.Body>
                    <div>
                        <p className="card-text">Taille: {pokemon.height / 10} m <br></br>
                            Poids: {pokemon.weight / 10} kg</p>
                    </div>
                    <div className='progress-stats'>

                        {/* <img src='https://cdn-icons-png.flaticon.com/512/7037/7037210.png' alt='' /><br></br>
                        <ProgressBar animated variant='success' now={props.pokehp} label={`${props.pokehp}`} />

                        <br></br>

                        <img src='https://cdn-icons-png.flaticon.com/512/2746/2746914.png' alt='' /><br></br>
                        <ProgressBar animated variant='danger' now={props.pokeattack} label={`${props.pokeattack}`} />
                        <br></br>

                        <img src='https://cdn-icons-png.flaticon.com/512/7154/7154506.png' alt='' /><br></br>
                        <ProgressBar animated variant='info' now={props.pokespeed} label={`${props.pokespeed}`} /> */}
                    </div>
                    
                    
                    <br></br><br></br>
                </Card.Body>
            </Card>

          
        </div>
      )}
    </div>
  );
}

