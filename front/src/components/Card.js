import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';


export default function CardPokemon(props) {
    const ls = localStorage;
    // const [show, setShow] = useState(false);
    // const handleShow = () => setShow(true);


    return (
        <>
            {props.fight === true ?
                <>
                    <Card {...props} bg="light" style={{ width: '12rem', display: 'inline-block', marginRight: '200px', marginLeft: '150px', marginTop: '80px' }}>
                        <Card.Img variant="top" src={props.img} />
                        <Card.Body>
                        </Card.Body>
                    </Card>
                </>

                :
                <>
                    <Card {...props} bg="light" style={{ width: '17rem', display: 'inline-block', marginRight: '50px', marginLeft: '50px', marginBottom: '40px' }}>
                        {props.isShiny === 7 ?
                            <>
                                <Card.Img variant="top" src={props.img2} />
                            </>
                            :
                            <>
                                <Card.Img variant="top" src={props.img} />
                            </>}


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
    )
}

