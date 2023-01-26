import { useState, useEffect } from "react";
import '../styles/Liste.css';
import '../styles/PokemonColors.css';
import ModalTest from "./Modal";
import React from 'react';
import Button from 'react-bootstrap/Button';
import ResearchBar from "./ResearchBar";


export default function ListePokemon() {
  const [widths, setWidths] = useState(window.innerWidth - 17 + "px");
  const [pokemons, setPokemons] = useState([]);
  const [url, setUrl] = useState({
    current: "https://pokeapi.co/api/v2/pokemon/",
    next: null,
    previous: null,
  });
  const [image, setImage] = useState([]);
  const [image2, setImage2] = useState([]);
  const [imageani, setImageAni] = useState([]);
  const [imageaniback, setImageAniBack] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalShow, setModalShow] = React.useState(false);

  // INFO POKEMON
  const [type, setType] = useState([]);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  // INFO STATS POKEMON
  const [statsHp, setStatsHp] = useState([]);
  const [statsAttack, setStatsAttack] = useState([]);
  const [statsSpeed, setStatsSpeed] = useState([]);

  // INFO POKEMON MODAL
  const [pokeModal, setPokeModal] = useState("");
  const [pokeModalImg, setPokeModalImg] = useState("");
  const [pokeModalImg2, setPokeModalImg2] = useState("");
  const [pokeModalHeight, setPokeModalHeight] = useState("");
  const [pokeModalWeight, setPokeModalWeight] = useState("");
  const [pokeModalType, setPokeModalType] = useState("");

  // INFO STATS POKEMON MODAL
  const [pokeModalHp, setPokeModalHp] = useState("");
  const [pokeModalAttack, setPokeModalAttack] = useState("");
  const [pokeModalSpeed, setPokeModalSpeed] = useState("");


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
        setLoading(false);
      })
      .catch((err) => console.log(err));
    //eslint-disable-next-line
  }, [url.current]);


  useEffect(() => {

    setImage([])
    setImage2([])
    setImageAni([])
    setImageAniBack([])
    setHeight([])
    setWeight([])
    setType([])
    setStatsHp([])
    setStatsAttack([])
    setStatsSpeed([])


    Promise.all(pokemons.map((pokemon) => (
      fetch(pokemon.url).then((res) => res.json())
    )))
      .then((datas) => datas.map(data => {
        //SET IMG
        setImage((current) => [...current, data.sprites.front_default]);
        setImage2((current) => [...current, data.sprites.front_shiny]);
        setImageAni((current) => [...current, data.sprites.versions['generation-v']['black-white'].animated.front_default]);
        setImageAniBack((current) => [...current, data.sprites.versions['generation-v']['black-white'].animated.back_default]);

        // SET INFO
        setHeight((current) => [...current, data.height]);
        setWeight((current) => [...current, data.weight]);
        setType((current) => [...current, data.types.map(type => type.type.name + " ")]);

        // SET STATS
        setStatsHp((current) => [...current, data.stats[0].base_stat]);
        setStatsAttack((current) => [...current, data.stats[1].base_stat]);
        setStatsSpeed((current) => [...current, data.stats[5].base_stat]);
      }))

  }, [pokemons]);




  return (
    <div style={{ width:`${widths}`}}>
      <br></br>
      {loading ? <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div> : <h1 className="load-h1">Liste Pokémon</h1>}
      <br></br>
      <h2 fontFamily="pokemon_classicregular,arial, sans-serif" className="load-h2">Passez la souris sur les Pokemons pour voir les formes shinys</h2>
      <br></br>

      <ResearchBar />

      {pokemons.map((pokemon, index) => (


        <div className={type[index]} id="test" >
          <div className="card-body"onClick={() => {
              setModalShow(true);
              setPokeModal(pokemon.name[0].toUpperCase() + pokemon.name.substring(1));
              setPokeModalImg(imageani[index]);
              setPokeModalImg2(imageaniback[index]);
              setPokeModalHeight(height[index]);
              setPokeModalWeight(weight[index]);
              setPokeModalHp(statsHp[index]);
              setPokeModalAttack(statsAttack[index]);
              setPokeModalSpeed(statsSpeed[index]);
              setPokeModalType(type[index])
            }}>
            <h5 className="pokemon-name" key={index}> {pokemon.url.replace(/[^\d]/g, "").substring(1)} • {pokemon.name[0].toUpperCase() + pokemon.name.substring(1)}</h5>

            <div className="image">
              <img className="img-poke" src={image[index]} alt="" />
            </div>
            <div className="image-hover">
              <img className="img-poke" src={image2[index]} alt="" />
            </div>

            {/* INFO POKEMON */}
            <div className="type-li" >
              <ul className={type[index]}>
                <li className="list-group-item">{type[index]}</li>
              </ul>
            </div>

            {/* <Button variant="" className="btn-stat" >
              <img className="btn-img" src="https://cdn-icons-png.flaticon.com/512/2394/2394792.png" alt=""></img>
            </Button> */}

          </div>

          <ModalTest
            show={modalShow}
            onHide={() => setModalShow(false)}
            name={pokeModal}
            img={pokeModalImg}
            img2={pokeModalImg2}
            stathp={pokeModalHp}
            statattack={pokeModalAttack}
            statspeed={pokeModalSpeed}
            height={pokeModalHeight / 10}
            weight={pokeModalWeight / 10}

            type={pokeModalType}
          />

        </div>

      ))}

      <div className="pagination-bottom">
        {url.previous && <button className="btn-prev" onClick={previous}><img className="btn-img" src="https://cdn.discordapp.com/attachments/956119709361774592/1064316873061175417/btn-prev.png" alt=""></img></button>}
        {url.next && <button className="btn-next" onClick={next}><img className="btn-img" src="https://cdn.discordapp.com/attachments/956119709361774592/1064316855587700776/btn-next.png" alt=""></img></button>}
      </div>

    </div>
  );
}