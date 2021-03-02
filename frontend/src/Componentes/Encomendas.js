import React from 'react';
import api from "../shared/api"
import cores from "../shared/cores"
import { withRouter } from "react-router-dom";

class Encomendas extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            encomendas: [
                {
                    userId: null,
                    produtos: [],
                    dataEncomenda: null,
                    custo: 0
                }
            ],
            cores: cores,
        };
    }
    componentDidMount() {
        api.GetEncomendasByUserId(sessionStorage.userid).then((data) => {
            this.setState({ encomendas: data })
        })
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
                                <td><b>Data</b></td>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.cores.map((cor) => {
                                    return (
                                        this.state.encomendas.map((item, i) => {
                                            return (
                                                <>
                                                    {item.produtos.map((produto) => {
                                                        if (cor.cor === produto.variante.cor) {
                                                            return (
                                                                <tr className="tr1" key={i}>
                                                                    <td style={{ display: "flex" }} >
                                                                        <img style={{ width: "40px", height: "40px" }} src={"http://localhost:4000/files/" + produto.variante.imagens[0]}></img>
                                                                        <span style={{ paddingTop: "0px", fontSize: "21px", marginLeft: "20px" }}>
                                                                            {produto.produto.nome}
                                                                            <p style={{ fontSize: "12px", paddingTop: "3px" }}>{produto.produto.ref}</p>
                                                                        </span>
                                                                    </td>
                                                                    <td><div style={{ width: "20px", height: "20px", borderRadius: "50%", backgroundColor: cor.hex }}></div></td>
                                                                    <td>{produto.variante.tamanho}</td>
                                                                    <td>{produto.variante.quantidade}</td>
                                                                    <td>{produto.produto.preco}€ x {produto.variante.quantidade} {produto.produto.preco * produto.variante.quantidade}€</td>
                                                                    <td>{item.dataEncomenda}</td>
                                                                </tr>
                                                            )
                                                        }
                                                    })}
                                                </>
                                            )
                                        }))
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default withRouter(Encomendas);