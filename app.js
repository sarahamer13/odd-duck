'use strict';

///// Globals//////

let voteCount = 25;

// for data that can change with our application state
const state = {
    array: [],
  };

//// DOM References ////


let imgContainer = document.getElementById('img-container');
let productOne = document.getElementById ('img-one');
let productTwo = document.getElementById ('img-two');
let productThree= document.getElementById ('img-three');
let button = document.getElementById('button');
let resultsList = document.getElementById('results-list');

function Display(name, fileExtension = 'jpg') {
    this.name = name;
    this.views = 0;
    this.votes = 0;
    this.image = `img/${name}.${fileExtension}`;

    state.array.push(this);
}

let bag = new Display ('bag');
let banana = new Display('banana');
let bathroom = new Display('bathroom');
let boots = new Display('boots');
let breakfast = new Display('breakfast');
let bubblegum = new Display('bubblegum');
let chair = new Display('chair');
let cthulhu = new Display('cthulhu');
let dogDuck = new Display('dog-duck');
let dragon = new Display('dragon');
let pen = new Display('pen');
let petSweep = new Display('pet-sweep');
let scissors = new Display('scissors');
let shark = new Display('shark');
let sweep = new Display('sweep','png');
let tauntaun = new Display('tauntaun');
let unicorn = new Display('unicorn');
let waterCan = new Display('water-can');
let wineGlass = new Display ('wine-glass');

// proof of life
console.log(state.array);

// >>>>>>> HELPER FUNCTIONS
// Randomly generate an image
// W3 Resources: Math.floor(Math.random()*items.length)
function RandomImg(){
    return Math.floor(Math.random()* state.array.length);
  }

  // Render fucntion //

  function renderImg () {
    let imgOne = RandomImg ();
    let imgTwo = RandomImg ();
    let imgThree = RandomImg ();
////// COMPARE IMAGES -while- they are the same get a new randomIndex -OR- display image***************** */
    while(imgOne === imgTwo || imgOne === imgThree ||imgTwo === imgThree){
        imgTwo = RandomImg ();
        imgThree = RandomImg ();
    }

  productOne.src = state.array[imgOne].image;
  productOne.alt = state.array[imgOne].name;
  state.array[imgOne].views++;

  productTwo.src = state.array[imgTwo].image;
  productTwo.alt = state.array[imgTwo].name;
  state.array[imgTwo].views++;

  productThree.src = state.array[imgThree].image;
  productThree.alt = state.array[imgThree].name;
  state.array[imgThree].views++;
}

// >>>>>>> EVENT HANDLERS
function handleClick(event){
    voteCount--;
    let imgClicked = event.target.alt;
  for (let i=0; i< state.array.length; i++){
    if (imgClicked === state.array[i].name){
      state.array[i].votes++;
       console.log(imgClicked,state.array[i].votes);
    }
  }
  // ensures that our images will regenerate on click
renderImg();

    // stop votes
  if(voteCount === 0){
    imgContainer.removeEventListener('click', handleClick);
  }
  console.log(voteCount);
};

function handleShowResults(){
    // display the results in a list: name views votes for each goat
    // only work if the vote count is 0
    if(voteCount === 0){
      for(let i = 0; i < state.array.length; i++){
        let liElem = document.createElement('li');
        liElem.textContent = `${state.array[i].name} had ${state.array[i].views} views and had ${state.array[i].votes} votes`;
        resultsList.append(liElem);
      }
    }
  }

  // >>>>>>> LISTENERS
imgContainer.addEventListener('click', handleClick);
button.addEventListener('click', handleShowResults);
// >>>>>>> FUNCTION INVOCATIONS
renderImg();

  