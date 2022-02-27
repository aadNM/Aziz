var count;var secField;var sec;var paused=!1;var totalPlayers;var categories=["","Country","City","Brand","Food","Thing","Animal","Person"];var aplhabet="QWERTYUIOPLKJHGFDSAZXCVBNM";var alphaCopy=aplhabet;var playScores=[];var canvas;var context;let x=10;let y=240;let len=10;let width=10;let xFood=0;let yFood=0;let level=1;let Speed=10;var hzSpeed=0;var vtSpeed=0;var points=0;var selfKill=!1;var biteWall=!1;let anaconda=[{x:10,y:240},{x:20,y:250},{x:30,y:240},{x:40,y:240}];window.onload=(event)=>{canvas=document.querySelector("#main-frame");context=canvas.getContext('2d');document.onkeydown=KeyDirection;document.addEventListener("keydown",KeyDirection);play();generateFood();count=0;secField=document.getElementById("seconds");sec=0;hideShow("hide","top-container");hideShow("hide","res-next");document.getElementById('start-btn').style.display="none"};function randomPosition(){xFood=Math.round(Math.random()*(canvas.width-10)/10)*10;yFood=Math.round(Math.random()*(canvas.height-10)/10)*10}
function generateFood(){randomPosition();anaconda.forEach(function swallow(body){if(body.x==xFood&&body.y==yFood){generateFood()}})}
function print(){anaconda.forEach(placeAnaconda)}
function placeAnaconda(place){context.fillStyle="#f4d03f";context.strokestyle="#17202a";context.fillRect(place.x,place.y,len,width);context.strokeRect(place.x,place.y,len,width)}
function placeFood(){context.fillStyle="#1d8348 ";context.strokestyle="#cb4335";context.fillRect(xFood,yFood,len,width);context.strokeRect(xFood,yFood,len,width)}
function move(){let front={x:anaconda[0].x+hzSpeed,y:anaconda[0].y+vtSpeed};anaconda.unshift(front);var swallow=anaconda[0].x===xFood&&anaconda[0].y===yFood;if(swallow){generateFood();points+=20;console.log("touch")}else{anaconda.pop()}
document.querySelector("#score-board").innerHTML=points}
function KeyDirection(event){var arrow=event.keyCode;if(arrow==37&&hzSpeed!=Speed){hzSpeed=-Speed;vtSpeed=0}else if(arrow==39&&hzSpeed!=-Speed){hzSpeed=Speed;vtSpeed=0}else if(arrow==38&&vtSpeed!=Speed){hzSpeed=0;vtSpeed=-Speed}else if(arrow==40&&vtSpeed!=-Speed){hzSpeed=0;vtSpeed=Speed}else if(arrow==32){pause()}}
function GameOver(){for(let i=4;i<anaconda.length;i++){if((anaconda[i].x===anaconda[0].x)&&(anaconda[i].y===anaconda[0].y)){selfKill=!0}}
if((anaconda[0].x<0)||(anaconda[0].x>(canvas.width-10))||(anaconda[0].y<0)||(anaconda[0].y>(canvas.height-10))){biteWall=!0}
return(selfKill||biteWall)}
function play(){if(level==1){Speed=10}
if(GameOver()){GameOver()=!1;return}
KeyDirection=!1;setTimeout(function onTick(){context.fillStyle="#ffffff";context.clearRect(0,0,canvas.width,canvas.height);placeFood();move();print();play()},100)}
function pause(){KeyDirection=!1;hzSpeed=0;vtSpeed=0}
function refreshPage(){history.go(0)}
function counting(){sec+=1;secField.innerHTML=sec;if(sec>59){document.getElementById("timesUP").style.visibility="visible";document.getElementById("timesUP").style.color="red";document.getElementById("timesUP").style.fontWeight="bold";document.getElementById("timesUP").style.fontSize="20px";pause()}}
function pause(){if(!paused){clearTimeout(count);count=null;paused=!0}else{paused=!1}}
function reset(){clearInterval(count);sec=0;secField.innerHTML=sec;paused=!1;startTimer()}
function startTimer(){paused=!1;count=setInterval(function(){counting()},1000)}
function setPlayers(){this.totalPlayers=document.getElementById("totalPlayers").value;var container=document.getElementById("playerNames");while(container.hasChildNodes()){container.removeChild(container.lastChild)}
for(i=0;i<this.totalPlayers;i++){container.appendChild(document.createTextNode("Player "+(i+1)));var input=document.createElement("input");input.type="text";input.id="player"+(i+1);container.appendChild(input);container.appendChild(document.createElement("br"));document.getElementById(input.id).className="players-names"}
var playersList=document.getElementsByClassName("players-names");for(i=0;i<this.totalPlayers;i++){playersList[i].onfocusout=function(){var pl=document.getElementsByClassName("players-names");console.log(pl[i].value)}}
hideShow("show","start-btn")}
function getLetter(){var len=alphaCopy.length;if(len>0){var letter=this.alphaCopy.charAt(Math.floor(Math.random()*len));this.alphaCopy=this.alphaCopy.replace(letter,'');document.getElementById("letter").innerHTML=letter}}
function initializeScores(){var playersList=document.getElementsByClassName("players-names");for(i=0;i<this.totalPlayers;i++){playScores.push([playersList[i].value,0])}}
function createTable(table,players){for(let name of players){let row=table.insertRow();let cell1=row.insertCell();let txt1=document.createTextNode(name[0]);cell1.appendChild(txt1);for(i=1;i<this.categories.length;i++){let cell=row.insertCell();cell.innerHTML="<input type='checkbox' name='"+name[0]+"' id='"+i+"' >"}}}
function createTableHead(table,categories){let thead=table.createTHead();let row=thead.insertRow();for(let cat of categories){let th=document.createElement("th");let text=document.createTextNode(cat);th.appendChild(text);row.appendChild(th)}}
function resetTable(){var checkboxes=document.querySelectorAll("input[type='checkbox']");for(i=0;i<checkboxes.length;i++){if(!checkboxes[i].disabled){checkboxes[i].checked=!1}}}
function scoreBoard(players){let names=document.getElementById("names");while(names.lastChild.id!=="title1"){names.removeChild(names.lastChild)}
for(let name of players){let entry=document.createElement("span");let text=document.createTextNode(name[0]);entry.appendChild(text);names.appendChild(entry)}
let points=document.getElementById("points");while(points.lastChild.id!=="title2"){points.removeChild(points.lastChild)}
for(let name of players){let entry=document.createElement("span");let text=document.createTextNode(name[1]);entry.appendChild(text);points.appendChild(entry)}}
function updateScores(){for(i=0;i<playScores.length;i++){let win=document.querySelectorAll("input[name="+playScores[i][0]+"]:checked");for(j=0;j<win.length;j++){playScores[i][1]+=10}}
scoreBoard(playScores)}
function hideShow(cmd,target){if(cmd=="hide"){document.getElementById(target).style.display="none"}else{document.getElementById(target).style.display="block"}}
function startGame(){hideShow("hide","game-setup");hideShow("show","top-container");hideShow("show","res-next");initializeScores();let table=document.querySelector("table");createTableHead(table,categories);createTable(table,playScores);scoreBoard(playScores)}