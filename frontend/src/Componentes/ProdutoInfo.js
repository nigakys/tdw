import React from 'react';
import api from "../shared/api";


class ProdutoInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            produtos: [],
            visible: false

        };
    }

    GetVariantesProduto = () => {

        var id;
        this.props.produtos.map((pos) => {
            if(pos._id == this.props.match.params.id){
                id = pos.ref
            }
        });
        api.GetVariantesProduto(id).then((data) => {
            this.setState({ produtos: data })
        })
    }

    componentDidMount() {
        this.GetVariantesProduto();
    }

    visibleInput = () => {
        this.setState({ visible: true })
    }

    render() {
        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <td><b>ref</b></td>
                            <td><b>Tamanho</b></td>
                            <td><b>Cor</b></td>
                            <td><b>Stock</b></td>
                            <td style={{ textAlign: "center" }} colSpan="2"> <b>Ações</b></td>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.state.produtos.map((item, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{item.ref}</td>

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

export default ProdutoInfo;