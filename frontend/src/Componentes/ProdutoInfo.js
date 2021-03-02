import React from 'react';
import api from "../shared/api";
import { Link, withRouter } from "react-router-dom";


class ProdutoInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            variantes: [],
            visibleInput: false,
            stock: 0,
            selectedItem: "",

        };
    }

    componentDidMount() {
        api.GetVariantesProduto(this.props.match.params.id).then((data) => {
            this.setState({ variantes: data })
        })
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

    visibleInput = (id) => {
        var visible = !this.state.visibleInput;
        this.setState({ visibleInput: visible, stock: 0, selectedItem: id })
        this.myFormRef.reset();
    }

    adicionarAtributo = (event) => {
        event.preventDefault();
        var stock = { "stock": 0 }
        api.GetVariantes().then((data) => {
            data.map((pos) => {
                if (pos._id === this.state.selectedItem) {
                    stock.stock = pos.stock
                }
            })
            var stockFinal = 0;
            stockFinal = parseInt(stock.stock) + parseInt(this.state.stock)
            this.state.variantes.find(x => x._id === this.state.selectedItem).stock = stockFinal;
            this.setState({ state: this.state })
            this.visibleInput(this.state.selectedItem);
            stock.stock = stockFinal
            api.updateVariante(this.state.selectedItem, stock);            
        })

    }

    updateStock = (event) => {
        this.setState({ stock: event.target.value })
        event.preventDefault();
    }

    render() {
        return (
            <div style={{ textAlign: "center" }}>
                <Link to={`/Dashboard/variante/add/${this.props.match.params.id}`}><button style={{ background: "black", padding: "8px 30px", color: "white", marginTop: "50px" }}>Adicionar Variante</button></Link>
                <div style={{ textAlign: "center" }}>

                    <table className="table" style={{ width: "90%", textAlign: "left", marginLeft: "5%" }} >
                        <thead>
                            <tr style={{ textAlign: "left" }}>
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
                                            <td><button onClick={() => this.visibleInput(item._id)}>+</button></td>
                                            <td><button onClick={() => this.deleteVariante(item._id)}>Eliminar</button> </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <form ref={(el) => this.myFormRef = el}>
                        {this.state.visibleInput === true ? <div>
                            <label className="field field_v1">
                                <input placeholder="Categoria" className="field_input" id="stock" type="number" value={this.state.stock} onChange={(e) => this.updateStock(e)}></input>
                                <span className="field_label-wrap">
                                    <span className="field_label">Stock</span>
                                </span>
                            </label>

                            <button style={{ marginTop: "60px", marginLeft: "30px", background: "black", color: "white", padding: "10px 50px" }} onClick={(e) => this.adicionarAtributo(e)}>Adicionar Stock</button>
                        </div> : null}

                    </form>
                </div>

            </div>
        )
    }
}

export default withRouter(ProdutoInfo);