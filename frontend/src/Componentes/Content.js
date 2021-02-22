import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import PaginaPrincipal from "./PaginaPrincipal";


class Content extends React.Component {
  
  render() {
    return (
      <Switch>
        <Route exact path="/Pesquisa" render={props =>
        (
        
          <PaginaPrincipal></PaginaPrincipal>
        )
        }></Route>
      </Switch>
    )
  }
}

export default Content;