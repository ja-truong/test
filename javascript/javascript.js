/*
* Ship/Upgrade Tree Test
* By Joyous Eighteen
*
* Click the buttons to "upgrade". Each choice is described in a <div> with
* some stats. The choice will be highlighted on the table below.
*/


//Menu:

//FUNCTIONS..............................line 
//MAIN...................................line 
//TESTS..................................line


//_____________________ FUNCTIONS _________________________


var Ships = [];
var ShipsByLevel = [
  /*[scout],
  [bomber,fighter],
  [Mortar Platform,Destroyer,jet],
  [battleship,cruiser,Corvette,intercepter]*/
  [],[],[],[]
];

var choices = [];

var currentLvl = 0;
var currentType = 0;
var MAX_LVL = 3;

function Ship (lvl_type, name, des, statID/*, size, corePlacement*/) {
  this.name = name;
  this.lvl = parseInt(lvl_type[0]);
  this.type = parseInt(lvl_type[1]);
  this.des = des;
  //statID = 1hp#sp#pw#
  //this.statID = '1hp#sp#pw#'
  this.statID = ('' + statID);
  //finds each char at the stat's placement then multiplies it by its place value
  this.hp = parseInt(this.statID[1])*100 + parseInt(this.statID[2])*10 + parseInt(this.statID[3]);
  this.sp = parseInt(this.statID[4])*100 + parseInt(this.statID[5])*10 + parseInt(this.statID[6]);
  this.pw = parseInt(this.statID[7])*100 + parseInt(this.statID[8])*10 + parseInt(this.statID[9]);
  
  //for later
  /*
  this.currentHP = this.hp
  this.pwUsed = 0;
  this.x = 0;
  this.y = 0;
  this.massCenter = 0;
  */
}

//creates html elements with each part in its own row using <p>
function getInfo (ship) {
  return (
    "<p class = \"list\"><b>Name: </b>" + ship.name + "</p>" +
    "<p class = \"list\"><b>Lvl: </b>" + ship.lvl + "</p>" +
    "<p class = \"list\"><b>Description: </b>" + ship.des + "</p>" +
    "<p class = \"list\"><b>Health: </b>" + ship.hp + "</p>" +
    "<p class = \"list\"><b>Speed: </b>" + ship.sp + "</p>" +
    "<p class = \"list\"><b>Power: </b>" + ship.pw + "</p>");
}
/*Tree
       s
      b f
     m d j
    b c c i
*/

//|||||||||||||||||||||||||||||||

//Ship Object is (lvltype, name, description, stats)

//|||||||||||||||||||||||||||||||


//definition for stat number:
//                          |1hp#sp#pw#|
Ships.push(new Ship ('00', "Scout", "\'Very bad ship\'", 
                             1100800100));
Ships.push(new Ship ('10', "Bomber", "\'Bad ship with bomb\'", 
                             1200500160));
Ships.push(new Ship ('11', "Fighter", "\'Fast bad ship\'", 
                             1140775120));
Ships.push(new Ship ('20', "Mortar Platform", "\'Ship with cannon turret\'", 
                             1300400200));
Ships.push(new Ship ('21', "Destroyer", "\'Medium speed ship with turret gun\'", 
                             1220500190));
Ships.push(new Ship ('22', "Jet", "\'Fast ship with gun\'", 
                             1190750140));
Ships.push(new Ship ('30', "Battleship", "\'Very big and tank ship with four cannons\'", 
                             1400200400));
Ships.push(new Ship ('31', "Cruiser", "\'Very fat ship that kinda fast and shoot turret cannon\'", 
                             1300300400));
Ships.push(new Ship ('32', "Corvette", "\'Ship that go fast with two gun turret\'", 
                             1250490300));
Ships.push(new Ship ('33', "Intercepter", "\'Very fast ship with minigun\'", 
                             1220700160));

function returnChoice(num) {

  
  if(currentLvl != MAX_LVL-1) {
    
    currentLvl++;//increase lvl
    currentType += num;//change to ship type from choice
    
    //update infobox
    document.getElementById("choiceZero").innerHTML = getInfo(ShipsByLevel[currentLvl+1][currentType]);
    document.getElementById("choiceOne").innerHTML = getInfo(ShipsByLevel[currentLvl+1][currentType+1]);

    //update buttons
    document.getElementById("zero").innerHTML = ShipsByLevel[currentLvl+1][currentType].name;
    document.getElementById("one").innerHTML = ShipsByLevel[currentLvl+1][currentType+1].name;

    //update current
    document.getElementById("current").innerHTML = getInfo(ShipsByLevel[currentLvl][currentType]);
  
    //add to choices
    choices.push(ShipsByLevel[currentLvl][currentType]);
    
  } else {
    
    //update infobox
    document.getElementById("choiceZero").innerHTML = "MAXED";
    document.getElementById("choiceOne").innerHTML = "MAXED";

    //update buttons
    document.getElementById("zero").innerHTML = "MAXED";
    document.getElementById("one").innerHTML = "MAXED";

    //update current
    document.getElementById("current").innerHTML = getInfo(ShipsByLevel[MAX_LVL][currentType + num]);
    
    //disable buttons
    document.getElementById("zero").disabled = true;
    document.getElementById("one").disabled = true;
    
    //add to choices
    choices.push(ShipsByLevel[MAX_LVL][currentType + num]);
    
  }
  
  tree(4,7);

}



//im not really sure how this part works





//rows, columns = y,x coords no x,y
function tree( rows, cols){
  var i=0;
  var grid = document.createElement('table');
  grid.className = 'grid';
  for (var r=0;r<rows;++r){
    var tr = grid.appendChild(document.createElement('tr'));
    for (var c=0;c<cols;++c){
      var cell = tr.appendChild(document.createElement('td'));
      cell.id = r + "" + c;
      if (ShipsByLevel[r][(c+r-3)/2]) {
        cell.innerHTML = ShipsByLevel[r][(c+r-3)/2].name;   
      }
      if(choices.includes(ShipsByLevel[r][(c+r-3)/2])) {
        document.getElementById(r + "" + c).className = "choice";
      }  
    }
  }
  return grid;
}

function initialize() {
  
  for (var x = 0; x < Ships.length; x++) {//level

  ShipsByLevel[Ships[x].lvl][Ships[x].type] = Ships[x];
    
  }
  
  //make a grid. 4 rows 7 columns 
  document.body.appendChild(tree(4,7));
  
  //infobox
  document.getElementById("choiceZero").innerHTML = getInfo(ShipsByLevel[currentLvl+1][currentType]);
  document.getElementById("choiceOne").innerHTML = getInfo(ShipsByLevel[currentLvl+1][currentType+1]);

  //buttons
  document.getElementById("zero").innerHTML = ShipsByLevel[currentLvl+1][currentType].name;
  document.getElementById("one").innerHTML = ShipsByLevel[currentLvl+1][currentType+1].name;

  //current
  document.getElementById("current").innerHTML = getInfo(ShipsByLevel[currentLvl][currentType]);
  choices.push(ShipsByLevel[currentLvl][currentType]);
 
  tree(4,7);
  
}
 
//_____________________ MAIN _________________________


initialize();


//_____________________ TESTS _________________________


/*for(var i = 0; i < Ships.length; i++) {
  console.log(Ships[i].lvl)
}

console.log(ShipsByLevel[3][0].name); // interc
console.log(Ships[6].name)*/

/*for (var i = 0; i < choices.length; i++) {
        console.log(choices[i]);
  };*/
