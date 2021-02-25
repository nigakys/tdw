import React from "react";
import { Link, withRouter } from "react-router-dom";
import "../Switch.css"
import api from "../shared/api";
import tamanhosCalcado from "../shared/tamanhosCalcado";
import tamanhosRoupa from "../shared/tamanhosRoupa";

let file = '';
var imagemForm = new FormData();

class FormProduto extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            variante: {
                id: null,
                ref: "",
                tamanho: "",
                imagens: [],
                cor: "",
                stock: ""
            },
            imagens: [],
            cores: [],
            tamanhos: [],
        }
    }

    componentDidMount() {
        api.GetCores().then((data) => {
            this.setState({ cores: data })
        }).then(() => {
            this.state.variante.cor = this.state.cores[0].cor
            this.state.variante.tamanho = this.state.tamanhos[0]
            this.state.variante.ref = this.props.match.params.id;
        })
        this.props.produtos.map((pos) => {
            if (pos.ref == this.props.match.params.id) {
                if (pos.tipo === "Calçado") {
                    this.setState({ tamanhos: tamanhosCalcado })
                }
                else {
                    this.setState({ tamanhos: tamanhosRoupa })
                }
            }
        })
    }

    toggle = () => {
        var addProduto = this.state.produtos;
        addProduto.especial ? addProduto.especial = false : addProduto.especial = true
        this.setState({ produtos: addProduto })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        api.criarVariante(this.state.variante);
        api.uploadImagemVariante(imagemForm);
        window.location.href = "/dashboard/info/" + this.state.variante.ref
    }

    updateImagens = (event) => {
        var numFicheiros = event.target.files.length;
        if (file.files.length > 0) {
            const currentFiles = this.state.imagens;
            for (let index = 0; index < numFicheiros; index++) {
                imagemForm.append("file", file.files[index]);
                currentFiles.push({
                    fileInput: file.files[index],
                    fileName: file.files[index].name,
                });
                this.state.variante.imagens.push(file.files[index].name)
            }

            this.setState({
                imagens: currentFiles,
            });
        }
    }

    updateField = (event, fieldName) => {
        var addVariante = this.state.variante;
        addVariante[fieldName] = event.target.value;

        this.setState({ variante: addVariante })
        event.preventDefault();
    }

    render() {
        return (
            <div>
                {this.state.variante.id === null ?
                    <h1>Adicionar Variante</h1> :
                    <h1>Editar Variante</h1>
                }
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    Tamanho: <select id="Tamanho" value={this.state.variante.tamanho} onChange={(e) => this.updateField(e, "tamanho")}>
                        {this.state.tamanhos.map((pos) => {
                            return (
                                <option value={pos}>{pos}</option>
                            )
                        })}
                    </select><p></p>
                    <p></p>
                    Imagens: <input type="file" name="file" onChange={(e) => this.updateImagens(e)} ref={(input) => { file = input; }} multiple />
                    <p></p>
                    Cor: <select id="Cores" value={this.state.variante.cor} onChange={(e) => this.updateField(e, "cor")}>
                        {this.state.cores.map((pos) => {
                            return (
                                <option value={pos.cor}>{pos.cor}</option>
                            )
                        })}
                    </select><p></p>
                    Stock: <input id="Stock" type="number" value={this.state.variante.stock} onChange={(e) => this.updateField(e, "stock")}></input>
                    <p></p>
                    <Link to={"/dashboard/info/" + this.props.match.params.id}><button >Voltar</button></Link>
                    <button type="submit">Adicionar</button>
                </form>
            </div>
        );
    }
}

export default withRouter(FormProduto);