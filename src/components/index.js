import React from "react";
import {render} from "react-dom";
import {HeaderComponent} from "../components/HeaderComponent.js";
import {ListComponent} from "../components/ListComponent.js";
import {ModalComponent} from "../components/ModalComponent.js";
import {SearchBarComponent} from "../components/SearchBarComponent.js";
import $ from "jquery";
import style from '../styles/index.css';

export class Index extends React.Component{

constructor(props){
  super();
  this.state={
  modalVisibility:false,
  recordsReturned:0,
  userCardIndex:"",
  currentPaginationCutoff:0,
  previousPaginationCutoff:0,
  integerIDofLastUser:"",
  integerIDofPreviousLastUser:0,
  userIdCutoffList:[],
  disclaimerText:false,
}
  this.ontoggleModalVisibility = this.ontoggleModalVisibility.bind(this);
  this.oncallback = this.oncallback.bind(this);
  this.onIncrementcallback = this.onIncrementcallback.bind(this);
  this.ondecrementCallback = this.ondecrementCallback.bind(this);
  this.incrementPaginationIndex = this.incrementPaginationIndex.bind(this);
  this.decrementPaginationIndex=this.decrementPaginationIndex.bind(this)
  this.setLastIndex=this.setLastIndex.bind(this);
  this.setprevIndexOnNext=this.setprevIndexOnNext.bind(this);
  this.setprevIndexOnPrev=this.setprevIndexOnPrev.bind(this);
  this.actionToCall = this.actionToCall.bind(this);
}

componentDidMount(){
//request list of users and store them in state
  var count;
  var request = new XMLHttpRequest();
  request.open('GET', 'https://api.github.com/users', true);
  request.onload = function () {
  var allData = JSON.parse(request.response);
  count=Object.keys(allData).length;
  if (request.readyState == 4 && request.status == 200){
    this.oncallback(count);
   }
  }.bind(this);
  request.send();
}

oncallback(count) {
   this.setState({
     recordsReturned:count,
     previousPaginationCutoff:this.state.currentPaginationCutoff,
     currentPaginationCutoff:this.state.currentPaginationCutoff+count,
     userIdCutoffList:this.state.userIdCutoffList.concat(0),
   });
}

//toggle modal component's visibility
ontoggleModalVisibility(userCardKey){
  this.setState({
    modalVisibility:!this.state.modalVisibility,
    userCardIndex:userCardKey,
  });
}

//save the last user id accessed
setLastIndex(lastID){
  this.setState({
    integerIDofLastUser:lastID,
  });
}

//request for the next set of users and store them in state
incrementPaginationIndex(){
var count=0;
var request = new XMLHttpRequest();
request.open('GET', 'https://api.github.com/users?since='+ String(this.state.integerIDofLastUser) +'>', true);
request.onload = function () {
var nextData = JSON.parse(request.response);
count=Object.keys(nextData).length;
if (request.readyState == 4 && request.status == 200){
  this.onIncrementcallback(count);
}
}.bind(this);
request.send();

//animating smooth scroll to top of the window
 $('html, body').animate({scrollTop: 0}, 1200);
}

onIncrementcallback(count) {
   this.setState({
     recordsReturned:count,
     previousPaginationCutoff:this.state.currentPaginationCutoff,
     currentPaginationCutoff:this.state.currentPaginationCutoff+count,
     userIdCutoffList:this.state.userIdCutoffList.concat(this.state.integerIDofLastUser),
   });
   this.setprevIndexOnNext();
}

//request for the previous set of users and store them in state
decrementPaginationIndex(){
  var count=0;
  var request = new XMLHttpRequest();
  request.open('GET', 'https://api.github.com/users?since='+ String(this.state.integerIDofPreviousLastUser) +'>', true);
  request.onload = function () {
  var prevData = JSON.parse(request.response);
  count=Object.keys(prevData).length;
  if (request.readyState == 4 && request.status == 200){
    this.ondecrementCallback(count);
  }
  }.bind(this);
  request.send();

  //animating smooth scroll to top of the window
   $('html, body').animate({scrollTop: 0}, 1200);
}

ondecrementCallback(count) {
   this.setState({
     recordsReturned:count,
     previousPaginationCutoff:this.state.previousPaginationCutoff-count,
     currentPaginationCutoff:this.state.currentPaginationCutoff-count,
     integerIDofLastUser:this.state.integerIDofPreviousLastUser,
   });

  //pop the last entry in user Id Cutoff List
  this.state.userIdCutoffList.splice(-1, 1);
  this.setprevIndexOnPrev();
}

//update integer ID of Last User when accessing the next page
setprevIndexOnNext(){
var len=this.state.userIdCutoffList.length -2;
var prevIndex=this.state.userIdCutoffList[len];
  this.setState({
    integerIDofPreviousLastUser:prevIndex,
    });
}

//update integer ID of Last User when accessing the previous page
setprevIndexOnPrev(){
  var len=this.state.userIdCutoffList.length -2;
  var prevIndex=this.state.userIdCutoffList[len];
  this.setState({
    integerIDofPreviousLastUser: prevIndex,
    });
  }

 actionToCall(username){
 setTimeout(location.reload.bind(location), 2000);

if(username==""){
  this.setState({
     disclaimerText: false,
  });
}

else{
  this.setState({
    disclaimerText: true,
  });
 }
}


render(){
//populate the userList with List Component based on integer ID of Last User
var userList=[];
if(this.state.currentPaginationCutoff!=0){
  for(var i=this.state.previousPaginationCutoff;i<=(this.state.currentPaginationCutoff)-3;i += 3){
    const constlistComponent=<ListComponent lastUserId={this.state.integerIDofLastUser} setLastIndex={this.setLastIndex.bind(this)} endIndex={this.state.currentPaginationCutoff}  index={i} key={i} previousPaginationCutoff={this.state.previousPaginationCutoff} toggleVisibility={this.ontoggleModalVisibility.bind(this)}/>
    userList.push(constlistComponent);
  }
}

const display=
  <div>
  <div className="cardColumns">
    {userList}
  </div>

  <div className="buttonContainerInIndex">
    {this.state.previousPaginationCutoff==0? "": <a  onClick={this.decrementPaginationIndex.bind(this)} className="paginationButtonPrev">&#8249;</a>}
    {this.state.recordsReturned==0? "": <a  onClick={this.incrementPaginationIndex.bind(this)} className="paginationButtonNext">&#8250;</a>}
  </div>

  <ModalComponent userClicked={this.state.userCardIndex} modalVisibility={this.state.modalVisibility} toggleVisibilityInIndex={this.ontoggleModalVisibility.bind(this)}/>
  </div>


return (
 <div id="mainContainer" className="mainContainer">

   <HeaderComponent/>
   <SearchBarComponent actionToCall={this.actionToCall}/>
   {this.state.disclaimerText==true ? <h1>No such user found</h1>:""}
   <div> {display} </div>

 </div>
  );
 }
}
