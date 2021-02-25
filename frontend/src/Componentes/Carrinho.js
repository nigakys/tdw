import React from 'react';
import api from "../shared/api"

class Carrinho extends React.Component {
    constructor(props) {
        super(props);

        const carro = JSON.parse(localStorage.getItem('carrinho'));

        this.state = {
            carrinho: carro
        };
    }

    componentDidMount(){
        api.GetProdutos()
    }


    render() {
        return (
            <div>
                {this.state.carrinho.map((pos) => {
                    return (
                        <>
                        <p>{pos.nome}</p>
                        <p>{pos.preco + "€"}</p>
                        <p>{pos.quantidade}</p><br></br>
                        </>
                    )
                })}
            </div>
        )
    }
}

export default Carrinho;