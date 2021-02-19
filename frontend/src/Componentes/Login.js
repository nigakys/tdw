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
            checked: false
        };
    }

    handleSubmit = () => {

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
        console.log(this.state.user)
    }

    renderForm = () => {
        if (this.state.acao === "log") {
            return (
                <div>
                    User: <input id="User" onChange={(e) => this.updateField(e, "user")}></input><p></p>
                    Pass: <input id="Pass" type="password" onChange={(e) => this.updateField(e, "pass")}></input><p></p>
                    Guardar dados: <Switch handleToggle={() => this.toggleCheck()} checked={this.state.checked} />
                    <p></p>
                    <button type="submit">Login</button>
                </div>
            );
        }
        else {
            return (
                <div>
                    User: <input id="User" onChange={(e) => this.updateField(e, "user")}></input><p></p>
                    Email:<input id="Email" type="email" onChange={(e) => this.updateField(e, "email")}></input><p></p>
                    Pass: <input id="Pass" type="password" onChange={(e) => this.updateField(e, "pass")}></input><p></p>
                    <p></p>
                    <button type="submit">Register</button>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <button onClick={() => this.toggleAcao("reg")}>registar</button>
                <button onClick={() => this.toggleAcao("log")}>login</button>
                <form onSubmit={(e) => this.handleSubmit(e, this.state.acao)}>
                    {this.renderForm()}
                </form>
            </div>
        )
    }
}


export default withRouter(Login);