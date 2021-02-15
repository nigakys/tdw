import React from "react";
import { NavLink } from "react-router-dom";


class Header extends React.Component{


    componentDidMount(){
        randomNavHeaderColor();
        navSlide();
        teste();
        teste1();
    }

    render(){
        
        
        return (<div> 
            <div className="header">
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
               <img src="../imagens/user.png" alt="erro"></img>
                
               </div>
              
                <div class="coluna">
                <img src="../imagens/pes.png" alt="erro"></img>
                    
                </div>
              
               <div class="coluna"> 
                <img src="../imagens/cart.png" alt="erro"></img>
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
 
var colorr

function randomNavHeaderColor() {
  const nav = document.querySelector(".nav");
  const header = document.querySelector(".header");
  const navLinks = document.querySelector(".nav-links");

  var color = ["#62C3D6", "#DED87F", "#B25FE8"];
  var random = 0;

  window.addEventListener("load", () => {
    random = Math.abs(Math.floor(Math.random() * 10 - 1));

    if (random >= 0 && random <= 2) {
      nav.style.backgroundColor = color[0];
      header.style.backgroundColor = color[0];
      navLinks.style.backgroundColor = color[0];
      colorr = 0
    } else if (random > 2 && random <= 5) {
      nav.style.backgroundColor = color[1];
      header.style.backgroundColor = color[1];
      navLinks.style.backgroundColor = color[1];
      colorr = 1
    } else if (random > 5 && random <= 8) {
      nav.style.backgroundColor = color[2];
      header.style.backgroundColor = color[2];
      navLinks.style.backgroundColor = color[2];
      colorr = 2
    }
  });
};
function navSlide(){ 
  const menu = document.querySelector(".menu");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");

  menu.addEventListener("click", () => {
    // Toggle Nav

    nav.classList.toggle("nav-active");

    // Animte Links

    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${
          index / 7 + 0.5}s`;
      }
    });

    // Menu Animation

    menu.classList.toggle("toggle");
  });
};

// hover img
function teste(){
  var color = ["#86e6f9", "#DED87F", "#B25FE8"];

  
  document.querySelectorAll(".div_cadaProduto img").forEach((item) => {
    item.addEventListener("mouseenter", () => {
      item.style.backgroundColor = color[colorr];
     
    });
  });
  
};


function teste1(){
  document.querySelectorAll(".div_cadaProduto img ").forEach((item) => {
    item.addEventListener("mouseleave", () => {
      item.style.backgroundColor = '#e6e0e0';
     
    });
  });
};


  







export default Header;

