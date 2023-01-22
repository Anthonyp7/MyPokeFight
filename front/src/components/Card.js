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













import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';
// import '../styles/Card.css';
import '../styles/PokemonColors.css';


export default function CardPokemon(props) {
    const ls = localStorage;

    const [widths, setWidths] = useState(window.innerWidth);

    const [legendary, setLengedary] = useState(false);
    const [shiny, setShiny] = useState(Math.floor(Math.random() * 3) + 1);
    const [isShiny, setIsShiny] = useState(false);

    const [tab, setTab] = useState([]);

    const [img, setImg] = useState(props.img);
    
    
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

