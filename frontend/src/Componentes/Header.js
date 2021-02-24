import React from "react";
import { NavLink } from "react-router-dom";

class Header extends React.Component {
  componentDidMount() {
    randomNavHeaderColor();
    navSlide();
  }

  renderLink = () => {
    if (sessionStorage.username != null) {
      return (
        <NavLink to="/Perfil">
          <img
            className="img1"
            src="../imagens/user.png"
            alt="erro"
          ></img>
        </NavLink >
      )
    }
    else {
      return (
        <NavLink to="/Login">
          <img
            className="img1"
            src="../imagens/user.png"
            alt="erro"
          ></img>
        </NavLink >
      )
    }

  }

  render() {
    return (
      <div>
        <div className="header">
          <nav class="nav">
            <div>
              <NavLink className="loja" to="/">Loja</NavLink>
            </div>
            <div class="nav-menu">
              <ul class="nav-links">
                {sessionStorage.isAdmin === true && <li>
                  <NavLink to="/Dashboard">Dashboard</NavLink>
                </li>}
                <li>
                  <NavLink to="/ProdutosEspeciais">Especial</NavLink>
                </li>
                <li>
                  <NavLink to="/Novidades">Novidades</NavLink>
                </li>
                <li>
                  <NavLink to="/Newsletter">Newsletter</NavLink>
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
      colorr = 0;
    } else if (random > 2 && random <= 5) {
      nav.style.backgroundColor = color[1];
      header.style.backgroundColor = color[1];
      navLinks.style.backgroundColor = color[1];
      colorr = 1;
    } else if (random > 5 && random <= 8) {
      nav.style.backgroundColor = color[2];
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
    // Toggle Nav

    nav.classList.toggle("nav-active");

    // Animte Links

    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5
          }s`;
      }
    });

    // Menu Animation

    menu.classList.toggle("toggle");
  });
}

// hover img


export default Header;
