import React from "react";
import { withRouter } from "react-router-dom";
import Switch from "./Switch"
import api from "../shared/api"
import emailjs from "emailjs-com"
import { v4 as uuidv4 } from 'uuid';

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
      return (
        <div className="erros">
          Nome de utilizador tem de ter pelo menos 6 caracteres
        </div>
      )
    }
    else if (!this.state.emailValid) {
      return (
        <div className="erros">
          Já existe uma conta com este email
        </div>
      )
    }
    else if (!this.state.formValid) {
      return (
        <div className="erros">
          Os campos não podem ser vazios
        </div>
      )
    }
    else if (this.state.userRepetido) {
      return (
        <div className="erros">
          Já existe uma conta com este username
        </div>
      )
    }
    else if (!this.state.passwordValid) {
      return (
        <div className="erros">
          Palavra passe tem de ter pelo menos 6 caracteres
        </div>
      )
    }
    else if (!this.state.userExists) {
      return (
        <div className="erros">
          Username não existe
        </div>
      )
    }
    else if (!this.state.passwordCerta) {
      return (
        <div className="erros">
          Palavra passe errada
        </div>
      )
    }
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

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
                this.sendEmail()
                this.myFormRef.reset();
                this.setState({ acao: "log" })
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

  toggleAcao = (acao) => {
    acao === "reg" ? this.setState({ acao: "reg" }) : this.setState({ acao: "log" })
    this.setState({
      userValid: true,
      emailValid: true,
      passwordValid: true,
      passwordCerta: true,
      userRepetido: false,
      userExists: true,
      formValid: true,
    })
  }

  updateField = (event, fieldName) => {
    var user2 = this.state.user;
    user2[fieldName] = event.target.value;

    this.setState({ user: user2 })

    event.preventDefault();
  }

  renderForm = () => {
    if (this.state.acao === "log") {
      return (
        <div >
          <div className="formLogin">
            <div className="signHeader"><h1>Login</h1></div>
            <div className="userLabel">
              <input className="inputUser"
                id="UserLogin"
                onChange={(e) => this.updateField(e, "username")}
                placeholder="Username"
              ></input>
            </div>
            <div className=
              'passLabel'>
              <input
                id="PassLogin"
                type="password"
                onChange={(e) => this.updateField(e, "password")}
                placeholder="Password"
              ></input>
            </div>
            <div className="labelGuardarDados">
              Guardar dados:
            </div>
            <Switch
              className="switchGuardarDados"
              handleToggle={() => this.toggleCheck()}
              checked={this.state.checked}
            />
            {this.renderErros()}
            <button className="buttonForm" type="submit">Login</button>
            <a>Ainda não tem conta?<a style={{ textDecoration: "underline", color: 'blue' }} onClick={() => this.toggleAcao("reg")}> Clique aqui</a> para criar uma</a>
          </div>
        </div>
      );
    } else {
      return (
        <div >
          <div className="formLogin">
            <div className="signHeader"><h1>Sign Up</h1></div>
            <div className="userLabel">
              <input className="inputUser"
                id="UserLogin"
                onChange={(e) => this.updateField(e, "username")}
                placeholder="Username"
              ></input>
            </div>
            <div className="passLabel"><input
              id="EmailRegister"
              type="email"
              onChange={(e) => this.updateField(e, "email")} placeholder="Email"
            ></input></div>
            <div className=
              'passLabel'>
              <input
                id="PassLogin"
                type="password"
                onChange={(e) => this.updateField(e, "password")}
                placeholder="Password"
              ></input>
            </div>
            <div className="labelGuardarDados">
              Guardar dados:
            </div>
            {this.renderErros()}
            <button className="buttonForm" type="submit">Registar</button>
            <a>Já tem conta? <a style={{ textDecoration: "underline", color: 'blue' }} onClick={() => this.toggleAcao("log")}>Clique aqui</a> para fazer Login</a>
          </div>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <form ref={(el) => this.myFormRef = el} onSubmit={(e) => this.handleSubmit(e)}>
          {this.renderForm()}
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
