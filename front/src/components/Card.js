// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';


// export default function CardPokemon(x) {
//     return(
//         <Card style={{ width: '18rem' }}>
//             <Card.Img variant="top" src={x}/>
//             <Card.Body>
//             <Card.Title>Card Title</Card.Title>
//             <Card.Text>
//                 Some quick example text to build on the card title and make up the
//                 bulk of the card's content.
//             </Card.Text>
//             <Button variant="primary">Go somewhere</Button>
//             </Card.Body>
//         </Card>
//     )

// }



import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';


export default function CardPokemon(props) {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    return (
        <Card {...props} style={{ width: '18rem' }}>
            <Card.Img variant="top" src={props.img} />
            <Card.Title>{props.name}Nom poke</Card.Title>
            <Card.Body>
                <div>
                    <p className="card-text">Taille: {props.height} m <br></br>
                        Poids: {props.weight} kg</p>
                </div>
                <div className='progress-stats'>
                    {/* <p>Hp:</p> */}
                    <img src='https://cdn-icons-png.flaticon.com/512/7037/7037210.png' alt='' /><br></br>
                    <ProgressBar animated variant='success' now={props.stathp} label={`${props.stathp}`} />

                    <br></br>
                    {/* <p>Attaque:</p> */}
                    <img src='https://cdn-icons-png.flaticon.com/512/2746/2746914.png' alt='' /><br></br>
                    <ProgressBar animated variant='danger' now={props.statattack} label={`${props.statattack}`} />
                    <br></br>
                    {/* <p>Speed:</p> */}
                    <img src='https://cdn-icons-png.flaticon.com/512/7154/7154506.png' alt='' /><br></br>
                    <ProgressBar animated variant='info' now={props.statspeed} label={`${props.statspeed}`} />
                </div>
                <br></br>
                <Button variant="primary">Ajouter au combat</Button>
            </Card.Body>
        </Card>
    )
}

