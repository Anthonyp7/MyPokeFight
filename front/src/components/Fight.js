import { useEffect, useState } from "react"
import CardPokemon from "./Card";

    

export default function Fight() {

    const ls = localStorage;
    const [pokeName, setPokeName] = useState("");

    const [pokeHeight, setPokeHeight] = useState("");
    const [pokeWeight, setPokeWeight] = useState("");
        

    // INFO STATS POKEMON Card
    const [pokeHp, setPokeHp] = useState("");
    const [pokeAttack, setPokeAttack] = useState("");
    const [pokeSpeed, setPokeSpeed] = useState("");


    const test = JSON.stringify(ls.getItem("PokeId"));

    // REMPLACEMENT DES CROCHETS
    const test2 = test.replace(/[\[\]]/g, "");

    // REMPLACEMENT DES GUILLEMETS
    const lspokemon = test2.replace(/["]/g, "").split(",") ;

    
    console.log(test)
    console.log(lspokemon);
    
    // useEffect(() => {

    // })
    return(
        <>
            <h2>Fight</h2>

            {/* {lspokemon[2]} */}
            {lspokemon.map((pokemon, index) => (
                console.log(pokemon),
                <CardPokemon 
                img={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon}.png`}
                isShiny="0"
                fight={true}
                />
            ))}
            
        </>
    )
}