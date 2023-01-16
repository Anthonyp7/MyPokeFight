import { Link, useNavigate } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import '../styles/Header.css';

export default function Header() {
    const token = localStorage.getItem("Token");
    const username = localStorage.getItem("Username");
    const pokeavatar = localStorage.getItem("Poké-Avatar");
    const navigate = useNavigate();


    const Test = () => {
        localStorage.clear();
    }

    return (
        <div>
            <nav className="navbar bg-light">
                <div className="container">
                {/* eslint-disable */}
                    <Link to="/"><a className="navbar-brand">
                        <img src="https://cdn.discordapp.com/attachments/956119709361774592/1060200881016016966/logoMyPokeFight.png" alt="" width="70" height="70" />
                        <strong fontFamily="pokemon_classicregular,arial, sans-serif" className="title-pokefight">MyPokéFight</strong>
                        <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/25.gif"} className="poke-img" alt="{pokemon}" />

                    </a></Link>


                    <Badge pill bg="warning" text="dark"><Link to="/"><a className="nav-link active" aria-current="page">Liste Pokémon</a></Link></Badge>{' '}

                    {!token ?
                        <>
                            <Badge pill bg="warning" text="dark"><Link to="/login"><a className="nav-link active" aria-current="page">Login</a></Link></Badge>{' '}
                        </>
                        :
                        <>

                            <Badge pill bg="warning" text="dark"><Link to="/pokedex"><a className="nav-link active" aria-current="page">Pokédex</a></Link> </Badge>{' '}
                            <Badge pill bg="warning" text="dark"><Link to="/fight"><a className="nav-link active" aria-current="page">Fight</a></Link></Badge>{' '}
                            <Badge pill bg="warning" text="dark"><Link to="/login" onClick={Test}><a className="nav-link active" aria-current="page">Logout</a></Link></Badge>{' '}
                            <Link><a className="nav-link active" id="user" aria-current="page">
                                <img className="img-avatar" src={pokeavatar} alt="" />
                                {username}
                            </a></Link>
                        </>}

                </div>
            </nav>
        </div>
    )
}