import React from "react";
import { Link, withRouter } from "react-router-dom";
import api from '../api'

class FormProduto extends React.Component {
    constructor(props) {
        super(props);
        if (props.match != null && props.match.params.id != null) {
            this.props.produtos.map((pos) => {
                if (pos._id == props.match.params.id) {

                    this.state = {
                        produtos: {
                            id: pos._id,
                            tipo: pos.tipo,
                            nome: pos.nome,
                            preco: pos.preco,
                            especial: pos.especial,
                            dataAdicionado: pos.dataAdicionado,
                            imagem: pos.imagem
                        },
                        imagem: null
                    }
                }
            });
        }
        else {
            this.state = {
                produtos: {
                    id: null,
                    tipo: "",
                    nome: "",
                    preco: "",
                    especial: "",
                    dataAdicionado: "",
                    imagem: null
                },
                imagem: null
            }
        }
    } ref



    updateField = (event, fieldName) => {
        var addProduto = this.state.produtos;
        addProduto[fieldName] = event.target.value;
        if (fieldName === "imagem") {
            this.setState({ imagem: event.target.files[0], })
        }
        else {
            this.setState({ produtos: addProduto })
        }

        event.preventDefault();
    }



    render() {
        return (
            <div>
                {this.state.produtos.id === null ?
                    <h1>Adicionar Produto</h1> :
                    <h1>Editar Produto</h1>
                }
                <form onSubmit={(e) => this.props.criarEditar(e, this.state.produtos, this.state.imagem)}>
                    Nome: <input id="Nome" value={this.state.produtos.nome} onChange={(e) => this.updateField(e, "nome")}></input>
                    <p></p>
                    Categoria: <input id="Tipo" value={this.state.produtos.tipo} onChange={(e) => this.updateField(e, "tipo")}></input>
                    <p></p>
                    Preco: <input id="Preco" value={this.state.produtos.preco} onChange={(e) => this.updateField(e, "preco")}></input>
                    <p></p>
                    Imagem: <input type="File" id="Imagem" value={this.state.produtos.imagem} onChange={(e) => this.updateField(e, "imagem")}></input>
                    <p></p>
                    Especial: <input type="checkbox" id="Especial" value={this.state.produtos.especial} onChange={(e) => this.updateField(e, "especial")}></input>
                    <p></p>
                    <Link to="/dashboard"><button >Voltar</button></Link>
                    <button type="submit">Adicionar</button>
                </form>
            </div>
        );
    }
}

export default withRouter(FormProduto);