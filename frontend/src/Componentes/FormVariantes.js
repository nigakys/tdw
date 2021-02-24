import React from "react";
import { Link, withRouter } from "react-router-dom";
import "../Switch.css"
import api from "../shared/api";

let file = '';
class FormProduto extends React.Component {
    constructor(props) {
        console.log(props.match.params.id)
        super(props);
        this.state = {
            variantes: {
                id: null,
                ref: props.match.params.ref,
                tamanho: "",
                imagens: [],
                cor: "",
                stock: 0
            },
            imagens: []
        }
    }


    toggle = () => {
        var addProduto = this.state.produtos;
        addProduto.especial ? addProduto.especial = false : addProduto.especial = true
        this.setState({ produtos: addProduto })
    }

    handleSubmit = (event) => {
        event.preventDefault();


    }

    componentDidMount() {
        api.GetVariantesProduto()
    }

    updateImagens = (event) => {
        var numFicheiros = event.target.files.length;
        if (file.files.length > 0) {
            const currentFiles = this.state.imagens;
            for (let index = 0; index < numFicheiros; index++) {
                currentFiles.push({
                    fileInput: file.files[index],
                    fileName: file.files[index].name,
                });
            }

            this.setState({
                imagens: currentFiles,
            });
        }
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

    render() {
        return (
            <div>
                {this.state.variantes.id === null ?
                    <h1>Adicionar Variante</h1> :
                    <h1>Editar Variante</h1>
                }
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    Tamanho: <input id="Tamanho" value={this.state.variantes.tamanho} onChange={(e) => this.updateField(e, "preco")}></input>
                    <p></p>
                    Imagens: <input type="file" name="file" onChange={(e) => this.updateImagens(e)} ref={(input) => { file = input; }} multiple />
                    <p></p>
                    Cor: <input id="Preco" value={this.state.variantes.cor} onChange={(e) => this.updateField(e, "preco")}></input>
                    <p></p>
                    <Link to="/dashboard"><button >Voltar</button></Link>
                    <button type="submit">Adicionar</button>
                </form>
            </div>
        );
    }
}

export default withRouter(FormProduto);