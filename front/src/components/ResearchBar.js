import React, { useState } from "react";
import CardPokemon from "./Card";

export default function ResearchBar () {
    const [searchValue, setSearchValue] = useState();
    const [datas, setDatas] = useState([]);

    const handleSearchChange = event => {
        setSearchValue(event.target.value);
    }

    const handleSearchSubmit = event => {
        event.preventDefault();
        fetch(`https://pokeapi.co/api/v2/pokemon/${searchValue}`)
        .then(response => response.json())
        .then(data => {
            setDatas(data)
            // mettre a jour l'etat avec les données récupérées
        })
        .catch(error => console.error(error));
    }

    return (
        <form onSubmit={handleSearchSubmit}>
            <input type="text" value={searchValue} onChange={handleSearchChange} placeholder="Search for a Pokemon" />
            <button type="submit">Search</button>
            {datas && <div>{datas.name}
            {console.log(searchValue)}

            {searchValue === undefined ? null :
            <CardPokemon
            img={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${datas.id}.png`}
            img2={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${datas.id}.png`}
            isShiny={0}
            name={datas.name}
            pokehp={datas.stats[0].base_stat}
            pokeattack={datas.stats[1].base_stat}
            pokespeed={datas.stats[5].base_stat}
            pokeheight={datas.height / 10}
            pokeweight={datas.weight / 10}
            fight={false}
          />}

            
            </div>}
        </form>
    );
}
