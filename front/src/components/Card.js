// import { useState, useEffect } from 'react';
// import Card from 'react-bootstrap/Card';
// import ProgressBar from 'react-bootstrap/ProgressBar';
// // import '../styles/Card.css';
// import '../styles/PokemonColors.css';


// export default function CardPokemon(props) {
//     const ls = localStorage;

//     const [widths, setWidths] = useState(window.innerWidth);

//     const [legendary, setLengedary] = useState(false);
//     const [shiny, setShiny] = useState(Math.floor(Math.random() * 3) + 1);
//     const [isShiny, setIsShiny] = useState([false]);

//     const [tab, setTab] = useState([]);

//     const [img, setImg] = useState(props.img);
    
    
//     fetch(`https://pokeapi.co/api/v2/pokemon-species/${props.id}/`)
//     .then((result) => result.json())
//         .then((data) => {

        
//         setLengedary(data.is_legendary);
//         setShiny(data.order);

//         for (let i = 0; i > (ls.getItem("PokeId")).length; i += 1){
//             if (shiny % 10 === 0){
//                 setTab(isShiny.push(true));
//                 // setIsShiny(true);
//                 setImg(props.img2);
//             }
    
//             else{
//                 setTab(isShiny.push(false));
//                 setImg(props.img);
//             }
    
//             console.log(isShiny)
//         }

        

        

//         })
//         .catch((err) => console.log(err));
//     //



//     return (
//         <>
            
//             {props.fight === true ?
//                 <>
//                     <Card {...props} bg="light" style={{ width: '12rem', display: 'inline-block', marginRight: '200px', marginLeft: '150px', marginTop: '80px' }}>
//                         <Card.Img variant="top" src={img} />
//                         <Card.Body>
//                         </Card.Body>
//                     </Card>
//                 </>

//                 :

//                 <>
                    
//                     {legendary === true ?
//                         <>
                        
                        
//                             <Card {...props} className={props.type + "legendary"} border="warning"  style={{ width: '17rem', display: 'inline-block', marginRight: '0 px', marginLeft: widths/12, marginBottom: '40px' }}>
//                                 <Card.Img variant="top" src={img} />


//                                 <Card.Title>{props.name}</Card.Title>
//                                 <Card.Body>
//                                     <div>
//                                         <p className="card-text">Taille: {props.pokeheight} m <br></br>
//                                             Poids: {props.pokeweight} kg</p>
//                                     </div>
//                                     <div className='progress-stats'>

//                                         <img src='https://cdn-icons-png.flaticon.com/512/7037/7037210.png' alt='' /><br></br>
//                                         <ProgressBar animated variant='success' now={props.pokehp} label={`${props.pokehp}`} />

//                                         <br></br>

//                                         <img src='https://cdn-icons-png.flaticon.com/512/2746/2746914.png' alt='' /><br></br>
//                                         <ProgressBar animated variant='danger' now={props.pokeattack} label={`${props.pokeattack}`} />
//                                         <br></br>

//                                         <img src='https://cdn-icons-png.flaticon.com/512/7154/7154506.png' alt='' /><br></br>
//                                         <ProgressBar animated variant='info' now={props.pokespeed} label={`${props.pokespeed}`} />
//                                     </div>
//                                     <br></br>
//                                 </Card.Body>
//                             </Card>
//                         </>
                        
//                         :
//                         <>
//                             <Card {...props} text="white" border="dark" className={props.type} style={{ width: '17rem', display: 'inline-block', marginRight: '0 px', marginLeft: widths/12, marginBottom: '40px' }}>
//                                 <Card.Img variant="top" src={img} />


//                                 <Card.Title>{props.name}</Card.Title>
//                                 <Card.Body>
//                                     <div>
//                                         <p className="card-text">Taille: {props.pokeheight} m <br></br>
//                                             Poids: {props.pokeweight} kg</p>
//                                     </div>
//                                     <div className='progress-stats'>

//                                         <img src='https://cdn-icons-png.flaticon.com/512/7037/7037210.png' alt='' /><br></br>
//                                         <ProgressBar animated variant='success' now={props.pokehp} label={`${props.pokehp}`} />

//                                         <br></br>

//                                         <img src='https://cdn-icons-png.flaticon.com/512/2746/2746914.png' alt='' /><br></br>
//                                         <ProgressBar animated variant='danger' now={props.pokeattack} label={`${props.pokeattack}`} />
//                                         <br></br>

//                                         <img src='https://cdn-icons-png.flaticon.com/512/7154/7154506.png' alt='' /><br></br>
//                                         <ProgressBar animated variant='info' now={props.pokespeed} label={`${props.pokespeed}`} />
//                                     </div>
//                                     <br></br>
//                                 </Card.Body>
//                             </Card>
//                         </>
//                         }
                    
                    
                            
//                 </>
                
//             }
//         </>
//     )
// }












import axios from 'axios';
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
// import '../styles/Card.css';
import '../styles/PokemonColors.css';


export default function CardPokemon(props) {
    const ls = localStorage;

    const [widths, setWidths] = useState(window.innerWidth);

    const [legendary, setLengedary] = useState(false);
    const [shiny, setShiny] = useState(Math.floor(Math.random() * 3) + 1);
    const [isShiny, setIsShiny] = useState(false);

    const [canMegaPokemons, setCanMegaPokemons] = useState(["3","6","9","15","18","65","80","94","115","127","130","142","150","181","208","212","214","229","248","254","257","260"]);
    const [megaPokemons, setMegaPokemons] = useState(["10033","10034","10036","10036","10037","10036","10037","10038","10034","10034","10034","10034","10034","10034","10034","10034","10034","10034","10034","10034","10034","10034"]);

    const [tab, setTab] = useState([]);

    const [img, setImg] = useState(props.img);


    const test = JSON.stringify(ls.getItem("PokeId"));
    // REMPLACEMENT DES CROCHETS
    const test2 = test.replace(/[\[\]]/g, "");
    // REMPLACEMENT DES GUILLEMETS
    const [lspokemon, setLspokemon] = useState(test2.replace(/["]/g, "").split(","));
    
    
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${props.id}/`)
    .then((result) => result.json())
        .then((data) => {

        
        setLengedary(data.is_legendary);
        setShiny(data.order);

        if (shiny % 10 === 0){
            setIsShiny(true);
            setImg(props.img2);
        }

        // else{
        //     setIsShiny(false);
        //     setImg(props.img);
        // }

        

        })
        .catch((err) => console.log(err));
    //

    // console.log(typeof ls.getItem("PokeId"));
    // // console.log("test", ls.getItem("PokeId")[1]);
    // console.log("typeof lspokemon",typeof lspokemon);
    // console.log("test2", lspokemon);


    // console.log("props", props.id);

        

    function GetMegaPokemon() {


        // ls.setItem("Pokeid", lspokemon.slice(lspokemon.indexOf(`${props.id}`), 1, megaPokemons[(canMegaPokemons).indexOf(`${props.id}`)]));

        // setLspokemon(lspokemon.slice(lspokemon.indexOf(`${props.id}`), 1, megaPokemons[(canMegaPokemons).indexOf(`${props.id}`)]));




        // setLspokemon(lspokemon.push(props.id))

        // console.log("typeof lspokemon",typeof lspokemon);
        // console.log("test2", lspokemon);

        // console.log("props", props.id);

        axios.patch('http://localhost:3080/pokemon',
            {
                mode: 'no-cors',
                username: ls.getItem("Username"),
                pokeid: props.id,
                newpokeid: megaPokemons[(canMegaPokemons).indexOf(`${props.id}`)]
            })
            .then(res => {
                // setPokemons(res.data.pokemonid);
                console.log(res.data.pokemonid);

            })
        

    }

    



    const popover = (
        <Popover id="popover-basic">
          <Popover.Header as="h3">Méga Evolution</Popover.Header>
          <Popover.Body>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${megaPokemons[(canMegaPokemons).indexOf(`${props.id}`)]}.png`} alt=""/>
          </Popover.Body>
        </Popover>
      );



    return (
        <>
            
            {props.fight === true ?
                <>
                    <Card {...props} bg="light" style={{ width: '12rem', display: 'inline-block', marginRight: '200px', marginLeft: '150px', marginTop: '80px' }}>
                        <Card.Img variant="top" src={img} />
                        <Card.Body>
                        </Card.Body>
                    </Card>
                </>

                :

                <>
                    
                    {legendary === true ?
                        <>
                        
                        
                            <Card {...props} className={props.type + "legendary"} border="warning"  style={{ width: '17rem', display: 'inline-block', marginRight: '0 px', marginLeft: widths/12, marginBottom: '40px' }}>
                                <Card.Img variant="top" src={img} />


                                <Card.Title>{props.name}</Card.Title>
                                <Card.Body>
                                    <div>
                                        <p className="card-text">Taille: {props.pokeheight} m <br></br>
                                            Poids: {props.pokeweight} kg</p>
                                    </div>
                                    <div className='progress-stats'>

                                        <img src='https://cdn-icons-png.flaticon.com/512/7037/7037210.png' alt='' /><br></br>
                                        <ProgressBar animated variant='success' now={props.pokehp} label={`${props.pokehp}`} />

                                        <br></br>

                                        <img src='https://cdn-icons-png.flaticon.com/512/2746/2746914.png' alt='' /><br></br>
                                        <ProgressBar animated variant='danger' now={props.pokeattack} label={`${props.pokeattack}`} />
                                        <br></br>

                                        <img src='https://cdn-icons-png.flaticon.com/512/7154/7154506.png' alt='' /><br></br>
                                        <ProgressBar animated variant='info' now={props.pokespeed} label={`${props.pokespeed}`} />
                                    </div>
                                    <br></br>
                                </Card.Body>
                            </Card>
                        </>
                        
                        :
                        <>
                            <Card {...props} text="white" border="dark" className={props.type} style={{ width: '17rem', display: 'inline-block', marginRight: '0 px', marginLeft: widths/12, marginBottom: '40px' }}>
                                <Card.Img variant="top" src={img} />


                                <Card.Title>{props.name}</Card.Title>
                                <Card.Body>
                                    <div>
                                        <p className="card-text">Taille: {props.pokeheight} m <br></br>
                                            Poids: {props.pokeweight} kg</p>
                                    </div>
                                    <div className='progress-stats'>

                                        <img src='https://cdn-icons-png.flaticon.com/512/7037/7037210.png' alt='' /><br></br>
                                        <ProgressBar animated variant='success' now={props.pokehp} label={`${props.pokehp}`} />

                                        <br></br>

                                        <img src='https://cdn-icons-png.flaticon.com/512/2746/2746914.png' alt='' /><br></br>
                                        <ProgressBar animated variant='danger' now={props.pokeattack} label={`${props.pokeattack}`} />
                                        <br></br>

                                        <img src='https://cdn-icons-png.flaticon.com/512/7154/7154506.png' alt='' /><br></br>
                                        <ProgressBar animated variant='info' now={props.pokespeed} label={`${props.pokespeed}`} />
                                    </div>
                                    
                                    
                                    
                                    {canMegaPokemons.includes(props.id) ?
                                        <OverlayTrigger trigger="hover" placement="top" overlay={popover}>
                                            <Button variant="primary" onClick={GetMegaPokemon}> Méga Evolution</Button>
                                        </OverlayTrigger>
                                        
                                    :
                                        null
                                    }
                                    <br></br>
                                </Card.Body>
                            </Card>
                        </>
                        }
                    
                    
                            
                </>
                
            }
        </>
    )
}

