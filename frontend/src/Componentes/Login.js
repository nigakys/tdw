import React from "react";
import { withRouter } from "react-router-dom";
<<<<<<< HEAD
import Switch from "./Switch";
import api from "../api";
=======
import Switch from "./Switch"
import api from "../api"
import emailjs from "emailjs-com"
import { v4 as uuidv4 } from 'uuid';
>>>>>>> c40a2403abe36b4893dc1115b9d66dd30a21c6cb

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      acao: "log",
      checked: false,
      userValid: true,
      emailValid: true,
      passwordValid: true,
      passwordCerta: true,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.acao === "reg") {
      api
        .GetEmail(this.state.user.email)
        .then((data) => {
          data === null
            ? this.setState({ emailValid: false })
            : this.setState({ emailValid: true });

          this.state.user.username.length < 6
            ? this.setState({ userValid: false })
            : this.setState({ userValid: true });

          this.state.user.password.length < 6
            ? this.setState({ passwordValid: false })
            : this.setState({ passwordValid: true });

          if (
            this.state.userValid &&
            this.state.passwordValid &&
            this.state.emailValid
          ) {
            api.criarUser(this.state.user);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      api
        .GetUser(this.state.user.username)
        .then((data) => {
          var bcrypt = require("bcryptjs");

          bcrypt
            .compare(this.state.user.password, data.password)
            .then((result) => {
              if (result) {
                sessionStorage.username = data.username;
                sessionStorage.userid = data._id;
                sessionStorage.email = data.email;
                window.location.href = "/";
              } else {
                this.setState({ passwordCerta: false });
              }
            });
        })
        .catch((error) => {
          console.log(error);
        });

      if (this.state.checked) {
      }
    }
<<<<<<< HEAD
  };

  toggleCheck = () => {
    this.state.checked
      ? this.setState({ checked: false })
      : this.setState({ checked: true });
  };

  toggleAcao = (acao) => {
    acao === "reg"
      ? this.setState({ acao: "reg" })
      : this.setState({ acao: "log" });
  };

  updateField = (event, fieldName) => {
    var user2 = this.state.user;
    user2[fieldName] = event.target.value;

    this.setState({ user: user2 });

    event.preventDefault();
  };

  renderErros = () => {
    if (!this.state.userValid) {
      return (
        <div className="erros">
          Nome de utilizador tem de ter pelo menos 6 caracteres
        </div>
      );
    } else if (!this.state.emailValid) {
      return <div className="erros">Já existe uma conta com este email</div>;
    } else if (!this.state.passwordValid) {
      return (
        <div className="erros">
          Palavra passe tem de ter pelo menos 6 caracteres
        </div>
      );
    } else if (!this.state.passwordValid) {
      return (
        <div className="erros">
          Palavra passe tem de ter pelo menos 6 caracteres
        </div>
      );
    } else if (!this.state.passwordCerta) {
      return <div className="erros">Palavra passe errada</div>;
=======

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.acao === "reg") {
            api.GetEmail(this.state.user.email).then((data) => {
                data === null ? this.setState({ emailValid: false }) : this.setState({ emailValid: true })

                this.state.user.username.length < 6 ? this.setState({ userValid: false }) : this.setState({ userValid: true })

                this.state.user.password.length < 6 ? this.setState({ passwordValid: false }) : this.setState({ passwordValid: true })

                if (this.state.userValid && this.state.passwordValid && this.state.emailValid) {
                    this.state.user.token = uuidv4();
                    api.criarUser(this.state.user).then(() => {
                        this.sendEmail()
                    }).catch((err) => console.log(err))
                }
            }).catch((error) => { console.log(error) })

        } else {
            api.GetUser(this.state.user.username).then((data) => {
                var bcrypt = require("bcryptjs")

                bcrypt.compare(this.state.user.password, data.password).then((result) => {
                    if (result) {
                        sessionStorage.username = data.username;
                        sessionStorage.userid = data._id;
                        sessionStorage.email = data.email;
                        window.location.href = "/"
                    }
                    else {
                        this.setState({ passwordCerta: false })
                    }
                })
            }).catch((error) => { console.log(error) })

            if (this.state.checked) {
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
    }

    updateField = (event, fieldName) => {
        var user2 = this.state.user;
        user2[fieldName] = event.target.value;

        this.setState({ user: user2 })

        event.preventDefault();
>>>>>>> c40a2403abe36b4893dc1115b9d66dd30a21c6cb
    }
  };

  renderForm = () => {
    if (this.state.acao === "log") {
      return (
          <div >

        <div className="formLogin">
          <div className="signHeader"><h1>Sign Up</h1></div>
          <div className="userLabel">
           {" "}
            <input className="inputUser"
              id="UserLogin"
              onChange={(e) => this.updateField(e, "username")}
              placeholder="Username"
              ></input>
          </div>
          <div className=
          'passLabel'>
            {" "}
            <input
              id="PassLogin"
              type="password"
              onChange={(e) => this.updateField(e, "password")}
              placeholder="Password"
              ></input>
          </div>
          <div className="labelGuardarDados"> 
            Guardar dados:{" "}
            </div>
            <Switch
              className="switchGuardarDados"
              handleToggle={() => this.toggleCheck()}
              checked={this.state.checked}
              />
               {this.renderErros()}
         
          <button className="buttonForm" type="submit">Login</button>
          <button onClick={() => this.toggleAcao("reg")}>registar</button>
     
       
        </div>
      </div>
      );
    } else {
      return (
        <div >

        <div className="formLogin">
          <div className="signHeader"><h1>Sign Up</h1></div>
          <div className="userLabel">
           {" "}
            <input className="inputUser"
              id="UserLogin"
              onChange={(e) => this.updateField(e, "username")}
              placeholder="Username"
              ></input>
          </div>
          <div className="passLabel"><input
            id="EmailRegister"
            type="email"
            onChange={(e) => this.updateField(e, "email")}placeholder="Email"
          ></input></div>
          <div className=
          'passLabel'>
            {" "}
            <input
              id="PassLogin"
              type="password"
              onChange={(e) => this.updateField(e, "password")}
              placeholder="Password"
              ></input>
          </div>
          <div className="labelGuardarDados"> 
            Guardar dados:{" "}
            </div>
            {this.renderErros()}
         
          <button className="buttonForm" type="submit">Registar</button>
          <button onClick={() => this.toggleAcao("log")}>login</button>

        </div>
      </div>
     
      );
    }
  };

  render() {
    return (
      <div>
       
        <form onSubmit={(e) => this.handleSubmit(e)}>
          {this.renderForm()}
         
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
