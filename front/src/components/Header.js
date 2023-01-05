import { Link } from "react-router-dom";
import '../styles/Header.css';

export default function Header () {
    return (
        <div>
            <nav class="navbar bg-light">
            <div class="container">
            <a class="navbar-brand" href="/">
      <img src="https://cdn.discordapp.com/attachments/956119709361774592/1060200881016016966/logoMyPokeFight.png" alt="" width="70" height="70" class="d-inline-block align-text-top"/>
            <strong font-family="pokemon_classicregular,arial, sans-serif" className="title-pokefight">MyPokéFight</strong>

    </a>
            

                {/* eslint-disable-next-line */}
                <Link to="/"><a class="nav-link active" aria-current="page">Liste Pokémon</a></Link>
                {/* eslint-disable-next-line */}
                <Link to="/pokedex"><a class="nav-link active" aria-current="page">Pokédex</a></Link>

                <Link to="/signup"><a class="nav-link active" aria-current="page">Sign Up</a></Link>
            </div>
            </nav>
        </div>
    )
}