import React from "react";
import { Link, withRouter } from "react-router-dom";


class FormProduto extends React.Component {
    constructor(props) {
        super(props);
        if (props.match != null && props.match.params.id != null) {
            this.props.produtos.map((pos) => {
                if (pos._id == props.match.params.id) {
                    
                    this.state = {
                        produtos: {
                            id: pos._id,
                            nome: pos.nome,
                            preco: pos.preco,
                            tamanho: pos.tamanho,
                            stock: pos.stock
                        }
                    }
                }
            });
        }
        else {
            this.state = {
                produtos: {
                    id: null,
                    nome: "",
                    preco: "",
                    tamanho: "",
                    stock: ""
                }
            }
        }
    }

    updateField = (event,fieldName) => {
        var addProduto = this.state.produtos;
        addProduto[fieldName] = event.target.value;
        this.setState({
            produtos: addProduto
        })

        event.preventDefault();
    }

    render() {
        return (
            <div>
                {this.state.produtos.id === null ?
                    <h1>Adicionar Produto</h1> :
                    <h1>Editar Produto</h1>
                }
                <form onSubmit={(e) => this.props.criarEditar(e,this.state.produtos)}>
                    Nome: <input id="Nome" value={this.state.produtos.nome} onChange={(e) => this.updateField(e, "nome")}></input>
                    <p></p>
                    Preco: <input id="Preco" value={this.state.produtos.preco} onChange={(e) => this.updateField(e, "preco")}></input>
                    <p></p>
                    Tipo: <input id="Tipo" value={this.state.produtos.stock} onChange={(e) => this.updateField(e, "Tipo")}></input>
                    <p></p>
                    <Link to="/dashboard"><button >Voltar</button></Link>
                    <button type="submit">Enviar</button>
                </form>
            </div>
        );
    }
}

export default withRouter(FormProduto);