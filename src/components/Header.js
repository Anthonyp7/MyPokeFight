import { Link } from "react-router-dom";
import '../styles/Header.css';

export default function Header () {
    return (
        <div>
            <Link to="/"><button type="button" id="btn-accueil" class="btn btn-success btn-lg">Accueil</button></Link>
            <Link to="/liste"><button type="button" id="btn-liste" class="btn btn-danger btn-lg">Liste Pokémon</button></Link>
            
        </div>
    )
}