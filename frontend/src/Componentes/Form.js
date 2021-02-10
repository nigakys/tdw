import React from "react";
import { Link, withRouter } from "react-router-dom";


class Form extends React.Component {
    constructor(props) {
        super(props);
        if (props.match != null && props.match.params.id != null) {
            this.props.produtos.map((pos) => {
                if (pos.id === parseInt(props.match.params.id)) {
                    this.state = {
                        produtos: {
                            id: pos.id,
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
                    Nome: <input id="Nome" value={this.state.sandes.nome} onChange={(e) => this.updateField(e, "nome")}></input>
                    <p></p>
                    Preco: <input id="Preco" value={this.state.sandes.preco} onChange={(e) => this.updateField(e, "preco")}></input>
                    <p></p>
                    Stock: <input id="Stock" value={this.state.sandes.stock} onChange={(e) => this.updateField(e, "stock")}></input>
                    <p></p>
                    Tamanho: <select id="Tamanho" value={this.state.sandes.stock} onChange={(e) => this.updateField(e, "stock")}>
                        <option value="s">s</option>
                        <option value="m" >m</option>
                        <option value="l">l</option>
                    </select>
                    <p></p>
                    <Link to="/dashboard"><button >Voltar</button></Link>
                    <button type="submit">Enviar</button>
                </form>
            </div>
        );
    }
}

export default withRouter(Form);