import React from "react";
import { withRouter } from "react-router-dom";
import Switch from "./Switch"
import api from "../shared/api"
import emailjs from "emailjs-com"
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify'


toast.configure()
class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      acao: "log",
      open: false,
      checked: false,
      userValid: true,
      emailValid: true,
      passwordValid: true,
      passwordCerta: true,
      userRepetido: false,
      userExists: true,
      formValid: true,
    };
  }

  renderErros = () => {
    if (!this.state.userValid) {
      document.getElementById("UserRegister").style.border = "0.3px solid #FF0000";
      return (
        <div className="erros">
          Nome de utilizador tem de ter pelo menos 6 caracteres
        </div>
      )
    }
    else if (!this.state.emailValid) {
      document.getElementById("EmailRegister").style.border = "0.3px solid #FF0000";
      return (
        <div className="erros">
          Já existe uma conta com este email
        </div>
      )
    }
    else if (!this.state.formValid) {
      var x = document.getElementsByTagName("input")
      for (let index = 0; index < x.length; index++) {
        if (x[index].value.length === 0) {
          x[index].style.border = "0.3px solid #FF0000";
        }
      }
      return (
        <div className="erros">
          Os campos não podem ser vazios
        </div>
      )
    }
    else if (this.state.userRepetido) {
      document.getElementById("UserRegister").style.border = "0.3px solid #FF0000";
      return (
        <div className="erros">
          Já existe uma conta com este username
        </div>
      )
    }
    else if (!this.state.passwordValid) {
      document.getElementById("PasswordRegister").style.border = "0.3px solid #FF0000";
      return (
        <div className="erros">
          Palavra passe tem de ter pelo menos 6 caracteres
        </div>
      )
    }
    else if (!this.state.userExists) {
      document.getElementById("UserLogin").style.border = "0.3px solid #FF0000";
      return (
        <div className="erros">
          Username não existe
        </div>
      )
    }
    else if (!this.state.passwordCerta) {
      document.getElementById("PasswordLogin").style.border = "0.3px solid #FF0000";
      return (
        <div className="erros">
          Palavra passe errada
        </div>
      )
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.acao === "reg") {
      if (this.state.user.username === undefined || this.state.user.email === undefined || this.state.user.password === undefined) {
        this.setState({ formValid: false })
      }
      else {
        this.setState({ formValid: true })
        api.GetEmail(this.state.user.email).then((data) => {
          data === null ? this.setState({ emailValid: false }) : this.setState({ emailValid: true })
          api.GetUser(this.state.user.username).then((data) => {
            data === null ? this.setState({ userRepetido: false }) : this.setState({ userRepetido: true })

            this.state.user.username.length < 6 ? this.setState({ userValid: false }) : this.setState({ userValid: true })

            this.state.user.password.length < 6 ? this.setState({ passwordValid: false }) : this.setState({ passwordValid: true })

            if (this.state.userValid && this.state.passwordValid && this.state.emailValid && !this.state.userRepetido) {
              this.state.user.token = uuidv4();
              this.state.user.morada = {
                codPostal: "",
                contacto: "",
                cidade: "",
                ruaCasa: "",
                distrito: "Açores"
              }
              api.criarUser(this.state.user).then(() => {
                toast.success('Conta criada com sucesso, verifique o seu email para validar a conta', { position: toast.POSITION.TOP_CENTER })
                this.sendEmail()
                this.SignIn();
              }).catch((err) => console.log(err))
            }
          })
        }).catch((error) => { console.log(error) })
      }


    } else {
      if (this.state.user.username === undefined || this.state.user.password === undefined) {
        this.setState({ formValid: false })
      }
      else {
        this.setState({ formValid: true })
        api.GetUser(this.state.user.username).then((data) => {
          if (data != null && this.state.password != "") {
            this.setState({ userExists: true })
            var bcrypt = require("bcryptjs")

            bcrypt.compare(this.state.user.password, data.password).then((result) => {
              if (result) {
                sessionStorage.username = data.username;
                sessionStorage.userid = data._id;
                sessionStorage.email = data.email;
                sessionStorage.isAdmin = data.isAdmin;
                sessionStorage.verified = data.verified
                window.location.href = "/"
              }
              else {
                this.setState({ passwordCerta: false })
              }
            })
          }
          else {
            this.setState({ userExists: false })
          }
        }).catch((error) => { console.log(error) })
        if (this.state.checked) {
        }
      }
    }
  }

  sendEmail = () => {
    emailjs.send("service_5vkotgq", "template_90a2eav", {
      username: this.state.user.username,
      email: this.state.user.email,
      id: this.state.user.token
    }, "user_mnL0jcsUKU7Dg1I4C3rHU");
  }

  toggleCheck = () => {
    this.state.checked ? this.setState({ checked: false }) : this.setState({ checked: true })
  }

  updateField = (event, fieldName) => {
    var user2 = this.state.user;
    user2[fieldName] = event.target.value;

    this.setState({ user: user2 })

    event.preventDefault();
  }

  resetValidacoes = () => {
    this.setState({ user: {} })
    this.setState({
      userValid: true,
      emailValid: true,
      passwordValid: true,
      passwordCerta: true,
      userRepetido: false,
      userExists: true,
      formValid: true,
    })
    var x = document.getElementsByTagName("input")
    for (let index = 0; index < x.length; index++) {
      x[index].style.border = "none";
    }
  }

  SignUp = () => {
    this.setState({ acao: "reg" })
    this.resetValidacoes();
    this.registerForm.reset()
    const signUpButton = document.getElementById('signUp');
    const container = document.getElementById('container');
    if (signUpButton != null) {
      container.classList.add("right-panel-active");
    }
  }

  SignIn = () => {
    this.setState({ acao: "log" })
    this.resetValidacoes();
    this.loginForm.reset();
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');
    if (signInButton != null) {
      container.classList.remove("right-panel-active");
    }
  }


  render() {
    return (
      <div className="yes">
        <div className="background">
          <div class="containerLogin" id="container">
            <div class="form-container sign-up-container">
              <form className="form" ref={(el) => this.registerForm = el} onSubmit={(e) => this.handleSubmit(e)}>
                <h1 className="h1">Criar Conta</h1>
                <span></span>
                <input id="UserRegister" value={this.state.user.username}
                  onChange={(e) => this.updateField(e, "username")} type="text" placeholder="Username" />
                <input id="EmailRegister" value={this.state.user.email}
                  onChange={(e) => this.updateField(e, "email")} type="email" placeholder="Email" />
                <input id="PasswordRegister" value={this.state.user.password}
                  onChange={(e) => this.updateField(e, "password")} type="password" placeholder="Password" />
                {this.renderErros()}
                <button className="button">Registar</button>
              </form>
            </div>
            <div class="form-container sign-in-container">
              <form className="form" ref={(el) => this.loginForm = el} onSubmit={(e) => this.handleSubmit(e)}>
                <h1 className="h1">Entrar</h1>
                <span ></span>
                <input id="UserLogin" value={this.state.user.username}
                  onChange={(e) => this.updateField(e, "username")} type="text" placeholder="Username" />
                <input id="PasswordLogin" value={this.state.user.password}
                  onChange={(e) => this.updateField(e, "password")} type="password" placeholder="Password" />
                {this.renderErros()}
                <button className="button">Login</button>
              </form>
            </div>
            <div class="overlay-container">
              <div class="overlay">
                <div class="overlay-panel overlay-left">
                  <h1 className="h1">Bem vindo de volta!</h1>
                  <p className="p"> Para te manteres conectado faz login.</p>
                  <button onClick={() => this.SignIn()} className="button buttonghost" id="signIn">Login</button>
                </div>
                <div class="overlay-panel overlay-right">
                  <h1 className="h1">Olá!</h1>
                  <p className="p">Regista-te para uma melhor experiência!</p>
                  <button onClick={() => this.SignUp()} className="button buttonghost" id="signUp">Registar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
