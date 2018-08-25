import React from "react";
import {render} from "react-dom";

import style from '../styles/searchComponent.css';

export class SearchComponent extends React.Component{
  render(){

    return (
      <div className="searchBoxContainer">
      <input type="search"  placeholder="Enter username..." className="searchBox" />
      </div>
    );
  }
}
