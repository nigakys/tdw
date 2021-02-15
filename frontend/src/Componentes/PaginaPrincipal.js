import React from "react";
import api from "../api";
import { Link, Route, Switch, withRouter } from "react-router-dom";
import Produtos from "./Produtos";
import Dashboard from "./Dashboard";
import FormProduto from "./FormProduto";
import ProdutoInfo from "./ProdutoInfo";

class PaginaPrincipal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            produtos: []

        };
    }

    GetProdutos = () => {
        api.GetProdutos().then((data) => {
            this.setState({ produtos: data })
        })
    }

    addCarrinho = (produto) => {
        localStorage.setItem('cart', JSON.stringify(produto))
    }


    criarEditar = (event, info) => {
        var id;
        event.preventDefault();
        if (info.id == null) {
            this.state.produtos.push({
                nome: info.nome,
                preco: info.preco,
                tipo: info.tipo
            });
            id = info.id;
            api.criarProduto(this.state.produtos[this.state.produtos.length - 1])
        }

        else {
            this.state.produtos.map((pos) => {
                if (info.id == pos._id) {
                    pos.nome = info.nome;
                    pos.preco = info.preco;
                    pos.stock = info.stock;
                    pos.tamanho = info.tamanho;
                }
                api.upadateProduto(info.id, pos)

            })
        }
        this.props.history.push("/Dashboard")
    }

    MostrarProdutos = () => {
        if (this.state.produtos != null) {
            return (
                <div className="col">
                    {this.state.produtos.map((pos) => {
                        return (
                            <ProdutosInfo key={pos.id} produto={pos}></ProdutosInfo>
                        )
                    })}
                </div>
            )
        }
    }

    componentDidMount() {
        this.GetProdutos();
    }



    render() {
        return (
            <Switch>
                <Route exact path="/" render={props =>
                (
                    <div>
                        <section id="home" class="home">
                            <div class="home_container">
                                <div class="home_data"><h2>NOVOS</h2>
                                    <span>PRODUTOS</span>
                                </div>

                            </div>
                        </section>
                        <section id="special" class="special">
                            <div>
                                <h2>Produtos Especiais</h2>
                                <span>Ver todos</span>
                            </div>
                            <div class="card">
                                <div class="imgspe">

                                    {this.MostrarProdutos()}

                                </div>
                                <div class="contentBox">
                                    <h2>tenis</h2>
                                    <div class="size">
                                        <h3>Size</h3>
                                        <span>7</span>
                                        <span>8</span>
                                        <span>9</span>
                                        <span>10</span>
                                    </div>
                                    <div class="cor">
                                        <h3>Cor</h3>
                                        <span>7</span>
                                        <span>8</span>
                                        <span>9</span>
                                        <span>10</span>
                                    </div>

                                </div>
                            </div>


                        </section>

                        <section id="container_produtos" class="container_produtos">
                            <div> <h2>Novos Produtos</h2>
                                <span>ver todos </span>
                            </div>

                            <div class="div_produtos">
                                <div class="div_cadaProduto">


                                </div>

                            </div>
                        </section>
                        <section id="subscrever" class="subscrever">
                            <div><h2>Newsletter</h2><span>promocoes etc</span>
                            </div>
                        </section>
                    </div>
                )
                }></Route>
                <Route exact path="/Produtos" render={() => (
                    <Produtos></Produtos>
                )}>
                </Route>
                <Route exact path="/Dashboard" render={() =>
                (
                    <Dashboard
                        criarEditar={this.criarEditar}
                        produtos={this.state.produtos}>
                    </Dashboard>
                )}
                ></Route>

                <Route exact path="/Dashboard/add" render={props => (
                    <FormProduto
                        {...props}
                        produtos={this.state.produtos}
                        criarEditar={this.criarEditar}
                    ></FormProduto>
                )}
                ></Route>

                <Route exact path="/Dashboard/edit/:id" render={props =>
                    <FormProduto
                        {...props}
                        produtos={this.state.produtos}
                        criarEditar={this.criarEditar}>
                    </FormProduto>
                }
                />
                <Route exact path="/Dashboard/info/:id" render={props =>
                    <ProdutoInfo
                        {...props}
                        produtos={this.state.produtos}>
                    </ProdutoInfo>
                }
                />
            </Switch>
        )
    }
}

function ProdutosInfo(props) {
    return (
        <div className="col">
            <b>{props.produto.nome}</b>
            <b>{props.produto.preco}</b>
            <b>{props.produto.tipo}</b>
            <b>{props.produto.imagem}</b>
            <Link to="/Produtos"><button>ver</button></Link>
        </div>
    )
}


export default withRouter(PaginaPrincipal);