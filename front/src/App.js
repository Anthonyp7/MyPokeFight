import { Routes, Route} from "react-router-dom";
import ListePokemon from "./components/Liste";
import Pokedex from "./components/Pokedex";
import Header from "./components/Header";
import SignUp from "./components/SignUp";
// import Accueil from "./components/Accueil";

function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<ListePokemon/>}/>
        <Route path="/pokedex" element={<Pokedex/>}/>
        <Route path="/signup" element={<SignUp/>}/>
      </Routes>
      
    </div>
  );
}

export default App;