import { useState, useEffect} from "react";
import '../styles/Liste.css';
import '../styles/PokemonColors.css';

export default function ListePokemon(){
    const [pokemons, setPokemons] = useState([]);
    const [url, setUrl] = useState({
    current: "https://pokeapi.co/api/v2/pokemon/",
    next: null,
    previous: null,
  });
  const [image, setImage] = useState([]);
  const [image2, setImage2] = useState([]);
  const [loading, setLoading] = useState(true);

  const [type, setType] = useState([]);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  



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
        // console.log(data);
        setLoading(false);//
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
        //data.sprites.other['official-artwork'].front_default
        //data.sprites.versions['generation-v']['black-white'].animated.front_default
        setImage2((current) => [...current, data.sprites.front_shiny]);
        setHeight((current) => [...current, data.height]);
        setWeight((current) => [...current, data.weight]);
        setType((current) => [...current, data.types.map(type => type.type.name + " ")]);
      })
      .catch((err) => console.error(err))
    ))
  }, [pokemons]);


  // const changePokeball = () => {
  //   pokeimg.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/net-ball.png";
  // }
  // var pokeimg = document.getElementById("pokedex-button");

  //   pokeimg.addEventListener('click', function(){
  //     changePokeball();
  // });



  return (
    <div>
      <br></br>
      {loading ? <div class="spinner-border" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div> : <h1 className="load-h1">Liste Pokémon</h1>}
      <br></br>
      <ul>
      
        {pokemons.map((pokemon, index) => (
          <div class={type[index]} id="test">

            <div class="card-body">
              <h5 class="card-title" key={index}>{index+1} • {pokemon.name[0].toUpperCase() + pokemon.name.substring(1)}</h5>

              <div class="image">
                <img className="img-poke" src={image[index]} alt="{pokemon}" />
              </div>
              <div class="image-hover">
                <img className="img-poke" src={image2[index]} alt="{pokemon}" />
              </div>

                  {/* INFO POKEMON */}
                  
                    <div  className="type-li" >
                      <ul class={type[index]}>
                        <li class="list-group-item">{type[index]}</li>
                      </ul>
                    </div>

                    <ul class="">
                      <li class="list-group-item">Height : {height[index]} cm</li>
                      <li class="list-group-item">Weight : {weight[index]} kg</li>
                    </ul>

                    {/* <a type="button" class="btn btn-outline-light" id="pokedex-button"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/timer-ball.png"></img>Add To pokédex</a> */}
                    
                    {/* eslint-disable-next-line */}
                    <a type="button" id="pokedex-button"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/timer-ball.png" alt="PokeBall"></img></a>
                    
              </div>
          </div>
          

      
          
        ))}

      </ul>
      {url.previous && <button class="btn btn-outline-dark" onClick={previous}>Previous</button>}
      {url.next && <button class="btn btn-outline-dark" onClick={next}>Next</button>}

      <br/>
      <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/25.gif"} alt="{pokemon}" />
    </div>
  );
}
