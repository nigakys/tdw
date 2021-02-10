import React from "react";
import { Link } from 'react-router-dom'

class Dashboard extends React.Component {
    render() {
        console.log("ola" + JSON.stringify(this.props))
        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <td><b>ID</b></td>
                            <td><b>Nome</b></td>
                            <td><b>Tamanho</b></td>
                            <td><b>Preco</b></td>
                            <td><b>Stock</b></td>
                            <td style={{ textAlign: "center" }} colSpan="2"> <b>Ações</b></td>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.props.produtos.map((item, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{item.id}</td>
                                        

                                        <td>{item.nome}</td>

                                        {item.tamanho === "" ?
                                            <td>N/D</td> : <td>{item.tamanho}</td>
                                        }
                                        <td>{item.preco}</td>

                                        <td>{item.stock}</td>

                                        <td> <Link to={`/Dashboard/edit/${item.id}`}><button>Editar</button></Link> </td>

                                        <td> <button onClick={() => this.props.funcaoRemover(item.id)}>Eliminar</button> </td>
                                        
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

export default Dashboard;