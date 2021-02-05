import logo from './logo.svg';
import Header from './Componentes/Header';
import PaginaPrincipal from './Componentes/PaginaPrincipal';
import Produtos from './Componentes/Produtos';
import { BrowserRouter } from "react-router-dom";

import './App.css';
import Content from './Componentes/Content';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header></Header>
      <Content></Content>
      </BrowserRouter>
   
      
    </div>
  );
}

export default App;
