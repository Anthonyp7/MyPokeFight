import axios from 'axios';
import React, { useState} from 'react';
import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import '../styles/Card.css';
import '../styles/PokemonColors.css';
import '../styles/Shiny.css';
import MegaPoke from './MegaPokemon';


export default function CardPokemon(props) {
    const ls = localStorage;
    const date = new Date();
    const minute = date.getMinutes();


    const [widths, setWidths] = useState(window.innerWidth);

    const [legendary, setLengedary] = useState(false);
    const [isShiny, setIsShiny] = useState("");

    const [canMegaPokemons, setCanMegaPokemons] = useState(["3","6","9","15","18","65","80","94","115","127","130","142","150","181","208","212","214","229","248","254","257","260", "282", 
    "302", "303", "306", "308", "310", "319", "323", "334", "354", "359", "362", "373", "376", "380", "381", "384", "428", "445", "448", "460", "475", "531", "719"]);
    const [megaPokemons, setMegaPokemons] = useState(["10033","10034","10036","10090","10073","10037","10071","10038","10039","10040","10041","10042","10044","10045","10072","10046","10047","10048","10049","10065","10050","10064", "10051", 
    "10066", "10052", "10053", "10054", "10055", "10070", "10087", "10067", "10056", "10057", "10074", "10089", "10076", "10062", "10063", "10079", "10088", "10058", "10059", "10060", "10068", "10069", "10075"]);

    const [img, setImg] = useState(props.img);
    const [modalShow, setModalShow] = React.useState(false);

    
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${props.id}/`)
    .then((result) => result.json())
        .then((data) => {

        
        setLengedary(data.is_legendary);
        // CONDITION SHINY
        if ((data.order + (ls.getItem("Username").length)) % 10 === 0){
            setIsShiny("shiny");
            setImg(props.img2);
        }

        

        })
        .catch((err) => console.log(err));
    //

    

    function GetMegaPokemon() {

        const test = JSON.stringify(ls.getItem("PokeId"));
        // REMPLACEMENT DES CROCHETS
        const test2 = test.replace(/[\[\]]/g, "");
        // REMPLACEMENT DES GUILLEMETS
        const lspokemon = test2.replace(/["]/g, "").split(",");



        if (props.night === true && props.id === "6")
        {
            lspokemon[(lspokemon).indexOf(`${props.id}`)] = "10035";

            // MODIFICATION POKEID POKEMON
            axios.patch('http://localhost:3080/pokemon',
            {
                mode: 'no-cors',
                username: ls.getItem("Username"),
                pokeid: props.id,
                newpokeid: "10035"
            })
            .then(res => {

            })
        }

        else{
            lspokemon[(lspokemon).indexOf(`${props.id}`)] = megaPokemons[(canMegaPokemons).indexOf(`${props.id}`)];

            // MODIFICATION POKEID POKEMON
            axios.patch('http://localhost:3080/pokemon',
            {
                mode: 'no-cors',
                username: ls.getItem("Username"),
                pokeid: props.id,
                newpokeid: megaPokemons[(canMegaPokemons).indexOf(`${props.id}`)]
            })
            .then(res => {

            })
        }

        

        // MODIFICATION ARRAY POKEID USER
        axios.patch('http://localhost:3080/userpokemon',
        {
            mode: 'no-cors',
            username: ls.getItem("Username"),
            newpokeid: lspokemon
        })
        .then(res => {
            ls.setItem("PokeId", res.data.pokemonid);
        })
    }

    



    const popover = (
        <Popover id="popover-basic">
          <Popover.Header as="h3">Méga Evolution</Popover.Header>
          <Popover.Body>
            {/* SI IL FAIT NUIT ET QUE LE POKEMON EST UN DRCAUFEU */}
            {props.night === true && props.id === "6" ?
            <>
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10035.png`} alt=""/>
                
            </>
            :
            <>
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${megaPokemons[(canMegaPokemons).indexOf(`${props.id}`)]}.png`} alt=""/>
            </>}
            
          </Popover.Body>
        </Popover>
    );



    return (
        <>
            {props.fight === true ?
                    // <Card {...props} bg="dark" style={{ width: '12rem', display: 'inline-block', marginRight: '0 px', marginLeft: widths/8, marginTop: '80px' }}>
                    //     {/*  */}
                    //     <div className='card-container'>
                    //         <div className='card'>
                    //             <div className='card-image'>
                    //             <Card.Img  variant="top" src={img} />

                    //             </div>
                    //             <div className='card-content'>
                    //                 <p>Test</p>
                    //             </div>
                    //         </div>
                    //     </div>
                    //     <Card.Body>
                    //     </Card.Body>
                    // </Card>




                    <Card {...props} className='card-container' bg="dark" style={{ width: '15rem', display: 'inline-block', marginRight: '0 px', marginLeft: widths/6, marginTop: '80px' }}>
                        {/*  */}
                            
                            <Card.Body className='card'>
                                <Card.Img className='card-image' variant="top" src={img} />

                                <Card.Text className='card-content'>
                                    {props.id}
                                </Card.Text>
                            </Card.Body>
                    </Card>
                :

                <>
                    
                    {legendary === true ?
                        <>
                            <Card {...props} text="black" className={props.type + "legendary"} border="warning" style={{ width: '17rem', display: 'inline-block', marginRight: '0 px', marginLeft: widths/12, marginBottom: '40px' }}>
                                <Card.Img variant="top" src={img} className={isShiny}/>


                                <Card.Title className={isShiny}>{props.name}</Card.Title>
                                <Card.Body className={isShiny}>
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
                                    
                                    
                                    {canMegaPokemons.includes(props.id) ?
                                        <>
                                        <br></br>
                                            <OverlayTrigger trigger={['hover', 'focus']} placement="top" overlay={popover}>
                                                <Button className='glow-on-hover' variant="primary" onClick={() => {
                                                    

                                                    GetMegaPokemon();
                                                    setModalShow(true);
                                                    setTimeout(()=> {
                                                        window.location.reload()
                                                    }, 10000);

                                                    }} style={{width: "30%"}}><img src='https://www.pokebip.com/pages/general/images/mega-evolution.png' style={{width: "70%"}} alt=""/></Button>
                                            </OverlayTrigger>

                                            <MegaPoke
                                            show={modalShow}
                                            id={props.id}
                                            onHide={() => setModalShow(false)}
                                            />
                                        </>
                                        :
                                            null
                                    }
                                </Card.Body>
                            </Card>
                        </>
                        
                        :
                        // SI LE POKEMON N'EST PAS LEGENDAIRE
                        
                            <Card {...props} text={props.text} border="dark" className={props.type} style={{width: '17rem', display: 'inline-block', marginRight: '0 px', marginLeft: widths/12, marginBottom: '40px' }}>
                                <Card.Img variant="top" src={img} className={isShiny}/>


                                <Card.Title className={isShiny}>{props.name}</Card.Title>
                                <Card.Body className={isShiny}>
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
                                        <>
                                        <br></br>
                                        <OverlayTrigger trigger={['hover', 'focus']} placement="top" overlay={popover}>
                                            <Button className='glow-on-hover' variant="primary" onClick={() => {
                                                

                                                GetMegaPokemon();
                                                setModalShow(true);
                                                setTimeout(()=> {
                                                    window.location.reload()
                                                }, 10000);

                                                }} style={{width: "30%"}}><img src='https://www.pokebip.com/pages/general/images/mega-evolution.png' style={{width: "70%"}}/></Button>
                                        </OverlayTrigger>

                                        <MegaPoke
                                        show={modalShow}
                                        id={props.id}
                                        onHide={() => setModalShow(false)}
                                        night={props.night}
                                        />
                                        </>
                                    :
                                        null
                                    }
                                    <br></br>
                                </Card.Body>
                            </Card>
                        }
                </>
            }
        </>
    )
}

