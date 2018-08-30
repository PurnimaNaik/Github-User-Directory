import React from "react";
import {render} from "react-dom";
import style from '../styles/headerComponent.css';

//creating header
export class HeaderComponent extends React.Component{
  render(){
    return (
      <div className="headerContainer">
        <h1 className="header"> Github User Directory </h1>
      </div>
    );
  }
}
