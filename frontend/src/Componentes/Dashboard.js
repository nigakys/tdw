import React from "react";
import { Link, withRouter } from 'react-router-dom'

class Dashboard extends React.Component {
    render() {
        return (
            <div>
                <div className="DivButtonAdd"><Link to={`/Dashboard/add/`}><button className="ContentButtonAdd">Adicionar novos items</button></Link> </div>
                <div className="Content">
                    <table className="table">
                        <thead>
                            <tr>
                                <td className="TdRef"><b className="TdText">Referencia</b></td>
                                <td className="TdImg"><b className="TdText">Imagem</b></td>
                                <td className="TdNome"> <b className="TdText">Nome</b></td>
                                <td className="TdTipo"><b className="TdText">Tipo</b></td>
                                <td className="TdPreco"><b className="TdText">Preço</b></td>
                                <td className="TdAcoes"> <b className="TdText">Ações</b></td>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.props.produtos.map((item, i) => {
                                    return (
                                        <tr className="tr1" key={i}>
                                            <td className="TdRef_">{item.ref}</td>

                                            <td className="TdImg_"><img className="ContentImg" src={"http://localhost:4000/files/" + item.imagem}></img></td>

                                            <td className="TdNome_">{item.nome}</td>

                                            <td className="TdTipo_">{item.tipo}</td>

                                            <td className="TdPreco_">{item.preco}</td>

                                            <td className="TdAcoes_">
                                                <Link to={`/Dashboard/edit/${item._id}`}><button className="ContentButtonEdit">Editar</button>
                                                </Link>
                                                <Link to={`/Dashboard/info/${item.ref}`}><button className="ContentButtonStock">Variantes</button>
                                                </Link>
                                                <button className="ContentButtonElim" onClick={() => this.props.funcaoRemover(item._id)}>Eliminar</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                        </tbody>
                    </table>
                </div>

            </div>
        )
    }
}

export default withRouter(Dashboard);