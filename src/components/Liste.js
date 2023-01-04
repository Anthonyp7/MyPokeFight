import { useState, useEffect} from "react";
import '../styles/Liste.css';
import '../styles/PokemonColors.css';
import ModalTest from "./Modal";
import React from 'react';
import Button from 'react-bootstrap/Button';


export default function ListePokemon(){
    const [pokemons, setPokemons] = useState([]);
    const [url, setUrl] = useState({
    current: "https://pokeapi.co/api/v2/pokemon/",
    next: null,
    previous: null,
  });
  const [image, setImage] = useState([]);
  const [image2, setImage2] = useState([]);
  const [imageani, setImageAni] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalShow, setModalShow] = React.useState(false);

  const [type, setType] = useState([]);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [statsHp, setStatsHp] = useState([]);
  const [statsAttack, setStatsAttack] = useState([]);
  const [statsSpeed, setStatsSpeed] = useState([]);

  const [stat, setStat] = useState([]);

  let {hp, attack, defense} = "";

  const [pokeModal, setPokeModal] = useState("");
  const [pokeModalImg, setPokeModalImg] = useState("");
  const [pokeModalHeight, setPokeModalHeight] = useState("");
  const [pokeModalWeight, setPokeModalWeight] = useState("");
  

    
  async function fetchData(){
    return new Promise((resolve, reject) => { 
       fetch ("https://pokeapi.co/api/v2/pokemon/1")
        .then((res)=>res.json())
        .then((data)=>{
          resolve(data)
          // console.log(data)
        })
        })
  }
  
  fetchData()


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
    // console.log(url)
    fetch(url.current)
      .then((res) => res.json())
      .then((data) => {
        setPokemons(data.results);
        // console.log(data)
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

    setImage([])
    setImage2([])
    setImageAni([])
    setHeight([])
    setWeight([])
    setType([])

    pokemons.map((pokemon) => (

        fetch(pokemon.url)
      .then((res) => res.json())
      .then((data) => {
        setImage((current) => [...current, data.sprites.front_default]);
        //data.sprites.other['official-artwork'].front_default
        //data.sprites.versions['generation-v']['black-white'].animated.front_default
        setImage2((current) => [...current, data.sprites.front_shiny]);
        setImageAni((current) => [...current, data.sprites.versions['generation-v']['black-white'].animated.front_default]);
        setHeight((current) => [...current, data.height]);
        setWeight((current) => [...current, data.weight]);
        setType((current) => [...current, data.types.map(type => type.type.name + " ")]);

        // setStats((current) => [...current, data.stats.map(stat => {
        //   switch (stat.stat.name) {
        //     case "hp":
        //       // const newHp = stat['base_stat'];
        //       hp = stat['base_stat'];
        //       break;
        //     case "attack":
        //       const newAttack = stat['base_stat'];
        //       break;
        //     case "defense":
        //       const newDefense = stat['base_stat'];
        //       break;
        //     default:
        //       break;
        //   }
        //   return stat;
        // })])

        // setStats((current) => [...current, data.stats.map(stat => stat.stat['base_stat'])]);

        setStatsHp((current) => [...current, data.stats[0]]);

        
      })
      .catch((err) => console.error(err))
    ))
    
  }, [pokemons]);

  


  return (
    <div>
      <br></br>
      {loading ? <div class="spinner-border" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div> : <h1 className="load-h1">Liste Pokémon</h1>}
      <br></br>
      <h2 className="load-h1">Passez la souris sur les Pokemons pour voir les formes shinys</h2>
      <br></br>

      <div className="pagination-top">
        {url.previous && <button class="btn btn-dark" onClick={previous}>Previous</button>}
        {url.next && <button class="btn btn-dark" onClick={next}>Next</button>}
      </div>

        {pokemons.map((pokemon, index) => (
          <div class={type[index]} id="test">

          {/* {console.log("stat", stats.map((x)=>{
            return x
          }))} */}

          {statsHp.map((statistique, index) => (
            console.log("Hp",statistique.base_stat)
          ))}
          {/* {console.log("stat", stats)} */}

          {/* {setStat(stats[index])} */}
            <div class="card-body">
              <h5 className="pokemon-name" key={index}> {pokemon.url.replace(/[^\d]/g, "").substring(1)} • {pokemon.name[0].toUpperCase() + pokemon.name.substring(1)}</h5>

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

                  {/* <ul class="type-poids">
                    <li class="list-group-item">Height : {height[index]/10} m</li>
                    <li class="list-group-item">Weight : {weight[index]/10} kg</li>
                   
                  </ul> */}

                  
                    
                  <Button variant="primary" onClick={() => {setModalShow(true); setPokeModal(pokemon.name[0].toUpperCase() + pokemon.name.substring(1)); setPokeModalImg(imageani[index]); setPokeModalHeight(height[index]); setPokeModalWeight(weight[index])}}>
                    See More
                  </Button>
                                    
            </div>
                <ModalTest
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    name={pokeModal}
                    img={pokeModalImg}
                    stat={statsHp}
                    height={pokeModalHeight/10}
                    weight={pokeModalWeight/10}
                  />

          </div>

        ))}
            
      <div className="pagination-bottom">
        {url.previous && <button class="btn btn-dark" onClick={previous}>Previous</button>}
        {url.next && <button class="btn btn-dark" onClick={next}>Next</button>}
      </div>

      <br/>
      <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/25.gif"} alt="{pokemon}" />
    </div>
  );
}