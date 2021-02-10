import React from "react";
import { Route, Switch } from "react-router-dom";
import PaginaPrincipal from "./PaginaPrincipal";
import Produtos from "./Produtos";
import Dashboard from "./Dashboard";
import Form from "./Form";


class Content extends React.Component {
  
  render() {
    return (
      <Switch>
        <Route exact path="/" render={props =>
        (
          <PaginaPrincipal></PaginaPrincipal>
        )
        }></Route>
      </Switch>
    )
  }
}

export default Content;