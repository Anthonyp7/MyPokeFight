import { Routes, Route} from "react-router-dom";
import ListePokemon from "./components/Liste";
import Header from "./components/Header";
import Accueil from "./components/Accueil";

function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<Accueil/>}/>
        <Route path="/liste" element={<ListePokemon/>}/>
      </Routes>
      
    </div>
  );
}

export default App;