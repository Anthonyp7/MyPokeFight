import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import CardPokemon from "./Card";

    

export default function Fight(props) {

    const ls = localStorage;
    const [order, setOrder] = useState([]);
    const [tab, setTab] = useState([]);
    
    const test = JSON.stringify(ls.getItem("PokeId"));

    // REMPLACEMENT DES CROCHETS
    const test2 = test.replace(/[\[\]]/g, "");

    // REMPLACEMENT DES GUILLEMETS
    const lspokemon = test2.replace(/["]/g, "").split(",") ;
    
    
    // useEffect(() => {

    // })

    // const AddtoFight = (poke) => {
    //     // setTab(order.push(poke));
    //     console.log("order", order);
    // }
    
    const AddtoFight = () => {
        setTab(order.push(props.id));
        ls.setItem("Order", JSON.stringify(order));
        console.log("order", order);
    }
    

    return(
        <>
            <h1 className="load-h1">Fight</h1>
            <br></br><br></br>

            {/* {lspokemon[2]} */}
            {lspokemon.reverse().map((pokemon, index) => (
                <>
                
                    <CardPokemon 
                    img={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon}.png`}
                    id={pokemon}
                    isShiny="0"
                    fight={true}
                    test={0}
                    addfight={AddtoFight}
                    />
                    <Button variant="primary" onClick={() => {
                        setTab(order.push(pokemon));
                        ls.setItem("Order", JSON.stringify(order));
                        console.log("order", order);
                    }}>Ajouter au combat</Button>
                </>
            ))}
            
        </>
    )
}