import React from "react";
import api from "../api";
import { Link, NavLink, Route, Switch, withRouter } from "react-router-dom";
import Produtos from "./Produtos";
import Dashboard from "./Dashboard";
import FormProduto from "./FormProduto";
import ProdutoInfo from "./ProdutoInfo";

class PaginaPrincipal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      produtos: [],
    };
  }

  GetProdutos = () => {
    api.GetProdutos().then((data) => {
      this.setState({ produtos: data });
    });
  };

  addCarrinho = (produto) => {
    localStorage.setItem("cart", JSON.stringify(produto));
  };

  criarEditar = (event, produto, imagem) => {
    var id;
    event.preventDefault();
    var imagemForm = new FormData();
    imagemForm.append("file", imagem);
    var nomeImagem;
    imagem == null ? (nomeImagem = "") : (nomeImagem = imagem.name);
    var data = new Date();

    if (produto.id == null) {
      this.state.produtos.push({
        tipo: produto.tipo,
        nome: produto.nome,
        ref: produto.ref,
        preco: produto.preco,
        especial: produto.especial,
        dataAdicionado: data.toUTCString(),
        imagem: nomeImagem,
      });
      id = produto.id;
      api.criarProduto(
        this.state.produtos[this.state.produtos.length - 1],
        imagemForm
      );
    } else {
      this.state.produtos.map((pos) => {
        if (imagem == null) {
          nomeImagem = pos.imagem;
        } else {
          nomeImagem = imagem.name;
        }
        if (produto.id == pos._id) {
          pos.tipo = produto.tipo;
          pos.nome = produto.nome;
          pos.ref = produto.ref;
          pos.preco = produto.preco;
          pos.especial = produto.especial;
          pos.dataAdicionado = produto.dataAdicionado;
          pos.imagem = nomeImagem;
        }
        api.updateProduto(produto.id, pos, imagemForm);
      });
    }
    this.props.history.push("/Dashboard");
  };

  MostrarProdutos = () => {
    if (this.state.produtos != null) {
      return (
        <div className="col">
          {this.state.produtos.map((pos) => {
            return <ProdutosInfo key={pos.id} produto={pos}></ProdutosInfo>;
          })}
        </div>
      );
    }
  };

  componentDidMount() {
    this.GetProdutos();
  }

  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <div>
              <section  class="home">
                <div className="home_container">
                  <h1 className="tit1">NOVOS</h1>
                  <h3 className="tit2">PRODUTOS</h3>
                <NavLink to="/Produtos"> <button className="buttonHome">Ver Produtos</button></NavLink> 
                </div>
                <div className="home_data">
                  <img className="homeimg" src="../imagens/home.png"></img>
                </div>
              </section>
              <section  class="special">
                <div>
                  <h2>Produtos Especiais</h2>
                  <span>Ver todos</span>
                </div>

                <div class="card">
                  <div class="imgspe"></div>
                  <div class="contentBox">
                   {this.MostrarProdutos()}
                    <div class="size">
                      <h3>Size</h3>
                      <span>7</span><br></br>
                      <span>8</span><br></br>
                      <span>9</span><br></br>
                      <span>10</span>
                    </div>
                    <div class="cor">
                      <h3>Cor</h3>
                      <span>7</span><br></br>
                      <span>8</span><br></br>
                      <span>9</span><br></br>
                      <span>10</span>
                    </div>
                  </div>
                </div>
              </section>

              <section class="container_produtos">
                <div>
                  {" "}
                  <h2>Novos Produtos</h2>
                  <span>ver todos </span>
                </div>
                <div class="div_produtos">
                  {this.state.produtos.map((pos) => {
                    return (
                      <div>
                        <div class="div_cadaProduto">
                          <img
                            src={"http://localhost:4000/files/" + pos.imagem}
                          ></img>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
              <section id="subscrever" class="subscrever">
                <div>
                  <h2>Newsletter</h2>
                  <span>promocoes etc</span>
                </div>
              </section>
            </div>
          )}
        ></Route>
        <Route
          exact
          path="/Produtos"
          render={() => <Produtos></Produtos>}
        ></Route>
        <Route
          exact
          path="/Dashboard"
          render={() => (
            <Dashboard
              criarEditar={this.criarEditar}
              produtos={this.state.produtos}
            ></Dashboard>
          )}
        ></Route>

        <Route
          exact
          path="/Dashboard/add"
          render={(props) => (
            <FormProduto
              {...props}
              produtos={this.state.produtos}
              criarEditar={this.criarEditar}
            ></FormProduto>
          )}
        ></Route>

        <Route
          exact
          path="/Dashboard/edit/:id"
          render={(props) => (
            <FormProduto
              {...props}
              produtos={this.state.produtos}
              criarEditar={this.criarEditar}
            ></FormProduto>
          )}
        />
        <Route
          exact
          path="/Dashboard/info/:id"
          render={(props) => (
            <ProdutoInfo
              {...props}
              produtos={this.state.produtos}
            ></ProdutoInfo>
          )}
        />
      </Switch>
    );
  }
}

function ProdutosInfo(props) {
  return (
    <div className="col">
      <b>{props.produto.nome}</b>
      <b>{props.produto.preco}</b>
      <b>{props.produto.tipo}</b>
      <b>
        <img src={"http://localhost:4000/files/" + props.produto.imagem}></img>
      </b>
      <Link to="/Produtos">
        <button>ver</button>
      </Link>
    </div>
  );
}

export default withRouter(PaginaPrincipal);
