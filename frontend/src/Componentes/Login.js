import React from "react";
import { withRouter } from "react-router-dom";
import Switch from "./Switch"
import api from "../api"

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            acao: "log",
            checked: false,
            ola: ""
        };
    }

    handleSubmit = (event) => {
        if (this.state.acao === "reg") {
            api.criarUser(this.state.user)
        } else {
            api.GetUser(this.state.user.username).then((data) => {
                console.log(data)
            }).catch((error)=>{console.log(error)})

            if (this.state.checked) {
            }
        }
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

    renderForm = () => {
        if (this.state.acao === "log") {
            return (
                <div>
                    User: <input id="UserLogin" onChange={(e) => this.updateField(e, "username")}></input><p></p>
                    Pass: <input id="PassLogin" type="password" onChange={(e) => this.updateField(e, "password")}></input><p></p>
                    Guardar dados: <Switch handleToggle={() => this.toggleCheck()} checked={this.state.checked} />
                    <p></p>
                    <button onClick={(e) => this.handleSubmit(e)} >Login</button>
                </div>
            );
        }
        else {
            return (
                <div>
                    User: <input id="UserRegister" onChange={(e) => this.updateField(e, "username")}></input><p></p>
                    Email:<input id="EmailRegister" type="email" onChange={(e) => this.updateField(e, "email")}></input><p></p>
                    Pass: <input id="PassRegister" type="password" onChange={(e) => this.updateField(e, "password")}></input><p></p>
                    <p></p>
                    <button onClick={(e) => this.handleSubmit(e)} >Register</button>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <button onClick={() => this.toggleAcao("reg")}>registar</button>
                <button onClick={() => this.toggleAcao("log")}>login</button>

                <form onSubmit={(e) => this.handleSubmit(e)}>
                    {this.renderForm()}
                </form>
            </div>
        )
    }
}


export default withRouter(Login);