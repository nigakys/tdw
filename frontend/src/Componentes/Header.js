import React from "react";
import { NavLink } from "react-router-dom";


class Header extends React.Component{



    
    render(){
        
        
        return (<div>
            <div className="div1">
                <nav class="nav">
            <div class="loja">
                <h2>Loja</h2>
        </div>
        <div class="nav-menu">
        <ul class="nav-links">
        <NavLink className="navlink" to="/Dashboard">Dashboard</NavLink>
            <li>
                <a href="#home">Home</a>
            </li>
            <li>
                <a href="#special">Especial</a>
            </li>
            <li>
                <a href="#container_produtos">Novidades</a>
            </li>
            <li>
                <a href="#subscrever">Newsletter</a>
            </li>
         </ul>
        </div>
        <div class="icons">
               <div class="coluna">
                
               </div>
              
                <div class="coluna">
                    
                </div>
              
               <div class="coluna"> 
                <img src="imagens/cart.png" alt="erro"></img>
               </div>
          
             

             </div>

          <div class="menu">
              <div class="line1"></div>
              <div class="line2"></div>
              <div class="line3"></div>

          </div>
        
     

            </nav>
            </div>






         
            
        </div>)
    }


}

export default Header;

