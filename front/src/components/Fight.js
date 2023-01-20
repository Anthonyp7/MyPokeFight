import { useState } from "react";
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

    const [heights, setHeights] = useState(window.innerHeight - 116 + "px");
    const [widths, setWidths] = useState(window.innerWidth + "px");


    const test = JSON.stringify(ls.getItem("PokeId"));
    // REMPLACEMENT DES CROCHETS
    const test2 = test.replace(/[\[\]]/g, "");
    // REMPLACEMENT DES GUILLEMETS
    const lspokemon = test2.replace(/["]/g, "").split(",");


    return (
        <div style={{ backgroundImage: "url(https://wallpapercave.com/wp/wp11053803.jpg)", height:`${heights}`, width:`${widths}`, backgroundSize:"cover" }}>
            <h1 className="load-h1">Fight</h1>
            <br></br>
            {order.map((pokemon, index) => (

                <div style={{ marginLeft: "", display: "inline-block", backgroundColor: "#00000070", border: "1px solid black " }}>
                    <img style={{ width: "120%" }} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon}.png`} alt="" />

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

                    />
                    <Button style={{ marginLeft: "-375px", marginTop: "300px" }} variant="primary" onClick={() => {

                        // SI + DE 4 POKEMONS SONT CHOISI
                        if (order.length >= 4) {
                            setShowError2(true);
                        }
                        // SI POKEMON DEJA CHOISI
                        else if (order.includes(pokemon)) {
                            setShowError2(true);
                        }
                        else {
                            setTab(order.push(pokemon));
                            ls.setItem("Order", JSON.stringify(order));
                        }

                    }}>Ajouter au combat </Button>


                </>
            ))}


            {/* SI 4 POKEMONS SONT SELECTIONNES */}
            {order.length === 4 ?
                <Button style={{ marginLeft: "48%" , marginTop: "20px", display: "inline-flex", textAlign: "center" }} variant="danger" size="lg">Fight</Button>
                :
                <>
                    <Button style={{ marginLeft: "48%", marginTop: "20px", display: "inline-flex", textAlign: "center" }} variant="danger" size="lg" disabled>Fight</Button>
                </>
            }



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

        </div>
    )
}