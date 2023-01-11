import { Link, useNavigate } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
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
            <nav className="navbar bg-light">
                <div className="container">
                    <a className="navbar-brand" href="/">
                        <img src="https://cdn.discordapp.com/attachments/956119709361774592/1060200881016016966/logoMyPokeFight.png" alt="" width="70" height="70" className="d-inline-block align-text-top" />
                        <strong fontFamily="pokemon_classicregular,arial, sans-serif" className="title-pokefight">MyPokéFight</strong>
                        <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/25.gif"} className="poke-img" alt="{pokemon}" />

                    </a>


                    {/* eslint-disable-next-line */}
                    <Link to="/"><a className="nav-link active" aria-current="page">Liste Pokémon</a></Link>

                    {!token ?
                    <>
                        <Badge pill bg="warning" text="dark"><Link to="/login"><a className="nav-link active" aria-current="page">Login</a></Link></Badge>{' '}
                    </>
                    :
                    <>
                        {/* eslint-disable-next-line */}
                       
                        <Badge pill bg="warning" text="dark"><Link to="/pokedex"><a className="nav-link active" aria-current="page">Pokédex</a></Link> </Badge>{' '}
                        <Badge pill bg="warning" text="dark"><Link to="/login" onClick={Test}><a className="nav-link active" aria-current="page">Logout</a></Link></Badge>{' '}
                        <Link><a className="nav-link active" id="user" aria-current="page">
                            <img src={pokeavatar} alt=""/>
                            {username}
                            </a></Link>
                    </>}

                </div>
            </nav>
        </div>
    )
}