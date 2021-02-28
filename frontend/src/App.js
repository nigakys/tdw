import Header from './Componentes/Header';
import { BrowserRouter } from "react-router-dom";
import './ProdutoInfo.css';
import './PaginaPrincipal.css';
import './dashboard.css';
import './Login.css';
import "./Perfil.css";
import "./Footer.css";
import "./FormProduto.css"
import "react-toastify/dist/ReactToastify.css"
import Footer from "./Componentes/Footer";
import Content from './Componentes/Content';
import PaginaPrincipal from './Componentes/PaginaPrincipal';

function App() {
  if (localStorage.carrinho == undefined) {
    localStorage.setItem('carrinho', "[]")
  }
  return (
    <div>
      <BrowserRouter>
        <Header></Header>
        <div className="App">
          <PaginaPrincipal></PaginaPrincipal>
        </div>
        <Footer></Footer>
      </BrowserRouter>

    </div>
  );
}

export default App;
