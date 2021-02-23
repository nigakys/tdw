import React from "react";
import api from "../api";
import { Link, NavLink, Route, Switch, withRouter } from "react-router-dom";
import Produtos from "./Produtos";
import Dashboard from "./Dashboard";
import FormProduto from "./FormProduto";
import ProdutoInfo from "./ProdutoInfo";
import Login from "./Login";
import Perfil from "./Perfil"

class PaginaPrincipal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      produtos: [],
      especiais: []
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

  tenis = () => {
    return (<>
      <span>7</span><br></br>
      <span>8</span><br></br>
      <span>9</span><br></br>
      <span>10</span>
    </>
    )
  }

  casaco = () => {
    return (<>
      <span>s</span><br></br>
      <span>xs</span><br></br>
      <span>m</span><br></br>
      <span>l</span>
    </>
    )
  }

  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <div>
              <section class="home">
                <div className="home_container">
                  <h1 className="tit1">NOVOS</h1>
                  <h3 className="tit2">PRODUTOS</h3>
                  <NavLink to="/Produtos">
                    {" "}
                    <button className="buttonHome">Ver Produtos</button>
                  </NavLink>
                </div>
                <div className="home_data">
                  <img className="homeimg" src="../imagens/home.png"></img>
                </div>
              </section>
              <section class="special">
                <div className="headerSpecial">
                  <h2>Produtos Especiais</h2>
                  </div>   
                  <div class="div_produtos">
                  {this.state.produtos.map((pos) => {
                    if (pos.especial) {
                      return (
                        <div>
                          <div class="container1">
                            <div className="card">
                              <div className="imgbox">
                                <img
                                  src={
                                    "http://localhost:4000/files/" + pos.imagem
                                  }
                                ></img>
                              </div>
                              <div className="contentbx">
                                <h3>{pos.nome}</h3>
                                <div class="size">
                                
                                </div>
                                <div class="cor">
                                  <h3>Cor</h3>
                                  <span></span>
                                  <span></span>
                                  <span></span>
                                  <span></span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </section>

              <section class="container_produtos">
                <div className="headerSpecial">
                  <h2>Novos Produtos</h2>
                  <NavLink to="/Produtos">
                    <span>Ver todos</span>
                  </NavLink>
                </div>
                <div class="div_produtos">
                  {this.state.produtos.map((pos) => {
                    return (
                      <div>
                        <div class="div_cadaProduto">
                          <img
                            onMouseEnter={() => MouseEnter()}
                            onMouseLeave={() => MouseLeave()}
                            src={"http://localhost:4000/files/" + pos.imagem}
                          ></img>
                          <div className="infoProduto"><div>{pos.nome}</div>
                          <div className="precoProduto">{pos.preco + '$'}</div></div>
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
          render={() => <Produtos
            produtos={this.state.produtos}
            MouseEnter={this.MouseEnter}
            MouseLeave={this.MouseLeave}></Produtos>}
        ></Route>

        <Route exact path="/Login" render={() => <Login></Login>}></Route>
        <Route exact path="/Perfil" render={() => <Perfil></Perfil>}></Route>
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

function MouseEnter() {
  var color = ["#86e6f9", "#DED87F", "#B25FE8"];
  document.querySelectorAll(".div_cadaProduto img").forEach((item) => {
    item.addEventListener("mouseenter", () => {
      item.style.backgroundColor = color[sessionStorage.getItem("cor")];
    });
  });
}

function MouseLeave() {
  document.querySelectorAll(".div_cadaProduto img ").forEach((item) => {
    item.addEventListener("mouseleave", () => {
      item.style.backgroundColor = "#e6e0e0";
    });
  });
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
