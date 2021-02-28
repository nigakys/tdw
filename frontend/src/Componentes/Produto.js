import React from 'react';
import api from "../shared/api"

class Produto extends React.Component {
    constructor(props) {
        super(props);

        const cart = JSON.parse(localStorage.carrinho)


        this.state = {
            produto: {},
            variantes: [],
            tamanhoSelected: "",
            corSelected: "",
            imagem: "",
            carrinho: cart,
        };
    }

    componentDidMount() {
        api.GetVariantesProduto(this.props.match.params.id).then((data) => {
            this.setState({ variantes: data })
        })
    }

    tamanhoSelected = (event) => {
        this.setState({ tamanhoSelected: event.target.value })
    }

    corSelected = (event) => {
        this.setState({ corSelected: event.target.value })
    }

    addCarrinho = () => {
        var cart = this.state.carrinho
        var count = 0;
        var items = [];
        cart.map((pos) => {
            items.push(pos._id)
        })
        this.state.variantes.map((pos) => {
            if (pos.cor === this.state.corSelected) {
                if (items.includes(pos._id)) {
                    cart.find(x => x._id === pos._id).quantidade++;
                }
                else {
                    pos.quantidade = 1;
                    cart.push(pos)
                }

                this.setState({ carrinho: cart })
                localStorage.setItem('carrinho', JSON.stringify(cart))
            }
        })
        for (let index = 0; index < cart.length; index++) {
            count += cart[index].quantidade;
        }

        document.getElementById('cartCounter').innerHTML = count
    }

    render() {
        return (
            <div>
                <div className="containerProdutoInfo">
                    <div>
                        tamanhos disponiveis: {this.state.variantes.map((pos) => {
                        return (
                            <>
                                <button value={pos.tamanho} onClick={(e) => this.tamanhoSelected(e)}>{pos.tamanho}</button>
                            </>
                        )
                    })}
                    </div>
                    <div>
                        cores disponiveis: {this.state.variantes.map((pos) => {
                        return (
                            <>
                                <button value={pos.cor} onClick={(e) => this.corSelected(e)}>{pos.cor}</button>
                            </>
                        )

                    })}
                    </div>
                    {this.state.variantes.map((pos) => {
                        var items = [];
                        if (pos.cor === this.state.corSelected)
                            for (const [index, value] of pos.imagens.entries()) {
                                items.push(
                                    <img style={{ height: "200px", width: "200px", marginRight: "5px" }}
                                        src={"http://localhost:4000/files/" + pos.imagens[index]}
                                    ></img>)
                            }
                        return (
                            <div>
                                {items}
                            </div>
                        );
                    })}
                    <button onClick={() => this.addCarrinho()}>Adicionar ao carrinho</button>
                </div>
            </div>
        )
    }
}

export default Produto;