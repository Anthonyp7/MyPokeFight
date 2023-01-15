import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import CardPokemon from "./Card";

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import { ToastContainer } from "react-bootstrap";

    

export default function Fight(props) {

    const ls = localStorage;
    const [order, setOrder] = useState([]);
    const [tab, setTab] = useState([]);

    const [showError, setShowError] = useState(false);
    const [showError2, setShowError2] = useState(false);
    
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
                        
                        
                        if(order.length >= 4){
                            setShowError2(true);
                        }
                        else if (order.includes(pokemon)){
                            setShowError2(true);
                        }
                        else{
                            setTab(order.push(pokemon));
                            ls.setItem("Order", JSON.stringify(order));
                            // console.log("order2", order);
                        }
                        
                    }}>Ajouter au combat</Button>
                </>
            ))}

            <Row>
                <Col xs={6}>
                    <ToastContainer position="bottom-end">
                    <Toast onClose={() => setShowError(false)} show={showError} delay={3000} autohide>
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                        <strong className="me-auto">Bootstrap</strong>
                        <small>11 mins ago</small>
                    </Toast.Header>
                    <Toast.Body>Error</Toast.Body>
                    </Toast>

                    <Toast bg="danger" onClose={() => setShowError2(false)} show={showError2} delay={3000} autohide>
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                        <strong className="me-auto">MyPokéFight</strong>
                        <small>Erreur</small>
                    </Toast.Header>
                    <Toast.Body>Vous ne pouvez pas sélectionner 2 fois un même Pokemon !</Toast.Body>
                    </Toast>
                    </ToastContainer>
                </Col>
            </Row>
            
        </>
    )
}