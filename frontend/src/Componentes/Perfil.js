import React from "react";
import { withRouter } from 'react-router-dom'
import distritos from "../shared/distritos"
import cidades from "../shared/cidades"
import api from "../shared/api"

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
            console.log(data)
        })
    }


    render() {
        return (
            

            <div style={{background:"red"}}>
                <form className="dadosPessoaisForm"  onSubmit={(e) => this.handleSubmit(e)}>
                    Contacto: <input maxLength="9" type="text" value={this.state.morada.contacto} id="Contacto" onChange={(e) => this.updateField(e, "contacto")}></input><p></p>
                    Distrito: <select id="Distrito" value={this.state.morada.distrito} onChange={(e) => this.updateField(e, "distrito")}>
                        {this.state.distritos.map((pos) => {
                            return (
                                <option value={pos}>{pos}</option>
                                )
                            })}
                    </select>
                    Cidade: <select id="Cidade" value={this.state.morada.cidade} onChange={(e) => this.updateField(e, "cidade")}>
                        {this.state.cidades.map((pos) => {
                            if (pos.distrito === this.state.morada.distrito) {
                                return (
                                    <option value={pos.cidade}>{pos.cidade}</option>
                                    );
                                }
                            })}
                    </select><p></p>
                    Rua/casa: <input id="RuaCasa" value={this.state.morada.ruaCasa} onChange={(e) => this.updateField(e, "ruaCasa")}></input><p></p>
                    Codigo Postal: <input maxLength="8" id="CodigoPostal" value={this.state.morada.codPostal} onChange={(e) => this.updateField(e, "codPostal")}></input><p></p>
                    <button type="submit">Adicionar</button>
                </form>
                {this.renderErros()}
            </div>
                           
        )
    }
}

export default withRouter(Perfil);