import React from "react";
import { withRouter } from "react-router-dom";
import Switch from "./Switch"
import api from "../api"
import emailjs from "emailjs-com"
import { v4 as uuidv4 } from 'uuid';

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
            passwordCerta: true
        };
    }

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
                        this.myFormRef.reset();
                        this.setState({ acao: "log" })
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
        else if (!this.state.passwordValid) {
            return (
                <div className="erros">
                    Palavra passe tem de ter pelo menos 6 caracteres
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
        else if (!this.state.passwordCerta) {
            return (
                <div className="erros">
                    Palavra passe errada
                </div>
            )
        }
    }

    renderForm = () => {
        if (this.state.acao === "log") {
            return (
                <div>
                    User: <input id="UserLogin" onChange={(e) => this.updateField(e, "username")}></input><p></p>
                    Pass: <input id="PassLogin" type="password" onChange={(e) => this.updateField(e, "password")}></input><p></p>
                    Guardar dados: <Switch handleToggle={() => this.toggleCheck()} checked={this.state.checked} />
                    <p></p>
                    <button type="submit">Login</button>
                </div>
            );
        }
        else {
            return (
                <div>
                    User: <input id="UserRegister" onChange={(e) => this.updateField(e, "username")}></input><p></p>
                    Email:<input id="EmailRegister" type="email" onChange={(e) => this.updateField(e, "email")}></input><p></p>
                    Pass: <input id="PassRegister" type="password" onChange={(e) => this.updateField(e, "password")}></input><p></p>
                    {}
                    <p></p>
                    <button type="submit" >Register</button>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <button onClick={() => this.toggleAcao("reg")}>registar</button>
                <button onClick={() => this.toggleAcao("log")}>login</button>

                <form ref={(el) => this.myFormRef = el} onSubmit={(e) => this.handleSubmit(e)}>
                    {this.renderForm()}
                    {this.renderErros()}
                </form>
            </div>
        )
    }
}


export default withRouter(Login);