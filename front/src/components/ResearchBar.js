import React, { useState, useEffect } from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import '../styles/Liste.css';

export default function ResearchBar () {

  const [searchTerm, setSearchTerm] = useState('');
  const [pokemon, setPokemon] = useState([]);

  async function handleSearch() {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);
    setPokemon(response.data);
  }

  useEffect(() => {
    async function fetchData() {
        if(searchTerm !==''){
          const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);
          setPokemon(response.data);
        }
    }
    fetchData();
  }, [searchTerm]);

  return (
    <div>

      <input class="c-checkbox" type="checkbox" id="checkbox"/>
      <div class="c-formContainer">
          <form class="c-form" action="">
              <input class="c-form__input" pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$" required type="text" placeholder="Entrer le nom ou l'id d'un Pokemon" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}/>
              <label class="c-form__buttonLabel" for="checkbox">
                <button class="c-form__button" type="button" onClick={handleSearch}>Rechercher</button>
              </label>
              <label class="c-form__toggle" for="checkbox" data-title="Rechercher"></label>
          </form>
    </div>


      
      {pokemon.name && (
        <div>
            <br></br>
            
            <Card className={pokemon.types[0].type.name} border="dark" text="white" style={{ width: '17rem', display: 'inline-block', marginRight: '0 px', marginLeft: "5%", marginBottom: '40px' }}>
              {pokemon.sprites.front_default === null ?
              <>
                <Card.Img variant="top" src={pokemon.sprites.other["official-artwork"].front_default} /><br></br>
                </>
                :
                <>
                <Card.Img variant="top" src={pokemon.sprites.front_default} /><br></br>
                </>
                
              }


                <Card.Title>{pokemon.name[0].toUpperCase() + pokemon.name.substring(1)}</Card.Title>
                <Card.Body>
                    <div>
                        <p className="card-text">Taille: {pokemon.height / 10} m <br></br>
                            Poids: {pokemon.weight / 10} kg</p>
                    </div>
                    <div className='progress-stats'>

                        <img src='https://cdn-icons-png.flaticon.com/512/7037/7037210.png' alt='' /><br></br>
                        <ProgressBar animated variant='success' now={pokemon.stats[0].base_stat} label={`${pokemon.stats[0].base_stat}`} />

                        <br></br>

                        <img src='https://cdn-icons-png.flaticon.com/512/2746/2746914.png' alt='' /><br></br>
                        <ProgressBar animated variant='danger' now={pokemon.stats[1].base_stat} label={`${pokemon.stats[1].base_stat}`} />
                        <br></br>

                        <img src='https://cdn-icons-png.flaticon.com/512/7154/7154506.png' alt='' /><br></br>
                        <ProgressBar animated variant='info' now={pokemon.stats[5].base_stat} label={`${pokemon.stats[5].base_stat}`} />
                    </div>
                    
                    
                    <br></br><br></br>
                </Card.Body>
            </Card>

          
        </div>
      )}
    </div>
  );
}

