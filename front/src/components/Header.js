import { Link, useNavigate } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import '../styles/Header.css';

export default function Header() {
    const token = localStorage.getItem("Token");
    const username = localStorage.getItem("Username");
    const pokeavatar = localStorage.getItem("Poké-Avatar");
    const navigate = useNavigate();


    const Test = () => {
        // localStorage.removeItem("Token");
        // localStorage.removeItem("Username");
        // localStorage.removeItem("Poké-Avatar");
        localStorage.clear();
        // navigate('/login')
    }

    return (
        <div>

            {/* <Navbar>
                <Container>
                    <Navbar.Brand href="#home">
                        <img src="https://cdn.discordapp.com/attachments/956119709361774592/1060200881016016966/logoMyPokeFight.png" alt="" width="70" height="70" className="d-inline-block align-text-top" />
                        <strong fontFamily="pokemon_classicregular,arial, sans-serif" className="title-pokefight">MyPokéFight</strong>
                        <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/25.gif"} className="poke-img" alt="{pokemon}" />
                    </Navbar.Brand>
                    
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                    <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Signed in as: <a href="#login">Mark Otto</a>
                    </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar> */}



            <nav className="navbar bg-light">
                <div className="container">
                <Link to="/"><a className="navbar-brand" href="/">
                        <img src="https://cdn.discordapp.com/attachments/956119709361774592/1060200881016016966/logoMyPokeFight.png" alt="" width="70" height="70" />
                        <strong fontFamily="pokemon_classicregular,arial, sans-serif" className="title-pokefight">MyPokéFight</strong>
                        <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/25.gif"} className="poke-img" alt="{pokemon}" />

                    </a></Link>


                    {/* eslint-disable-next-line */}
                    <Badge pill bg="warning" text="dark"><Link to="/"><a className="nav-link active" aria-current="page">Liste Pokémon</a></Link></Badge>{' '}

                    {!token ?
                    <>
                        <Badge pill bg="warning" text="dark"><Link to="/login"><a className="nav-link active" aria-current="page">Login</a></Link></Badge>{' '}
                    </>
                    :
                    <>
                        {/* eslint-disable-next-line */}
                       
                        <Badge pill bg="warning" text="dark"><Link to="/pokedex"><a className="nav-link active" aria-current="page">Pokédex</a></Link> </Badge>{' '}
                        <Badge pill bg="warning" text="dark"><Link to="/fight"><a className="nav-link active" aria-current="page">Fight</a></Link></Badge>{' '}
                        <Badge pill bg="warning" text="dark"><Link to="/login" onClick={Test}><a className="nav-link active" aria-current="page">Logout</a></Link></Badge>{' '}
                        <Link><a className="nav-link active" id="user" aria-current="page">
                            <img className="img-avatar" src={pokeavatar} alt=""/>
                            {username}
                            </a></Link>
                    </>}

                </div>
            </nav>
        </div>
    )
}