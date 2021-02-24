import Header from './Componentes/Header';
import { BrowserRouter } from "react-router-dom";
import './App.css';
import './PaginaPrincipal.css';
import './dashboard.css';
import'./Login.css';
import"./Perfil.css";
import Footer from "./Componentes/Footer";
import Content from './Componentes/Content';
import PaginaPrincipal from './Componentes/PaginaPrincipal';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header></Header>
     
      <PaginaPrincipal></PaginaPrincipal>
      <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
