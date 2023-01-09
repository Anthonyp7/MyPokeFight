import { Link } from "react-router-dom";
import '../styles/Header.css';

export default function Header() {
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
                    {/* eslint-disable-next-line */}
                    <Link to="/pokedex"><a className="nav-link active" aria-current="page">Pokédex</a></Link>
                    {/* eslint-disable-next-line */}
                    <Link to="/login"><a className="nav-link active" aria-current="page">Login</a></Link>
                </div>
            </nav>
        </div>
    )
}