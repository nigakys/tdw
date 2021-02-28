import React from 'react';
import api from "../shared/api"
import cores from "../shared/cores"

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
    }

    render() {
        return (
            <div>
                <div className="Content">
                    <table className="table">
                        <thead>
                            <tr>
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
                                                        <td >
                                                            <img style={{ width: "40px", height: "40px" }} src={"http://localhost:4000/files/" + item.variante.imagens[0]}></img>
                                                            <span style={{ float: "right" }}>
                                                                {item.produto.nome}
                                                                <p style={{ fontSize: "11px" }}>{item.produto.ref}</p>
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
                </div>
            </div>
        )
    }
}

export default Carrinho;