import React from 'react';
import { Link } from "react-router-dom";
import api from "../shared/api"

class ProdutosMasculinos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categorias: [],
      produtosMostrar: this.props.produtos,
      produtos: this.props.produtos,
      selectedCategoria: "Todos"
    };
  }
  componentDidMount() {
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
        if (pos.tipo === event.target.value ) {
          produtos.push(pos)
        }
      })
    }

    this.setState({ produtosMostrar: produtos, selectedCategoria: event.target.value })
  }
  render() {
    return (
      <div>
        <section class="container_produtos">
          Categoria: <select style={{ width: "30%" }} id="Categoria" value={this.state.selectedCategoria} onChange={(e) => this.updateField(e)}>
            <option value="Todos">Todos</option>
            {this.state.categorias.map((pos) => {
              return (
                <option value={pos.categoria}>{pos.categoria}</option>
              )
            })}
          </select>
          <div class="div_produtos">
            {this.state.produtosMostrar.length != 0 ?
              this.state.produtosMostrar.map((pos) => {
                if (pos.genero === "Masculino" || pos.genero==="Unissexo") {
                  return (
                    <div>
              <div class="div_cadaProduto">
                <img
                  onMouseEnter={this.props.MouseEnter}
                  onMouseLeave={this.props.MouseLeave}
                  src={"http://localhost:4000/files/" + pos.imagem}
                ></img>
                <div className="infoProduto">
                  <Link style={{ textDecoration: "none" }} to={"/Produto/" + pos.ref}><div className="nomeProduto">{pos.nome}</div></Link>
                  <div className="precoProduto">
                    {pos.preco + "$"}
                  </div>
                  <div>cor</div>
                </div>
              </div>
            </div>
                  );
                }
              })
              :
              <div style={{margin:"300px",fontSize:"21px"}}>
              Não existem produtos para a sua pesquisa
            </div>
            }

          </div>
        </section>
      </div>
    )
  }
}

export default ProdutosMasculinos;