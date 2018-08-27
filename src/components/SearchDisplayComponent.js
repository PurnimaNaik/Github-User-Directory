import React from "react";
import {render} from "react-dom";
import $ from "jquery";
import editIcon from '../assets/editIcon.png'
import style from '../styles/searchDisplayComponent.css';

export class SearchDisplayComponent extends React.Component{

  constructor(props){
    super();

    this.state={
     user:props.data,
    }
}


componentWillReceiveProps(newProps) {
  if(newProps){
  this.setState({
   user:newProps.data,
      });
}
}

render(){

var user=this.state.user;

  return (
    <div className="searchDisplayContainer">

    <div className="modalAvataarContainer">
    <img className="modalAvataar" src={user["avatar_url"]} alt="avataar"/>
    </div>

    <h1>{user["name"]}</h1>

    <div className="infoContainer">

    <p>Username:{' '}{user["login"]}</p>
    <p>Followers:{' '} {user["followers"]}</p>
    <p>Following:{' '} {user["following"]}</p>
    <p>Public Repos:{' '}{user["public_repos"]}</p>

    </div>

    <div className="infoContainer">

    {(user["email"]!=null) && (user["email"]!="") ? <p>Email:{' '} {user["email"]}</p>: ""}
    {(user["location"]!=null) && (user["location"]!="") ? <p>Location:{' '} {user["location"]}</p>: ""}
    {(user["company"]!=null) && (user["company"]!="") ? <p>Company:{' '} {user["company"]}</p>: ""}
    {(user["blog"]!=null) && (user["blog"]!="") ? <p>Blog:{' '}{user["blog"]}</p>: ""}

    </div>

    <div className="bioContainer">

    <div className="bioContainer_content">
    {(user["bio"]!=null) && (user["bio"]!="") ? <p>Bio:{' '} {user["bio"]}</p>: ""}
    </div>

    <div className="bioContainer_edit">
    {(user["bio"]!=null) && (user["bio"]!="") ? <p><a href="https://github.com/login/oauth/authorize?client_id=4f316e83b3e3f03239c3&scope=bio&redirect_uri=http://localhost:8080/signin"> Edit Bio <img  className="editIcon" alt="edit bio" src={editIcon}/></a></p>: <a href="https://github.com/login/oauth/authorize?client_id=4f316e83b3e3f03239c3&scope=bio&redirect_uri=http://localhost:8080/signin"> Add Bio <img  className="editIcon" alt="edit bio" src={editIcon}/></a>}
    </div>

</div>
    </div>
);
}
}
