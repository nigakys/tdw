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
            coresDif: [],
            tamanhosDif: [],
            imagensDif: [],
            valid: true,
        };
    }

    componentDidMount() {
        api.GetVariantesProduto(this.props.match.params.id).then((data) => {
            this.setState({ variantes: data })
            this.setState({ corSelected: data[0].cor })
            this.coresDif();
            this.tamanhosDif();
            this.imagensDif();
        })
    }

    tamanhoSelected = (event) => {
        this.setState({ tamanhoSelected: event.target.value })
    }

    corSelected = (cor) => {
        var cor = cor.cor
        this.setState({ corSelected: cor, tamanhoSelected: "" })
    }

    addCarrinho = () => {
        var cart = this.state.carrinho
        var count = 0;
        var items = [];
        cart.map((pos) => {
            items.push(pos._id)
        })
        this.state.variantes.map((pos) => {
            if (pos.cor == this.state.corSelected && pos.tamanho == this.state.tamanhoSelected) {
                if (items.includes(pos._id)) {
                    cart.find(x => x._id === pos._id).quantidade++;
                }
                else {
                    pos.quantidade = 1;
                    cart.push(pos)
                }

                this.setState({ carrinho: cart, valid: true })

                localStorage.setItem('carrinho', JSON.stringify(cart))
            }
            else if (this.state.tamanhoSelected === "") {
                this.setState({ valid: false })
            }

        })
        for (let index = 0; index < cart.length; index++) {
            count += cart[index].quantidade;
        }

        document.getElementById('cartCounter').innerHTML = count
    }

    tamanhosDif = () => {
        var variantes = this.state.variantes;
        var tamanhos = [];

        variantes.map((pos) => {
            if (!tamanhos.includes(pos.tamanho)) {
                tamanhos.push(pos.tamanho)
            }
        })


        this.setState({ tamanhosDif: tamanhos })
    }

    erros = () => {
        if (this.state.valid === false) {
            return (
                <span style={{fontSize:"20px",paddingTop:"15px",paddingLeft:"27px",color:"red"}}>Tem de selecionar um tamanho</span>
            )
        }
    }

    imagensDif = () => {
        var variantes = this.state.variantes;
        var imagens = [];

        variantes.map((pos) => {
            if (!imagens.includes(pos.imagens)) {
                imagens.push(pos.imagens)
            }
        })
        this.setState({ imagensDif: imagens })
    }

    coresDif = () => {
        var variantes = this.state.variantes;
        var coresDif = [];
        var cores = this.state.cores;

        variantes.map((pos) => {
            if (!coresDif.includes(pos.cor)) {
                coresDif.push(pos.cor)
            }
        })

        cores.map((cor) => {
            for (let index = 0; index < coresDif.length; index++) {
                if (coresDif[index] === cor.cor) {
                    coresDif[index] = cor
                }
            }
        })

        this.setState({ coresDif: coresDif })
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
                                    ></img>
                                )
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
                                        <h1 style={{ marginTop: "20px" }}> {pos.nome}</h1>
                                        <h2 style={{ marginTop: "30px" }}>{pos.preco}€</h2>
                                    </>
                                )
                            }
                        })}
                    </div>
                    <div className="variantes">
                        <div className="variantess">
                            {this.state.coresDif.map((pos) => {
                                return (
                                    <>
                                        <div className="varianteCores" style={{ backgroundColor: pos.hex }} onClick={() => this.corSelected(pos)} ></div>
                                    </>
                                );
                            })}
                        </div>

                        <div className="variantess">

                            {this.state.variantes.map((pos) => {
                                if (pos.cor === this.state.corSelected) {
                                    return (
                                        <button style={{ background: "white", border: "none" }} className="varianteCores" value={pos.tamanho} onClick={(e) => this.tamanhoSelected(e)}>{pos.tamanho}</button>
                                    )
                                }
                            })}
                        </div>
                        <button style={{ marginTop: "60px", marginLeft: "30px", background: "black", color: "white", padding: "15px 60px" }} onClick={() => this.addCarrinho()}>Adicionar ao carrinho</button>
                        {this.erros()}
                    </div>
                </div>
            </div>


        )
    }
}

export default Produto;