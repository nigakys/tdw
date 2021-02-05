import React from "react";

class PaginaPrincipal extends React.Component{
    render(){
        return(<div>
            
            <section id="home"  class="home">
                <div class="home_container">
                    <div class="home_data"><h2>NOVOS</h2>
                        <span>PRODUTOS</span>
                        <a href="#" class="butoon">Compras</a>
                    </div>
                     
                </div>

 
                    </section>
             <section id="special" class="special">
                        <div>
                            <h2>Produtos Especiais</h2>
                            <span>Ver todos</span>
                        </div>
                        <div class="card">
                            <div class="imgspe">
                               

                            </div>
                            <div class="contentBox">
                                <h2>tenis</h2>
                                <div class="size">
                                    <h3>Size</h3>
                                    <span>7</span>
                                    <span>8</span>
                                    <span>9</span>
                                    <span>10</span>
                                </div>
                                <div class="cor">
                                    <h3>Cor</h3>
                                    <span>7</span>
                                    <span>8</span>
                                    <span>9</span>
                                    <span>10</span>
                                </div>
                                
                            </div>
                        </div>
                        
                    
                        </section>

                    <section id="container_produtos" class="container_produtos">
                        <div> <h2>Novos Produtos</h2>
                        <span>ver todos</span> 
                    </div>

                    <div class="div_produtos">
                        <div class="div_cadaProduto">
                                             
                    
                           </div>

                    </div>
                </section>
                <section id="subscrever" class="subscrever">
                    <div><h2>Newsletter</h2><span>promocoes etc</span>
                    </div>
                </section>
                           

        </div>)
    }

}

export default PaginaPrincipal;