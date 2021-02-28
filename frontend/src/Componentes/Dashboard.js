import React from "react";
import { Link, withRouter } from 'react-router-dom'
import api from "../shared/api"

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            produtos: this.props.produtos,
            categorias: [],
            produtosMostrar: this.props.produtos,
            selectedCategoria: "Todos",
        };
    }

    componentDidMount() {
        api.GetProdutos().then((data) => {
            this.setState({ produtos: data, produtosMostrar: data })
        })
        api.GetCategorias().then((data) => {
            this.setState({ categorias: data })
        })
    }

    updateField = (event) => {
        event.preventDefault();
        var produtos = [];
        if (event.target.value === "Todos") {
            produtos = this.state.produtos
        }
        else {
            this.state.produtos.map((pos) => {
                if (pos.tipo === event.target.value) {
                    produtos.push(pos)
                }
            })
        }

        this.setState({ produtosMostrar: produtos, selectedCategoria: event.target.value })
    }


    alterarVisibilidade = (item) => {
        var produtos = this.state.produtos;
        var produto;
        produtos.map((pos) => {
            if (pos.ref === item.ref) {
                pos.visibilidade = !pos.visibilidade
                produto = pos
            }
        })
        this.setState({ produtosMostrar: produtos })
        api.updateProduto(item._id, produto)
        this.props.alterarVisibilidade(produtos)
    }

    render() {
        return (
            <div>
                <div className="DivButtonAdd">
                    <Link to={`/Dashboard/add/`}><button className="ContentButtonAdd">Adicionar novos items</button></Link>
                </div>
                Categoria: <select id="Categoria" value={this.state.selectedCategoria} onChange={(e) => this.updateField(e)}>
                    <option value="Todos">Todos</option>
                    {this.state.categorias.map((pos) => {
                        return (
                            <option value={pos.categoria}>{pos.categoria}</option>
                        )
                    })}
                </select>
                <div className="Content">
                    <table className="table">
                        <thead>
                            <tr>
                                <td className="TdRef"><b className="TdText">Referência</b></td>
                                <td className="TdImg"><b className="TdText">Imagem</b></td>
                                <td className="TdNome"> <b className="TdText">Nome</b></td>
                                <td className="TdTipo"><b className="TdText">Tipo</b></td>
                                <td className="TdPreco"><b className="TdText">Preço</b></td>
                                <td className="TdAcoes"> <b className="TdText">Ações</b></td>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.produtosMostrar.map((item, i) => {
                                    return (
                                        <tr className="tr1" key={i}>
                                            <td className="TdRef_">{item.ref}</td>
                                            <td className="TdImg_"><img className="ContentImg" src={"http://localhost:4000/files/" + item.imagem}></img></td>
                                            <td className="TdNome_">{item.nome}</td>
                                            <td className="TdTipo_">{item.tipo}</td>
                                            <td className="TdPreco_">{item.preco}€</td>
                                            <td className="TdAcoes_">
                                                <Link to={`/Dashboard/edit/${item._id}`}><button className="ContentButtonEdit">Editar</button>
                                                </Link>
                                                <Link to={`/Dashboard/info/${item.ref}`}><button className="ContentButtonStock">Variantes</button>
                                                </Link>
                                                {item.visibilidade === true ?
                                                    <button className="ContentButtonElim" onClick={() => this.alterarVisibilidade(item)}>Tornar Invisivel</button>
                                                    :
                                                    <button className="ContentButtonElim" onClick={() => this.alterarVisibilidade(item)}>Tornar Visivel</button>
                                                }
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