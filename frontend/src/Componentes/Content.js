import React from "react";
import {Route, Switch} from "react-router-dom";
import PaginaPrincipal from "./PaginaPrincipal";
import Header from "./Header";
import Produtos from "./Produtos";


class Content extends React.Component {
    render(){
        return(
            <Switch>
<Route exact path="/" render={props =>
(
    <PaginaPrincipal></PaginaPrincipal>
)
}></Route>
  <Route exact path="/Produtos" render={() => (
            <Produtos></Produtos>
          )}>
          </Route>
            </Switch>
        )
    }
} 

export default Content;