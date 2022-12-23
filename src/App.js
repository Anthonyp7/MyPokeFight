import { Routes, Route} from "react-router-dom";
import ListePokemon from "./components/Liste";
import Pokedex from "./components/Pokedex";
import Header from "./components/Header";
import LocalStorage from "./components/LocalStorage";
// import Accueil from "./components/Accueil";

function App() {
  return (
    <div>
      <Header/>
      <Routes>
        {/* <Route path="/" element={<Accueil/>}/> */}
        <Route path="/" element={<ListePokemon/>}/>
        <Route path="/pokedex" element={<Pokedex/>}/>
        <Route path="/ls" element={<LocalStorage/>}/>
      </Routes>
      
    </div>
  );
}

export default App;