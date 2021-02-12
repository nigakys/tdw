import Header from './Componentes/Header';
import { BrowserRouter } from "react-router-dom";
import './App.css';
import './PaginaPrincipal.css';
import Content from './Componentes/Content';
import PaginaPrincipal from './Componentes/PaginaPrincipal';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header></Header>
      <PaginaPrincipal></PaginaPrincipal>
      </BrowserRouter>
   
      
    </div>
  );
}

export default App;
