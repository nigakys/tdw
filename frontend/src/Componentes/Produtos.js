import React from 'react';

class Produtos extends React.Component {
  

    render() {

        return (
            <div>
                   <section class="container_produtos">
               
                <div class="div_produtos">
                  {this.props.produtos.map((pos) => {
                    return (
                      <div>
                        <div class="div_cadaProduto">
                          <img
                            onMouseEnter={this.props.MouseEnter}
                            onMouseLeave={this.props.MouseLeave}
                            src={"http://localhost:4000/files/" + pos.imagem}
                          ></img>
                          <div className="infoProduto">
                            <div className="nomeProduto">{pos.nome}</div>
                            <div className="precoProduto">
                              {pos.preco + "$"}
                            </div>
                            <div>cor</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
           
            </div>
           
              

            
        )
    }
}

export default Produtos;