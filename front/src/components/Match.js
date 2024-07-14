import { useState } from "react";

export default function Match() {
    const ls = localStorage;

    const test = JSON.stringify(ls.getItem("Pokeuser1"));
    // REMPLACEMENT DES CROCHETS
    const test2 = test.replace(/[\[\]]/g, "");
    // REMPLACEMENT DES GUILLEMETS
    const lspokemon = test2.replace(/["]/g, "").split(",");



    const test3 = JSON.stringify(ls.getItem("Pokeuser2"));
    // REMPLACEMENT DES CROCHETS
    const test4 = test3.replace(/[\[\]]/g, "");
    // REMPLACEMENT DES GUILLEMETS
    const lspokemon2 = test4.replace(/["]/g, "").split(",");



    // INFO STATS POKEMON Card
    const [pokeName, setPokeName] = useState("");
    const [pokeHp, setPokeHp] = useState("");
    const [pokeAttack, setPokeAttack] = useState("");
    const [pokeSpeed, setPokeSpeed] = useState("");

    
    const [background, setBackground] = useState(["https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2fb2821a-1406-4a1d-9b04-6668f278e944/de2skpc-320d02a8-f03d-42cb-8aac-620f89bd78d4.jpg/v1/fill/w_1192,h_670,q_70,strp/pokemon_swsh___route_1_by_phoenixoflight92_de2skpc-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6IlwvZlwvMmZiMjgyMWEtMTQwNi00YTFkLTliMDQtNjY2OGYyNzhlOTQ0XC9kZTJza3BjLTMyMGQwMmE4LWYwM2QtNDJjYi04YWFjLTYyMGY4OWJkNzhkNC5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.rWdM6szyCpfNZAQbqSXKn1QlhPMkpVMePHJ7fA4FDXo", "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2fb2821a-1406-4a1d-9b04-6668f278e944/de2sl53-ebebbee7-1622-4b94-966e-cce39947397c.jpg/v1/fill/w_1192,h_670,q_70,strp/pokemon_swsh___route_1__night__by_phoenixoflight92_de2sl53-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6IlwvZlwvMmZiMjgyMWEtMTQwNi00YTFkLTliMDQtNjY2OGYyNzhlOTQ0XC9kZTJzbDUzLWViZWJiZWU3LTE2MjItNGI5NC05NjZlLWNjZTM5OTQ3Mzk3Yy5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.lDFWHjOUd8WCRIgUDf4O8mmFW1oBxgl8zvz77GsdM1E",
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2fb2821a-1406-4a1d-9b04-6668f278e944/de2slsx-3e964ef9-6367-454f-8ac4-d0aacc477dc5.jpg/v1/fill/w_1192,h_670,q_70,strp/pokemon_swsh___route_2_by_phoenixoflight92_de2slsx-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6IlwvZlwvMmZiMjgyMWEtMTQwNi00YTFkLTliMDQtNjY2OGYyNzhlOTQ0XC9kZTJzbHN4LTNlOTY0ZWY5LTYzNjctNDU0Zi04YWM0LWQwYWFjYzQ3N2RjNS5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.rf_3fN7y7CRW2ksuid43D4kYeuwdHFtkkZKMimJCzsI", "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2fb2821a-1406-4a1d-9b04-6668f278e944/de4kx52-cea4f225-d301-4f4e-b199-ceaf88826f97.jpg/v1/fill/w_1192,h_670,q_70,strp/pokemon_swsh___route_7_by_phoenixoflight92_de4kx52-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6IlwvZlwvMmZiMjgyMWEtMTQwNi00YTFkLTliMDQtNjY2OGYyNzhlOTQ0XC9kZTRreDUyLWNlYTRmMjI1LWQzMDEtNGY0ZS1iMTk5LWNlYWY4ODgyNmY5Ny5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.kHoDVJVG3teD5k-iD3wvb_p4yt5gFXYs0aRExEIS3A0", "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2fb2821a-1406-4a1d-9b04-6668f278e944/de2wbgo-382cf8a5-f30a-4a7c-8cbb-e7af22bdb6ac.jpg/v1/fill/w_1192,h_670,q_70,strp/pokemon_swsh___galar_mine_by_phoenixoflight92_de2wbgo-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6IlwvZlwvMmZiMjgyMWEtMTQwNi00YTFkLTliMDQtNjY2OGYyNzhlOTQ0XC9kZTJ3YmdvLTM4MmNmOGE1LWYzMGEtNGE3Yy04Y2JiLWU3YWYyMmJkYjZhYy5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.eHx_kfsY1X3BbnltUsYOayvRWzcsYB2NAelg2cLOLHI"])

    const rand = (Math.floor(Math.random() * 6) + 1);

    const GetStatsPokemon = async (id) => {


        await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
          .then((result) => result.json())
          .then((data) => {



            // SET INFO
            setPokeAttack((current) => [...current, data.stats[1].base_stat]);

            setPokeHp((current) => [...current, data.stats[0].base_stat]);
            setPokeName((current) => [...current, data.name[0].toUpperCase() + data.name.substring(1)]);

            setPokeSpeed((current) => [...current, data.stats[5].base_stat]);

            // console.log(pokeAttack);

          })
          .catch((err) => console.log(err));
    }


    console.log("rand", rand);

    return (
        <div style={{backgroundImage : `url(${background[rand]})`, height: "842px", backgroundSize: "cover"}}>
        <>

        
            {/* AFFICHAGE LISTE POKEMON FIGHT USER */}
            {/* POKEMON HORIZONTAL */}
            {lspokemon.slice(0).reverse().map((pokemon, index) => (
                <div style={{ margin: "15px", marginTop: "35px", backgroundColor: "#00000070", border: "3px solid black ", display: "inline-block"}}>
                    <img style={{ width: "90%"}} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon}.png`} alt="" />
                </div>
            ))}

            {/* DIV DE SEPARATION */}
            <div style={{ marginLeft: "850px", display: "inline-block"}}></div> 

            {lspokemon2.map((pokemon, index) => (
                <div style={{ margin: "15px", marginTop: "35px", backgroundColor: "#00000070", border: "3px solid black ", display: "inline-block"}}>
                    <img style={{ width: "90%"}} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon}.png`} alt="" />
                </div>
            ))}




                {/* ######################################################## */}



            {/* PERMET DE RENVERSER L'ORDRE DE LA LISTE EN CREANT UNE COPIE ET EN LA RENVERSANT */}
            {lspokemon.slice(0).reverse().map((pokemon, index) => (
                <div style={{ margin: "20px", display: "inline-block"}}>
                    <img style={{ width: "12%", position:"absolute", left:`${index*180}px`, bottom:"0px"}} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokemon}.png`} alt="" />
                </div>
            ))}

            {lspokemon2.map((pokemon, index) => (
                <div style={{ margin: "20px", display: "inline-block"}}>
                    <img style={{ width: "12%", position:"absolute", left:`${index*180}px`, bottom:"80px", marginLeft:"1110px" }} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon}.png`} alt="" />

                </div>
            ))}



                {/* #########################################   TEST   ############################################### */}


            {/* POKEMON VERTICAL */}
            {/* <div>
            {lspokemon.slice(0).reverse().map((pokemon, index) => (
                <div style={{ width:"80px", marginTop: "35px", backgroundColor: "#00000070", border: "3px solid black " }}>
                    <img style={{ width: "90%" }} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon}.png`} alt="" />
                </div>
            ))}
            </div> */}


            
            {/* <div>
            {lspokemon2.slice(0).reverse().map((pokemon, index) => (
                <div style={{ width:"80px", marginTop: "35px", left:"1110px", backgroundColor: "#00000070", border: "3px solid black " }}>
                    <img style={{ width: "90%"}} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon}.png`} alt="" />
                </div>
            ))}
            </div> */}



            




            {/* <div>
            {lspokemon.slice(0).reverse().map((pokemon, index) => (
                <div style={{ width:"80px", marginTop: "35px", backgroundColor: "#00000070", border: "3px solid black ", display:"flex" }}>
                    <img style={{ width: "90%" }} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon}.png`} alt="" />
                </div>
            ))}
            </div>


            <div>
            {lspokemon2.slice(0).reverse().map((pokemon, index) => (
                <div style={{ width:"80px", marginTop: "35px", left:"1110px", backgroundColor: "#00000070", border: "3px solid black ", display:"flex" }}>
                    <img style={{ width: "90%"}} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon}.png`} alt="" />
                </div>
            ))}
            </div> */}




            {/* PERMET DE RENVERSER L'ORDRE DE LA LISTE EN CREANT UNE COPIE ET EN LA RENVERSANT
            {lspokemon.slice(0).reverse().map((pokemon, index) => (
                <div style={{ margin: "20px", display: "inline-block"}}>
                    <img style={{ width: "12%", position:"absolute", left:`${index*180}px`, bottom:"0px"}} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokemon}.png`} alt="" />
                    {console.log("index", index)}
                </div>
            ))}

            {lspokemon2.map((pokemon, index) => (
                <div style={{ margin: "20px", display: "inline-block"}}>
                    <img style={{ width: "12%", position:"absolute", left:`${index*180}px`, bottom:"80px", marginLeft:"1110px" }} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon}.png`} alt="" />

                </div>
            ))} */}


        </>
        </div>
    )
}