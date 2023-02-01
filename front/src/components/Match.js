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


    return (
        // <div style={{backgroundImage : "url(https://i.guim.co.uk/img/media/3b962fbea708f7ca583ed67ff88119a428aaa504/0_443_1440_1440/master/1440.jpg?width=700&quality=85&auto=format&fit=max&s=161871a32f64b1551f8edeccc3c17403)", height: "1080px", backgroundSize: "cover"}}>
        <>
            <h2>Match</h2>

            {lspokemon.map((pokemon, index) => (
                <div style={{ margin: "20px", display: "inline-block"}}>
                    {/* <p>{pokemon}</p> */}
                    <img style={{ width: "120%" }}  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokemon}.png`} alt="" />
                </div>
            ))}

            {lspokemon2.map((pokemon, index) => (
                <div style={{ margin: "20px", display: "inline-block"}}>
                    {/* <p>{pokemon}</p> */}
                    <img style={{ width: "120%" }}  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon}.png`} alt="" />

                </div>
            ))}


        </>
        // </div>
    )
}