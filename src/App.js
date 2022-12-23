import { Routes, Route} from "react-router-dom";
import ListePokemon from "./components/Liste";
import Pokedex from "./components/Pokedex";
import Header from "./components/Header";
// import Accueil from "./components/Accueil";

function App() {
  return (
    <div>
      <Header/>
      <Routes>
        {/* <Route path="/" element={<Accueil/>}/> */}
        <Route path="/" element={<ListePokemon/>}/>
        <Route path="/pokedex" element={<Pokedex/>}/>
      </Routes>
      
    </div>
  );
}

export default App;