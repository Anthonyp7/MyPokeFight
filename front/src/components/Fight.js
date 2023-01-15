import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import CardPokemon from "./Card";

import axios from "axios";

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

    // const [background, setBackground] = useState(["", "https://pm1.narvii.com/7243/f2fb9db8191078f72c8b98fee93155c56e6e8674r1-673-421v2_hq.jpg", "https://pm1.narvii.com/7243/b0945fed2f0cc9fa340c6e7deb851c14ddf53e30r1-575-530v2_hq.jpg", "https://pm1.narvii.com/7243/0d2736d705781ea116d08621abbfefae60a971c2r1-700-542v2_hq.jpg", "https://pm1.narvii.com/7243/00eaa3cfd5033ff306b23965e1c50b31577dd464r1-647-485v2_hq.jpg"]);
    

    const test = JSON.stringify(ls.getItem("PokeId"));
    // REMPLACEMENT DES CROCHETS
    const test2 = test.replace(/[\[\]]/g, "");
    // REMPLACEMENT DES GUILLEMETS
    const lspokemon = test2.replace(/["]/g, "").split(",") ;
    
    
    const Match = () => {
  
        axios.post('http://localhost:3080/matchmaking',
            {
                mode: 'no-cors',
            })
            
    }
    
    

    return(
        <>
            <h1 className="load-h1">Fight</h1>
            <br></br><br></br>
            {order.map((pokemon, index) => (
                            
                <div style={{marginLeft: "", display:"inline-block" , backgroundColor:"#00000070", border: "1px solid black "}}>
                    <img style={{width:"120%"}} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon}.png`}/>
                    
                </div>
            ))}
            <br></br> 

             
            {lspokemon.reverse().map((pokemon, index) => (
                <>
                
                    <CardPokemon 
                    img={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon}.png`}
                    id={pokemon}
                    isShiny="0"
                    fight={true}
                    // background={background[order.length]}
                    />
                    {console.log("bg nmbr", order.length)}
                    <Button style={{marginLeft: "-375px", marginTop:"300px"}} variant="primary" onClick={() => {
                        
                        
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
                            console.log("bg nmbr2", order.length);
                        }
                        
                    }}>Ajouter au combat </Button>


                </>
            ))}


            {/* SI 4 POKEMONS SONT SELECTIONNES */}
            {order.length === 4 ?
            <Button style={{marginLeft: "930px", marginTop:"150px", display:"inline-flex", textAlign:"center"}} variant="danger" size="lg">Fight</Button>
            :
            <>
            <Button style={{marginLeft: "930px", marginTop:"150px", display:"inline-flex", textAlign:"center"}} variant="danger" size="lg" disabled>Fight</Button>
            </>}
            

                     
            {/* ERREUR CHOIX FIGHT */}
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