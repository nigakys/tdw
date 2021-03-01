import React from "react";
import { NavLink } from "react-router-dom";

class Header extends React.Component {
  componentDidMount() {
    randomNavHeaderColor();
    navSlide();
  }


  renderLink = () => {
    if (sessionStorage.username != null) {
      return (<>


        <NavLink to="/Perfil">
          <img
            className="img1"
            src="../imagens/pessoa.png"
            alt="erro"
          ></img>
        </NavLink >
      </>
      )
    }
    else {
      return (
        <NavLink to="/Login">
          <img
            className="img1"
            src="../imagens/pessoa.png"
            alt="erro"
          ></img>
        </NavLink >
      )
    }
  }

  getCarrinhoCount = () => {
    var count = 0;
    var cart = JSON.parse(localStorage.carrinho);
    for (let index = 0; index < cart.length; index++) {
      count += cart[index].quantidade;
    }
    return count
  }

  render() {
    return (
      <div>
        <div id="header" className="header">
          <nav class="nav">
            <div style={{ textAlign: "center" }}>
              <NavLink style={{ textDecoration: "none" }} to="/">
                <div className="loja">
                  Loja
                </div>
                <a className="sub">TDW</a>
              </NavLink>
            </div>
            <div class="nav-menu">
              <ul class="nav-links">
                {sessionStorage.isAdmin === "true" && <li>
                  <NavLink to="/Dashboard">Dashboard</NavLink>
                </li>}
                <li>
                  <NavLink to="/ProdutosMasculinos">Homem</NavLink>
                </li>
                <li>
                  <NavLink to="/ProdutosFemininos">Mulher</NavLink>
                </li>
                <li>
                  <NavLink to="/Produtos">Produtos</NavLink>
                </li>
              </ul>
            </div>
            <div class="icons">
              <div class="coluna">
                {this.renderLink()}
              </div>

              <div class="coluna"><NavLink to="/">

                <img src="../imagens/pes.png" alt="erro"></img>
              </NavLink>
              </div>

              <div className="coluna">
                <NavLink to="/Carrinho">
                  <img src="../imagens/saco.png" alt="erro"></img>
                  <span className='badge badge-warning' id='cartCounter'>{this.getCarrinhoCount()}</span>
                </NavLink>
              </div>
            </div>

            <div class="menu">
              <div class="line1"></div>
              <div class="line2"></div>
              <div class="line3"></div>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}
function alert() {
  const img = document.querySelector(".img1");

  img.addEventListener("imageClick", () => { });
}

var colorr;

function randomNavHeaderColor() {
  const header = document.querySelector(".header");
  const navLinks = document.querySelector(".nav-links");

  var color = ["rgba(172,111,226)", "rgba(143,107,244)", "rgba(104,107,236)"];
  var random = 0;

  window.addEventListener("load", () => {
    random = Math.abs(Math.floor(Math.random() * 10 - 1));

    if (random >= 0 && random <= 2) {
      header.style.backgroundColor = color[0];
      navLinks.style.backgroundColor = color[0];
      colorr = 0;
    } else if (random > 2 && random <= 5) {
      header.style.backgroundColor = color[1];
      navLinks.style.backgroundColor = color[1];
      colorr = 1;
    } else if (random > 5 && random <= 8) {
      header.style.backgroundColor = color[2];
      navLinks.style.backgroundColor = color[2];
      colorr = 2;
    }
    sessionStorage.setItem("cor", colorr)
  });
}
function navSlide() {
  const menu = document.querySelector(".menu");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");

  menu.addEventListener("click", () => {

    nav.classList.toggle("nav-active");

    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5
          }s`;
      }
    });


    menu.classList.toggle("toggle");
  });
}



export default Header;
