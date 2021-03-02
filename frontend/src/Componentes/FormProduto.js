import React from "react";
import { Link, withRouter } from "react-router-dom";
import "../Switch.css"
import Switch from "./Switch"
import api from "../shared/api"


class FormProduto extends React.Component {
    constructor(props) {
        super(props);
        if (props.match != null && props.match.params.id != null) {
            this.props.produtos.map((pos) => {
                if (pos._id == props.match.params.id) {
                    this.state = {
                        produtos: {
                            id: pos._id,
                            ref: pos.ref,
                            tipo: pos.tipo,
                            nome: pos.nome,
                            genero: pos.genero,
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
                    genero: "Masculino",
                    tipo: "Calças",
                    nome: "",
                    preco: "",
                    especial: false,
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
        console.log(this.state.produtos)
        return (
            <div>
                {this.state.produtos.id === "" ?
                    <h1 style={{textAlign:"center",marginTop:"50px"}}>Adicionar Produto</h1> :
                    <h1 style={{textAlign:"center",marginTop:"50px"}}>Editar Produto</h1>
                }
                <form  className="formEdit" onSubmit={(e) => this.props.criarEditar(e, this.state.produtos, this.state.imagem)}>
                    <div className="labels">
                    Referência: <input className="input1" id="Ref" value={this.state.produtos.ref} onChange={(e) => this.updateField(e, "ref")}></input>
                    <p></p>
                    Nome: <input className="input1" id="Nome" value={this.state.produtos.nome} onChange={(e) => this.updateField(e, "nome")}></input>
                    <p></p>
                    Categoria: <select className="select1" id="Categoria" value={this.state.produtos.tipo} onChange={(e) => this.updateField(e, "tipo")}>
                        {this.state.categorias.map((pos) => {
                            return (
                                <option value={pos.categoria}>{pos.categoria}</option>
                            )
                        })}
                    </select><p></p>
                    Género: <select className="select1" id="Genero" value={this.state.produtos.genero} onChange={(e) => this.updateField(e, "genero")}>
                        <option className="option1" value="Masculino">Masculino</option>
                        <option  className="option1" value="Feminino">Feminino</option>
                        <option className="option1"  value="Unissexo">Unissexo</option>
                    </select><p></p>
                    Preco: <input className="input1" id="Preco" type="number" value={this.state.produtos.preco} onChange={(e) => this.updateField(e, "preco")}></input>
                    <p></p>
                    Imagem: <input className="input1" type="File" id="Imagem" onChange={(e) => this.updateField(e, "imagem")}></input>
                    <p></p>
                    <img  style={{width:"250px",background:"white"}} src={"http://localhost:4000/files/" + this.state.produtos.imagem}></img><p></p>
                    Especial: <Switch checked={this.state.produtos.especial} handleToggle={() => this.toggle()} />
                    <p></p>
                    <Link to="/dashboard"><button className="buttonHome buttonHome1" style={{background:"white",color:"black",margin:"0px"}}>Voltar</button></Link>
                    {this.state.produtos.id === "" ?
                        <button type="submit" className="buttonHome buttonHome1" style={{background:"white",color:"black"}}>Adicionar</button>
                        :
                        <button type="submit" className="buttonHome buttonHome1" style={{background:"white",color:"black"}}>Editar</button>
                    }
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(FormProduto);