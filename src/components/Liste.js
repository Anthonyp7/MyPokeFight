import { useState, useEffect, useRef } from "react";
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
  const [type2, setType2] = useState([]);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  // const [testbool, setTestBool] = useState(true);

  const [types, setTypes] = useState(true);
  let testbool = true;
  const count = useRef(0);



  //PAGE SUIVANTE
  const next = () => {
    const newUrl = {
      current: url.next,
      previous: url.current,
      next: null,
    };

    // let data = fetch(url.next)
    // .then((res) => res.json())
    // .then(data => {
    //   setImage((next) => [...next, data.sprites.front_default]);
    // })

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
        //versions.generation-v.black-white.animated.
        setImage2((current) => [...current, data.sprites.front_shiny]);
        setHeight((current) => [...current, data.height]);
        setWeight((current) => [...current, data.weight]);
        setType((current) => [...current, data.types.map(type => type.type.name + " ")]);
        // setType((current) => [...current, data.types[0].type.name]);
        
        
        // if((data.types).length === 1)
        // {
        //   console.log((data.types).length);
        //   setType((current) => [...current, data.types[0].type.name]);
        //   setTypes(false);
        //   testbool = false;
        // }
        // else{
        //   console.log((data.types).length);
        //   setType((current) => [...current, data.types[0].type.name]);
        //   setType2((current) => [...current, data.types[1].type.name]);
        //   setTypes(true);
        //   testbool = true;
        // }

        // console.log(types);
        console.log(testbool);
        console.log(data.types[1].type.name);
        count.current = testbool;
      })
      
      // .then((data) => {
      //   setImage((next) => [...next, data.sprites.front_default]);
      // })
      // .then((data) => setImage((next) => [...next, data.sprites.front_default]))


      .catch((err) => console.error(err))
    ))
  }, [pokemons], [testbool]);


  



  return (
    <div>
      {loading ? <div class="spinner-border" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div> : <h1>Retest</h1>}
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

{/* {testbool === true ? <div><ul class={type2[index]}>
                      <li class="list-group-item">{type2[index]}</li>
                    </ul></div> : <h4>test</h4> } */}


                    {/* {console.log("test", count.current)}
                    {testbool === true ? <div><p>Type 1 et Type 2</p></div>
                    : <div><p>Type 1</p></div>} */}

                  {/* INFO POKEMON */}
                  

                  {console.log(type[index])}
                  <div  className="type-li" >
                    <ul class={type[index]}>
                      <li class="list-group-item">{type[index]}</li>
                    </ul>

                    <ul class={type[index]}>
                      <li class="list-group-item">{type[index]}</li>
                    </ul>


                    {/* {type[index][1] != null ? 
                    <ul class={type[index][1]}>
                      <li class="list-group-item">{type[index][1]}</li>
                    </ul>: 
                    <ul class={type[index]}>
                      <li class="list-group-item">{type[index]}</li>
                    </ul>} */}



                    {/* <ul class={type2[index]}>
                      <li class="list-group-item">{type2[index]}</li>
                    </ul> */}
                  </div>

                    <ul class="">
                      <li class="list-group-item">Height : {height[index]} cm</li>
                      <li class="list-group-item">Weight : {weight[index]} kg</li>
                    </ul>
                    
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
