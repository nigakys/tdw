import React from 'react';
import api from "../shared/api";
import { Link, withRouter } from "react-router-dom";


class ProdutoInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            variantes: [],
            visible: false

        };
    }

    componentDidMount() {
        api.GetVariantesProduto(this.props.match.params.id).then((data) => {
            this.setState({ variantes: data })
        })
    }

    visibleInput = () => {
        this.setState({ visible: true })
    }

    render() {
        return (
            <div>
                <Link to={`/Dashboard/variante/add/${this.props.match.params.id}`}><button>Adicionar Variante</button></Link>
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
                                        <td> <button onClick={() => this.props.funcaoRemover(item._id)}>Eliminar</button> </td>
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