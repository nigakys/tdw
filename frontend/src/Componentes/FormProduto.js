import React from "react";
import { Link, withRouter } from "react-router-dom";
import "../Switch.css"
import Switch from "./Switch"
import api from "../shared/api"


class FormProduto extends React.Component {
    constructor(props) {
        var state = false;
        super(props);
        if (props.match != null && props.match.params.id != null) {
            this.props.produtos.map((pos) => {
                if (pos._id == props.match.params.id) {
                    state = true
                    this.state = {
                        produtos: {
                            id: pos._id,
                            ref: pos.ref,
                            tipo: pos.tipo,
                            nome: pos.nome,
                            preco: pos.preco,
                            especial: pos.especial,
                            dataAdicionado: pos.dataAdicionado,
                            imagem: pos.imagem
                        },
                        imagem: null,
                        categorias: [],
                    }
                }
            });
        }
        else {
            this.state = {
                produtos: {
                    id: "",
                    ref: "",
                    tipo: "",
                    nome: "",
                    preco: "",
                    especial: "",
                    dataAdicionado: "",
                    imagem: ""
                },
                imagem: null,
                categorias: [],
            }
        }
    }


    toggle = () => {
        var addProduto = this.state.produtos;
        addProduto.especial ? addProduto.especial = false : addProduto.especial = true
        this.setState({ produtos: addProduto })
    }

    updateField = (event, fieldName) => {
        var addProduto = this.state.produtos;
        addProduto[fieldName] = event.target.value;

        if (fieldName === "imagem") {
            this.setState({ imagem: event.target.files[0] })
        }
        else {
            this.setState({ produtos: addProduto })
        }
        event.preventDefault();
    }
    componentDidMount() {
        api.GetCategorias().then((data) => {
            this.setState({ categorias: data })
        })
    }

    render() {
        return (
            <div>
                {this.state.produtos.id === null ?
                    <h1>Adicionar Produto</h1> :
                    <h1>Editar Produto</h1>
                }
                <form onSubmit={(e) => this.props.criarEditar(e, this.state.produtos, this.state.imagem)}>

                    Referência: <input id="Ref" value={this.state.produtos.ref} onChange={(e) => this.updateField(e, "ref")}></input>
                    <p></p>
                    Nome: <input id="Nome" value={this.state.produtos.nome} onChange={(e) => this.updateField(e, "nome")}></input>
                    <p></p>
                    Categoria: <select id="Categoria" value={this.state.produtos.categoria} onChange={(e) => this.updateField(e, "categoria")}>
                        {this.state.categorias.map((pos) => {
                            return (
                                <option value={pos.categoria}>{pos.categoria}</option>
                            )
                        })}
                    </select><p></p>

                    Preco: <input id="Preco" type="number" value={this.state.produtos.preco} onChange={(e) => this.updateField(e, "preco")}></input>
                    <p></p>
                    Imagem: <input type="File" id="Imagem" onChange={(e) => this.updateField(e, "imagem")}></input>
                    <p></p>
                    <img src={"http://localhost:4000/files/" + this.state.produtos.imagem}></img><p></p>
                    Especial: <Switch checked={this.state.produtos.especial} handleToggle={() => this.toggle()} />
                    <p></p>
                    <Link to="/dashboard"><button >Voltar</button></Link>
                    {this.state.produtos.id === null ?
                        <button type="submit">Adicionar</button> :
                        <button type="submit">Editar</button>
                    }

                </form>
            </div>
        );
    }
}

export default withRouter(FormProduto);