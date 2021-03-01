import React from 'react';
import api from "../shared/api"
import cores from "../shared/cores"

class Produto extends React.Component {
    constructor(props) {
        super(props);

        const cart = JSON.parse(localStorage.carrinho)


        this.state = {
            produto: {},
            variantes: [],
            tamanhoSelected: "",
            cores: cores,
            corSelected: "",
            imagem: "",
            carrinho: cart,
        };
    }

    componentDidMount() {
        api.GetVariantesProduto(this.props.match.params.id).then((data) => {
            this.setState({ variantes: data })
            this.setState({ corSelected: data[0].cor })
        })
    }

    tamanhoSelected = (event) => {
        this.setState({ tamanhoSelected: event.target.value })

    }

    corSelected = (cor) => {
        var core = cor.cor
        this.setState({ corSelected: core })
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


            <div className="containerProdutoInfo">
                <div className="infoProdutoImagens">
                    {this.state.variantes.map((pos) => {
                        var items = [];
                        if (pos.cor === this.state.corSelected)
                            for (const [index] of pos.imagens.entries()) {
                                items.push(
                                    <img
                                        src={"http://localhost:4000/files/" + pos.imagens[index]}
                                    ></img>)
                            }
                        return (
                            <>
                                {items}
                            </>
                        );
                    })}
                </div>
                <div className="protudoInfoCont">
                    <div>

                        {this.props.produtos.map((pos) => {
                            if (pos.ref == this.props.match.params.id) {
                                return (
                                    <>
                                        <h1 style={{marginTop:"20px"}}> {pos.nome}</h1>
                                        <h2 style={{marginTop:"30px"}}>{pos.preco}€</h2>
                                    </>
                                )
                            }
                        })}
                    </div>
                    <div className="variantes">
                        <div className="variantess">
                            
                             {this.state.cores.map((cor) => {
                            return (
                                <>
                                    {this.state.variantes.map((pos) => {
                                        if (pos.cor === cor.cor) {
                                            return (
                                                <div className="varianteCores" style={{ backgroundColor: cor.hex }} onClick={() => this.corSelected(cor)} >

                                                </div>
                                            )
                                        }
                                    })}
                                </>
                            )
                            
                            })}
                        
                        </div>
                        <div className="variantess">
                          
                        {this.state.variantes.map((pos) => {
                            return (
                                <>
                                    <button className="varianteCores" style={{background:"white",border:"none"}} value={pos.tamanho}  onClick={(e) => this.tamanhoSelected(e)}>{pos.tamanho}</button>
                                </>
                            )
                        })}
                        </div>
                        <button  style={{marginTop:"60px",marginLeft:"30px",background:"black",color:"white",padding:"15px 60px"}}onClick={() => this.addCarrinho()}>Adicionar ao carrinho</button>
                    </div>
                </div>
            </div>


        )
    }
}

export default Produto;