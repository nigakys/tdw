import React from 'react';
import api from "../shared/api";
import { Link, withRouter } from "react-router-dom";


class ProdutoInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            variantes: [],
            visibleCategoria: false,
            visibleCor: false,
            atributo: {
                "cor": "",
                "categoria": "",
            }
        };
    }

    componentDidMount() {
        api.GetVariantesProduto(this.props.match.params.id).then((data) => {
            this.setState({ variantes: data })
        })
    }

    visibleCor = () => {
        var visible = !this.state.visibleCor;
        this.setState({ visibleCor: visible })
        this.setState({ atributo: {} })
        this.myFormRef.reset();
        if (this.state.visibleCategoria === true) {
            this.setState({ visibleCategoria: false })
        }
    }

    visibleCategoria = () => {
        var visible = !this.state.visibleCategoria;
        this.setState({ visibleCategoria: visible })
        this.setState({ atributo: {} })
        this.myFormRef.reset();
        if (this.state.visibleCor === true) {
            this.setState({ visibleCor: false })
        }
    }

    deleteVariante = (id) => {
        var deleteVariantes = this.state.variantes;
        api.DeleteVariante(id)
        this.state.variantes.map((pos) => {
            if (pos._id == id) {
                deleteVariantes.splice(deleteVariantes.indexOf(pos), 1)
                this.setState({ variantes: deleteVariantes })
            }
        })
    }

    adicionarAtributo = (atributo) => {
        if (atributo === "cor") {
            if (this.state.atributo.cor !== "") {
                api.CriarCor(this.state.atributo);
            }
        }
        else {
            if (this.state.atributo.categoria !== "") {
                api.CriarCategoria(this.state.atributo);
            }
        }
    }

    updateField = (event, fieldName) => {
        var addAtributo = this.state.atributo;
        addAtributo[fieldName] = event.target.value;

        this.setState({ atributo: addAtributo })
        event.preventDefault();
    }


    renderForms = () => {
        if (this.state.visibleCor === true) {
            return (
                <>
                    <p></p>
                    Nova Cor: <input id="Cor" value={this.state.atributo.cor} onChange={(e) => this.updateField(e, "cor")}></input>
                    <p></p>
                    <button onClick={() => this.adicionarAtributo("cor")}>Adicionar Cor</button>
                </>
            )
        }
        else if (this.state.visibleCategoria === true) {
            return (
                <>
                    <p></p>
                    Nova Categoria: <input id="Categoria" value={this.state.atributo.categoria} onChange={(e) => this.updateField(e, "categoria")}></input>
                    <p></p>
                    <button onClick={() => this.adicionarAtributo("categoria")}>Adicionar Categoria</button>
                </>
            )
        }
    }

    render() {
        return (
            <div>
                <Link to={`/Dashboard/variante/add/${this.props.match.params.id}`}><button>Adicionar Variante</button></Link>
                <button onClick={() => this.visibleCor()}>Adicionar Cor</button>
                <button onClick={() => this.visibleCategoria()}>Adicionar Categoria</button>
                <form ref={(el) => this.myFormRef = el}>
                    {this.renderForms()}
                </form>
                <table className="table">
                    <thead>
                        <tr>
                            <td><b>Tamanho</b></td>
                            <td><b>Cor</b></td>
                            <td><b>Stock</b></td>
                            <td style={{ textAlign: "center" }} colSpan="2"> <b>Ações</b></td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.variantes.map((item, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{item.tamanho}</td>
                                        <td>{item.cor}</td>
                                        <td>{item.stock}</td>
                                        <td visible={this.state.visible}><button onClick={() => this.visibleInput()}>+</button></td>
                                        <td> <button onClick={() => this.deleteVariante(item._id)}>Eliminar</button> </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

            </div>
        )
    }
}

export default withRouter(ProdutoInfo);