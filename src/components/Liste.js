import { useState, useEffect } from "react";
import '../styles/Liste.css';

export default function ListePokemon(){
    const [pokemons, setPokemons] = useState([]);
    const [url, setUrl] = useState({
    current: "https://pokeapi.co/api/v2/pokemon/",
    next: null,
    previous: null,
  });
  const [image, setImage] = useState([]);
  const [image2, setImage2] = useState([]);
  // const [type, setType] = useState([]);



  //PAGE SUIVANTE
  const next = () => {
    const newUrl = {
      current: url.next,
      previous: url.current,
      next: null,
    };
    setUrl(newUrl);
  };

  //PAGE PRECEDENTE
  const previous = () => {
    const newUrl = {
      current: url.previous,
      next: url.current,
      previous: null,
    };
    setUrl(newUrl);
  };


  useEffect(() => {
    fetch(url.current)
      .then((res) => res.json())
      .then((data) => {
        setPokemons(data.results);
        setUrl({
          current: url.current,
          next: data.next,
          previous: data.previous,
        });
        console.log(data);
      })
      .catch((err) => console.log(err));
    //eslint-disable-next-line
  }, [url.current]);
  
  useEffect(() => {
    pokemons.map((pokemon) => (
        fetch(pokemon.url)
      .then((res) => res.json())
      .then((data) => {
        setImage((current) => [...current, data.sprites.front_default]);
        setImage2((current) => [...current, data.sprites.front_shiny]);
      })
      // .then((data) => setImage((next) => [...next, data.sprites.front_default]))
      .catch((err) => console.error(err))
    ))
  }, [pokemons]);

  


  // useEffect(() => {
  //   pokemons.map((pokemon) => (
  //       fetch(pokemon.url)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setType((current) => [...current, data.types.type.name]);
  //     })
  //     .catch((err) => console.error(err))
  //   ))
  // }, [pokemons]);
  


  return (
    <div>
      <br></br>
      <ul>
      
        {pokemons.map((pokemon, index) => (
            
          <div class="card text-bg-dark mb-3" id="test">
              <div class="card-body">
                  <h5 class="card-title" key={index}>{index+1} • {pokemon.name[0].toUpperCase() + pokemon.name.substring(1)}</h5>
                  <div class="image">
                    <img className="img-poke" src={image[index]} alt="{pokemon}" />
                  </div>
                  <div class="image-hover">
                    <img className="img-poke" src={image2[index]} alt="{pokemon}" />
                  </div>
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  
                  
              </div>
              {/* {console.log(pokemon.types[25].type.name)} */}
          </div>

      
          
        ))}

      </ul>
      {url.previous && <button class="btn btn-outline-dark" onClick={previous}>Previous</button>}
      {url.next && <button class="btn btn-outline-dark" onClick={next}>Next</button>}

      <br/>
      <img src={image2[25]} alt="{pokemon}" />
    </div>
  );
}
