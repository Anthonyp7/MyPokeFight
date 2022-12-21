import { Link } from "react-router-dom";
import '../styles/Header.css';

export default function Header () {
    return (
        <div>
            <nav class="navbar bg-light">
            <div class="container">
            <a class="navbar-brand" href="#">
      <img src="https://th.bing.com/th/id/R.a8ac405db924134aac996c1dee32d04b?rik=meWkR9FFbA%2fh4A&riu=http%3a%2f%2fpngimg.com%2fuploads%2fpokeball%2fpokeball_PNG8.png&ehk=Z9BCy3bFkiQjrYBDTFWVzy6mUx2cnp1%2bJDIV7zre0dI%3d&risl=&pid=ImgRaw&r=0"  width="25" height="25" class="d-inline-block align-text-top"/>
      PokeAPI
    </a>
            

            {/* <nav class="nav nav-pills nav-justified"> */}
                {/* eslint-disable-next-line */}
                <Link to="/"><a class="nav-link active" aria-current="page">Accueil</a></Link>
                {/* eslint-disable-next-line */}
                <Link to="/liste"><a class="nav-link active" aria-current="page">Liste Pokémon</a></Link>
                <Link to="/pokedex"><a class="nav-link active" aria-current="page">Pokédex</a></Link>
                {/* <a class="nav-link" href="#">Much longer nav link</a> */}
            {/* </nav> */}
            </div>
            </nav>
        </div>
    )
}