import React from "react";
import {render} from "react-dom";
import { BrowserRouter, Route, browserHistory, Switch } from 'react-router-dom';
import {Index} from "../components/index.js";
import {SearchDisplayComponent} from "../components/SearchDisplayComponent.js";
import {SearchBarComponent} from "../components/SearchBarComponent.js";


export class Root extends React.Component{

render(){
    return (
      <BrowserRouter history={browserHistory} forceRefresh={true}>
        <div>
          <Switch>
            <Route path="/" component={Index}/>
            <Route path="/search" component={SearchBarComponent}/>
            <Route path="/signin" component={SearchDisplayComponent}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
render(<Root/>, window.document.getElementById('app'));
