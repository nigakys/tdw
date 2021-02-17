import React from "react";
import { Link,withRouter} from 'react-router-dom'

class Dashboard extends React.Component {
    render() {
        return (
            <div>
                <td> <Link to={`/Dashboard/add/`}><button>Adicionar</button></Link> </td>
                <table className="table">
                    <thead>
                        <tr>
                            <td><b>ref</b></td>
                            <td><b>Imagem</b></td>
                            <td><b>Nome</b></td>
                            <td><b>Tipo</b></td>
                            <td><b>Preço</b></td>
                            <td style={{ textAlign: "center" }} colSpan="2"> <b>Ações</b></td>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.props.produtos.map((item, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{item.ref}</td>
                                        
                                        <td><img src={"http://localhost:4000/files/"+item.imagem}></img></td>
                                        
                                        <td>{item.nome}</td>

                                        <td>{item.tipo}</td>

                                        <td>{item.preco}</td>

                                        <td> <Link to={`/Dashboard/edit/${item._id}`}><button>Editar</button></Link> </td>
                                        <td> <Link to={`/Dashboard/info/${item._id}`}><button>Ver/Editar Variantes</button></Link> </td>
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

export default withRouter(Dashboard);