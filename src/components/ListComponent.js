import React from "react";
import style from '../styles/listComponent.css';
export class ListComponent extends React.Component{

  constructor(props){
    super();
    this.state={
      allStateData:"",
      data:[],
      index:props.index-props.previousPaginationCutoff,
      integerIDofLastUser:"",
      currentData:"",
      firstCardData:"",
      secondCardData:"",
      thirdCardData:"",
    }

//request user data
    var request = new XMLHttpRequest();
    request.open('GET', 'https://api.github.com/users?since='+ String(props.lastUserId) +'>', true);
    request.onload = function () {
    var userData = JSON.parse(request.response);
    if (request.readyState == 4 && request.status == 200){
      this.oncallback(userData); // Another callback here
      }
    }.bind(this);
  request.send();
}

//populate current and next 2 users in state
oncallback(data) {
if((this.state.index+2)<(this.props.endIndex) ){
  this.setState({
    firstCardData:data[(this.state.index)],
    secondCardData:data[(this.state.index+1)],
    thirdCardData:data[(this.state.index+2)],
    integerIDofLastUser:data[(this.state.index+2)]["id"],
  });
  this.props.setLastIndex(this.state.integerIDofLastUser);
 }
}

render(){

  //populate user variables
  var firstCardData=this.state.firstCardData;
  var secondCardData=this.state.secondCardData;
  var thirdCardData=this.state.thirdCardData;

return (
  <div className="container">

    <div className="userCards"  onClick={() => this.props.toggleVisibility(firstCardData["login"])} >
    <div className="avataarContainer">
    <img className="avataar" src={firstCardData["avatar_url"]} alt="avataar"/>
    </div>
    <p className="username">{firstCardData["login"]}</p>
    </div>

    <div className="userCards" onClick={() => this.props.toggleVisibility(secondCardData["login"])} >
    <div className="avataarContainer">
    <img className="avataar" src={secondCardData["avatar_url"]} alt="avataar"/>
    </div>
    <p className="username">{secondCardData["login"]}</p>
    </div>

    <div className="userCards" onClick={() => this.props.toggleVisibility(thirdCardData["login"])} >
    <div className="avataarContainer">
    <img className="avataar" src={thirdCardData["avatar_url"]} alt="avataar"/>
    </div>
    <p className="username">{thirdCardData["login"]}</p>
    </div>

  </div>

    );
  }
}
