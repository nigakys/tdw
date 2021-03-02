import React from 'react';
import api from "../shared/api"
import cores from "../shared/cores"
import { withRouter } from "react-router-dom";

class Carrinho extends React.Component {
    constructor(props) {
        super(props);

        const carro = JSON.parse(localStorage.getItem('carrinho'));

        this.state = {
            carrinho: carro,
            produtos: [],
            produtoscarrinho: [],
            cores: cores,
            total: 0,
            variantes: {},
            user: {},
            moradaValid: true,
        };
    }

    componentDidMount() {
        api.GetProdutos().then((data) => {
            this.setState({ produtos: data })
            var produtos = JSON.parse(JSON.stringify(data));
            var carrinho = this.state.carrinho
            this.carrinhoParse(produtos, carrinho, "adicionar");
        })

        api.GetVariantes().then((data) => {
            this.setState({ variantes: data })
        })

        api.GetUser(sessionStorage.username).then((data) => {
            this.setState({ user: data })
            this.checkMorada();
        })
    }

    carrinhoParse = (produtos, carrinho, tipo) => {
        if (carrinho.length != 0) {
            var produtosCarrinho = "[";
            for (let i = 0; i < produtos.length; i++) {
                for (let k = 0; k < carrinho.length; k++) {
                    if (produtos[i].ref === carrinho[k].ref) {
                        produtosCarrinho += '{"produto" :'
                        produtosCarrinho += JSON.stringify(produtos[i])
                        produtosCarrinho = produtosCarrinho.slice(0, -1)
                        produtosCarrinho += '}, "variante" :'
                        produtosCarrinho += JSON.stringify(carrinho[k])
                        produtosCarrinho += "},"
                    }
                }
            }
            produtosCarrinho = produtosCarrinho.slice(0, -1)
            produtosCarrinho += "]"
            var preco = this.state.total;
            this.setState({ produtoscarrinho: JSON.parse(produtosCarrinho) })
            if (tipo === "adicionar") {
                this.state.produtoscarrinho.map((item) => {
                    preco += item.produto.preco * item.variante.quantidade
                })
            }
            else {
                this.state.produtoscarrinho.map((item) => {
                    preco = item.produto.preco * item.variante.quantidade
                })
            }
            preco = preco.toFixed(2);
            this.setState({ total: preco })
        }

    }

    checkMorada = () => {
        if (this.state.user != null) {
            var morada = this.state.user.morada;
            if (morada != undefined) {
                if (morada.cidade.length === 0 || morada.codPostal.length === 0 || morada.contacto.length === 0 || morada.distrito.length === 0 || morada.ruaCasa.length === 0) {
                    this.setState({ moradaValid: false })
                }
            }
        }
    }

    removerCarrinho = (event, id) => {
        event.preventDefault();
        var cart = this.state.carrinho;
        var produto = this.state.carrinho.find(x => x._id === id)
        cart.splice(cart.indexOf(produto), 1);
        this.setState({ carrinho: cart })
        api.GetProdutos().then((data) => {
            this.setState({ produtos: data })
            var produtos = JSON.parse(JSON.stringify(data));
            var carrinho = this.state.carrinho
            this.carrinhoParse(produtos, carrinho, "remover");
        })
        var count = 0;
        for (let index = 0; index < cart.length; index++) {
            count += cart[index].quantidade;
        }
        localStorage.setItem('carrinho', JSON.stringify(cart))
        document.getElementById('cartCounter').innerHTML = count
    }

    finalizarCompra = () => {
        var encomenda = {};
        encomenda.userId = sessionStorage.userid;
        encomenda.produtos = this.state.produtoscarrinho;
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = dd + '/' + mm + '/' + yyyy;
        encomenda.dataEncomenda = today;
        encomenda.custo = this.state.total;
        localStorage.setItem('carrinho', "[]")
        api.criarEncomenda(encomenda);
        var items = [];
        var quantidade = [];
        var stock = { "stock": 0 }
        var variantes = this.state.variantes;

        this.state.produtoscarrinho.map((pos) => {
            items.push(pos.variante._id)
            quantidade.push(pos.variante.quantidade)
        })

        for (let index = 0; index < items.length; index++) {
            var stockatual = variantes.find(x => x._id === items[index]).stock;
            stock.stock = stockatual - quantidade[index];
            api.updateVariante(items[index], stock)
        }

        window.location.href = "/";
    }

    render() {
        return (
            <div className="containerCarrinho">
                <div className="Content">
                    <table style={{ width: "100%" }} className="table">
                        <thead>
                            <tr style={{ textAlign: "left" }} >
                                <td><b>Artigo</b></td>
                                <td><b>Cor</b></td>
                                <td><b>Medida</b></td>
                                <td><b>Quantidade</b></td>
                                <td><b>Valor</b></td>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.cores.map((cor) => {
                                    return (
                                        this.state.produtoscarrinho.map((item, i) => {
                                            if (cor.cor === item.variante.cor) {
                                                return (
                                                    <tr className="tr1" key={i}>
                                                        <td style={{ display: "flex" }} >
                                                            {console.log(this.state.produtoscarrinho)}
                                                            <img style={{ width: "40px", height: "40px" }} src={"http://localhost:4000/files/" + item.variante.imagens[0]}></img>
                                                            <span style={{ paddingTop: "0px", fontSize: "21px", marginLeft: "20px" }}>
                                                                {item.produto.nome}
                                                                <p style={{ fontSize: "12px", paddingTop: "3px" }}>{item.produto.ref}</p>
                                                            </span>
                                                            <img style={{width:"50px",height:"50px",cursor:"pointer",}} src="http://localhost:4000/files/trash.png" onClick={(e) => this.removerCarrinho(e, item.variante._id)}></img>
                                                        </td>
                                                        <td><div style={{ width: "20px", height: "20px", borderRadius: "50%", backgroundColor: cor.hex }}></div></td>
                                                        <td>{item.variante.tamanho}</td>
                                                        <td>{item.variante.quantidade}</td>
                                                        <td>{item.produto.preco}€ x {item.variante.quantidade} = {item.produto.preco * item.variante.quantidade}€</td>
                                                    </tr>
                                                )
                                            }
                                        })
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className="Content">
                    Custo Total: {this.state.total} €
                    {this.state.moradaValid === false ? <span style={{ color: "red", marginLeft: "20px" }}>Tem de definir uma morada de entrega no seu perfil para fazer a encomenda</span> : null}
                    {sessionStorage.userid != null && sessionStorage.verified === "true" ?

                        <>
                            {this.state.moradaValid === true ?
                                <>
                                    <button style={{ marginLeft: "10px", background: "black", color: "white",cursor:"pointer"}} onClick={() => this.finalizarCompra()}>Efetuar pagamento</button>
                                </>
                                : null
                            }
                        </>
                        : <>
                            <span style={{ color: "red", marginLeft: "20px" }}>Tem de ter uma conta conectada com o email verificado para poder fazer uma compra</span>
                        </>
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(Carrinho);