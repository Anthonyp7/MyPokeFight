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

export default function CardPokemon(props) {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    return(
        <Card {...props} style={{ width: '18rem' }}>
            <Card.Img variant="top" src={props.img}/>
            <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    )
}

