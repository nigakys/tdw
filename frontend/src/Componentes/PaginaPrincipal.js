import React from "react";
import api from "../shared/api";
import { Link, NavLink, Route, Switch, withRouter } from "react-router-dom";
import Produtos from "./Produtos";
import Dashboard from "./Dashboard";
import FormProduto from "./FormProduto";
import ProdutoInfo from "./ProdutoInfo";
import FormVariantes from "./FormVariantes";
import Login from "./Login";
import Perfil from "./Perfil";
import Carrinho from "./Carrinho"
import Produto from "./Produto";
import Encomendas from "./Encomendas";
import ProdutosMasculinos from './ProdutosMasculinos';
import ProdutosFemininos from './ProdutosFemininos';
import { toast } from 'react-toastify'
import cores from "../shared/cores"

toast.configure()

class PaginaPrincipal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      produtos: [],
      especiais: [],
      variantes: [],
      cores: cores,
      corSelected: "",
    };
  }

  GetProdutos = () => {
    api.GetProdutos().then((data) => {
      this.setState({ produtos: data });
    });
  };

  alterarVisibilidade = (produto) => {
    this.setState({ produtos: produto })
  }

  criarEditar = (event, produto, imagem) => {
    var id;
    event.preventDefault();
    var imagemForm = new FormData();
    imagemForm.append("file", imagem);
    var nomeImagem;
    imagem == null ? (nomeImagem = "") : (nomeImagem = imagem.name);
    var data = new Date();
    if (produto.id === "") {
      this.state.produtos.push({
        tipo: produto.tipo,
        nome: produto.nome,
        ref: produto.ref,
        genero: produto.genero,
        preco: produto.preco,
        especial: produto.especial,
        dataAdicionado: data.toUTCString(),
        imagem: nomeImagem,
      });
      id = produto.id;
      api.criarProduto(this.state.produtos[this.state.produtos.length - 1], imagemForm);

      this.props.history.push("/Dashboard/variante/add/" + produto.ref);
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
          pos.genero = produto.genero;
          api.updateProduto(produto.id, pos, imagemForm);
        }
        this.props.history.push("/Dashboard");
      });
    }
  };

  MouseEnter = () => {
    var color = ["rgba(172,111,226)", "rgba(143,107,244)", "rgba(104,107,236)"];
    document.querySelectorAll(".div_cadaProduto img").forEach((item) => {
      item.addEventListener("mouseenter", () => {
        item.style.backgroundColor = color[sessionStorage.getItem("cor")];
      });
    });
  }

  MouseLeave = () => {
    document.querySelectorAll(".div_cadaProduto img ").forEach((item) => {
      item.addEventListener("mouseleave", () => {
        item.style.backgroundColor = "#e6e0e0";
      });
    });
  }

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
    if (sessionStorage.verified == "false") {
      toast.warning('Para poder utilizar a sua conta tem de verificar o email', { position: toast.POSITION.TOP_CENTER })
    }
    api.GetVariantes().then((data) => {
      this.setState({ variantes: data })
    })
  }

  corSelected = (cor) => {
    this.setState({ corSelected: cor.cor })
  }

  tenis = () => {
    return (
      <>
        <span>7</span>
        <br></br>
        <span>8</span>
        <br></br>
        <span>9</span>
        <br></br>
        <span>10</span>
      </>
    );
  };

  casaco = () => {
    return (
      <>
        <span>s</span>
        <br></br>
        <span>xs</span>
        <br></br>
        <span>m</span>
        <br></br>
        <span>l</span>
      </>
    );
  };

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
                    <button className="buttonHome buttonHome1">Ver Produtos</button>
                  </NavLink>
                </div>
                <div className="home_data">
                  <img className="homeimg" src="../imagens/home.png"></img>
                </div>
              </section>
              <section class="special">
                <div className="headerSpecial">
                  <h2 className="h22">Produtos Especiais</h2>
                </div>
                <div class="div_produtos">
                  {this.state.produtos.map((pos) => {
                    if (pos.especial && pos.visibilidade) {
                      return (
                        <div>
                          <div class="container1">
                            <div className="card">

                              {this.state.variantes.map((variante) => {
                                if (this.state.corSelected === "") {
                                  this.setState({ corSelected: variante.cor })
                                }
                                if (this.state.corSelected === variante.cor && variante.ref === pos.ref) {
                                  return (
                                    <><div className="imgbox">
                                      <img
                                        src={
                                          "http://localhost:4000/files/" + variante.imagens[0]
                                        } alt="erro"
                                      ></img>
                                    </div>
                                      <div className="contentbx">
                                      <Link style={{ textDecoration: "none" }} to={"/Produto/" + pos.ref}><h3>{pos.nome}</h3></Link>
                                        <div class="size"></div>
                                       
                                        <div class="cor">
                                          {this.state.cores.map((cor) => {
                                            return (
                                              <>
                                                {this.state.variantes.map((variante) => {
                                                  if (variante.cor === cor.cor && pos.ref === variante.ref)
                                                    return (
                                                      <>
                                                        <div  onClick={() => this.corSelected(cor)} style={{ width: "20px", height: "20px", borderRadius: "50%", backgroundColor: cor.hex,marginTop:"30px",marginRight:"10px",cursor:"pointer"}}></div>
                                                      </>
                                                    )
                                                })}
                                              </>
                                            )
                                          })}
                                        </div>
                                      </div>
                                    </>
                                  )
                                }
                              })}
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </section>

              <section class="container_produtos">
                <div className="headerSpecial"><div>
                  <h2>Novos Produtos</h2><div>
                  </div>
                  <NavLink to="/Produtos">
                    <button className="buttonHome buttonHome2">Ver Todos</button>
                  </NavLink>
                </div>
                </div>
                <div class="div_produtos">
                  {this.state.produtos.map((pos) => {
                    if (pos.visibilidade === true) {
                      return (
                        <div>
                          <div class="div_cadaProduto">
                            <img
                              onMouseEnter={() => this.MouseEnter()}
                              onMouseLeave={() => this.MouseLeave()}
                              src={"http://localhost:4000/files/" + pos.imagem}
                            ></img>
                            <div className="infoProduto">
                              <Link style={{ textDecoration: "none" }} to={"/Produto/" + pos.ref}><div className="nomeProduto">{pos.nome}</div></Link>
                              <div className="precoProduto">
                                {pos.preco + " €"}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </section>

            </div>

          )}
        ></Route>
        <Route
          exact
          path="/Produtos"
          render={() => (
            <Produtos
              produtos={this.state.produtos}
              MouseEnter={this.MouseEnter}
              MouseLeave={this.MouseLeave}
            ></Produtos>
          )}
        ></Route>
        <Route
          exact
          path="/ProdutosMasculinos"
          render={() => (
            <ProdutosMasculinos
              produtos={this.state.produtos}
              MouseEnter={this.MouseEnter}
              MouseLeave={this.MouseLeave}
            ></ProdutosMasculinos>
          )}
        ></Route>
        <Route
          exact
          path="/ProdutosFemininos"
          render={() => (
            <ProdutosFemininos
              produtos={this.state.produtos}
              MouseEnter={this.MouseEnter}
              MouseLeave={this.MouseLeave}
            ></ProdutosFemininos>
          )}
        ></Route>
        <Route exact path="/Login" render={() => <Login></Login>}></Route>
        <Route exact path="/Perfil" render={() => <Perfil></Perfil>}></Route>
        <Route exact path="/Encomendas/:id" render={() => <Encomendas></Encomendas>}></Route>
        <Route exact path="/Carrinho" render={() => <Carrinho></Carrinho>}></Route>
        <Route exact path="/Produto/:id" render={(props) => <Produto {...props} produtos={this.state.produtos}></Produto>}></Route>
        {sessionStorage.isAdmin === "true" ?
          <>
            <Route exact path="/Dashboard" render={() => (
              <Dashboard
                alterarVisibilidade={this.alterarVisibilidade}
                criarEditar={this.criarEditar}
                produtos={this.state.produtos}
              ></Dashboard>
            )}
            ></Route>

            <Route exact path="/Dashboard/add" render={(props) => (
              <FormProduto
                {...props}
                produtos={this.state.produtos}
                criarEditar={this.criarEditar}
              ></FormProduto>
            )}
            ></Route>

            <Route exact path="/Dashboard/edit/:id" render={(props) => (
              <FormProduto
                {...props}
                produtos={this.state.produtos}
                criarEditar={this.criarEditar}
              ></FormProduto>
            )} />

            <Route exact path="/Dashboard/info/:id" render={(props) => (
              <ProdutoInfo
                {...props}
                produtos={this.state.produtos}
              ></ProdutoInfo>
            )} />
            <Route exact path="/Dashboard/variante/add/:id" render={(props) => (
              <FormVariantes
                {...props}
                produtos={this.state.produtos}
              ></FormVariantes>
            )} />

          </> :
          <Route exact path="/Dashboard" render={() => (window.location.href = "/")}
          ></Route>}
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
