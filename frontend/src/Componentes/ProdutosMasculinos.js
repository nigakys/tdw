import React from 'react';
import { Link } from "react-router-dom";

class ProdutosMasculinos extends React.Component {
  render() {
    return (
      <div>
        <section class="container_produtos">
          <div class="div_produtos">
            {this.props.produtos.map((pos) => {
              if (pos.genero === "Masculino") {
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
            })}

          </div>


        </section>

      </div>




    )
  }
}

export default ProdutosMasculinos;