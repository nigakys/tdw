import React from "react";
import { withRouter } from 'react-router-dom'
import distritos from "../shared/distritos"
import cidades from "../shared/cidades"
import api from "../shared/api"
import { NavLink } from "react-router-dom";

class Perfil extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            morada: {
                codPostal: "",
                contacto: "",
                cidade: "",
                ruaCasa: "",
                distrito: "Açores"
            },
            validoCod: true,
            validoContacto: true,
            distritos: distritos,
            cidades: cidades
        };
    }
    logout = () => {
        sessionStorage.clear();
        window.location.href = "/Login"
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const regexCod = /\d{4}([\-]\d{3})?$/

        this.state.morada.contacto.length == 9 ? this.state.validoContacto = true : this.state.validoContacto = false;
        this.state.morada.codPostal.length == 8 ? this.state.validoCod = true : this.state.validoCod = false;
        var valido = regexCod.test(this.state.morada.codPostal)
        this.setState({ validoCod: valido })
        if (this.state.validoCod && this.state.validoContacto) {
            api.updateMorada(this.state.morada, sessionStorage.userid)
        }
    }

    renderErros = () => {
        if (!this.state.validoContacto) {
            return (
                <div className="erros">
                    Numero de telemovel invalido
                </div>
            )
        }
        else if (!this.state.validoCod) {
            return (
                <div className="erros">
                    Código postal inválido
                </div>
            )
        }
    }

    updateField = (event, fieldName) => {
        var morada2 = this.state.morada;

        if (fieldName === "contacto" && isNaN(event.target.value)) {
            morada2["contacto"] = event.target.value.replace(/\D/, '')
        }
        else if (fieldName === "codPostal") {
            if (event.target.value.length == 4) {
                event.target.value += '-'
            }
            morada2[fieldName] = event.target.value;
        }
        else {
            morada2[fieldName] = event.target.value;
        }
        this.setState({ morada: morada2 })
        event.preventDefault();
    }

    componentDidMount() {
        api.GetUser(sessionStorage.username).then((data) => {
            this.setState({ morada: data.morada })
        })
    }


    render() {
        return (
            <div style={{background:"grey"}}><h1 className="dadospessoais">Dados Pessoais</h1>
                <form className="dadosPessoaisForm" onSubmit={(e) => this.handleSubmit(e)}><div className="divDados">
                    <a>
                        Contacto: </a>
                    <input maxLength="9" type="text" value={this.state.morada.contacto} id="Contacto" onChange={(e) => this.updateField(e, "contacto")}></input>
                    <p></p><a>
                        Distrito: </a><select id="Distrito" value={this.state.morada.distrito} onChange={(e) => this.updateField(e, "distrito")}>
                        {this.state.distritos.map((pos) => {
                            return (
                                <option value={pos}>{pos}</option>
                            )
                        })}
                    </select><a>

                        Cidade:
                    </a>
                    <select id="Cidade" value={this.state.morada.cidade} onChange={(e) => this.updateField(e, "cidade")}>
                        {this.state.cidades.map((pos) => {
                            if (pos.distrito === this.state.morada.distrito) {
                                return (
                                    <option value={pos.cidade}>{pos.cidade}</option>
                                );
                            }
                        })}
                    </select><p></p>
                    <a>Rua/casa: </a><input id="RuaCasa" value={this.state.morada.ruaCasa} onChange={(e) => this.updateField(e, "ruaCasa")}></input><p></p>
                    <a>Codigo Postal:</a> <input maxLength="8" id="CodigoPostal" value={this.state.morada.codPostal} onChange={(e) => this.updateField(e, "codPostal")}></input>
                </div>
                    <div className="divInfo">
                        <div className="divImgagem">

                        <img src="../imagens/user.png" alt="erro"></img>
                    </div>
                        <div className="divInfoss">
                        <button type="submit" className="buttonForm1">Confirmar</button>
                               <NavLink  style={{color:"white",textDecoration:"none",fontSize:"16px", margin:"0px",textAlign:"center"}} onClick={() => { this.logout() }} to="/Login">Terminar Sessao
                                </NavLink>
                    </div>
                    </div>
                 
                       
                </form>
                {this.renderErros()}
            </div>

        )
    }
}

export default withRouter(Perfil);