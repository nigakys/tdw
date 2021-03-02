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
        };
    }

    componentDidMount() {
        api.GetProdutos().then((data) => {
            this.setState({ produtos: data })

            var produtos = JSON.parse(JSON.stringify(data));
            var carrinho = this.state.carrinho
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

                this.state.produtoscarrinho.map((item) => {
                    preco += item.produto.preco * item.variante.quantidade
                })
                this.setState({ total: preco })
            }
        })
        api.GetVariantes().then((data) => {
            this.setState({ variantes: data })
        })

    }

    finalizarCompra = () => {
        var encomenda = {};
        encomenda.userId = sessionStorage.userid;
        encomenda.produtos = this.state.produtoscarrinho;
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
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
                                                        <td style={{display:"flex"}} >
                                                            <img style={{ width: "40px", height: "40px" }} src={"http://localhost:4000/files/" + item.variante.imagens[0]}></img>
                                                            <span style={{paddingTop:"0px",fontSize:"21px",marginLeft:"20px"}}>
                                                                {item.produto.nome}
                                                                <p style={{ fontSize: "12px",paddingTop:"3px" }}>{item.produto.ref}</p>
                                                            </span>
                                                        </td>
                                                        <td><div style={{ width: "20px", height: "20px", borderRadius: "50%", backgroundColor: cor.hex }}></div></td>
                                                        <td>{item.variante.tamanho}</td>
                                                        <td>{item.variante.quantidade}</td>
                                                        <td>{item.produto.preco}€ x {item.variante.quantidade} {item.produto.preco * item.variante.quantidade}€</td>
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
                    Custo Total: {this.state.total}€
                    {sessionStorage.userid != null ?
                        <>
                            <button onClick={() => this.finalizarCompra()}>Efetuar pagamento</button>
                        </>
                        : <>
                            <span style={{color:"red",marginLeft:"20px"}}>Tem de ter uma conta conectada para poder fazer uma compra</span>
                        </>
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(Carrinho);