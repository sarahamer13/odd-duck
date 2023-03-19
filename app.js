'use strict';

///// Globals//////

let voteCount = 25;
let indexArray = [];
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

///// Chart JS Reference

const ctx = document.getElementById ('my-chart')

//// Constructor function 

function Display(name, fileExtension = 'jpg') {
    this.name = name;
    this.views = 0;
    this.votes = 0;
    this.image = `img/${name}.${fileExtension}`;

    state.array.push(this);
}

 //Step 3 Get info from local storage 

 let retrievedProds = localStorage.getItem ('myProducts');
  // console.log ('RETRIEVED PRODS', retrievedProds);

 // Step 4 convert data to original format 

 let parsedProds = JSON.parse(retrievedProds);
  // console.log ('PARSED ----- >', parsedProds);

if (retrievedProds){
  state.array = parsedProds;
} else {
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

}
// proof of life
// console.log(state.array);

// >>>>>>> HELPER FUNCTIONS
// Randomly generate an image
// W3 Resources: Math.floor(Math.random()*items.length)
function RandomImg(){
    return Math.floor(Math.random()* state.array.length);
  }

  // Render fucntion //

  function renderImg () {
//     let imgOne = RandomImg ();
//     let imgTwo = RandomImg ();
//     let imgThree = RandomImg ();
// ////// COMPARE IMAGES -while- they are the same get a new randomIndex -OR- display image***************** */
//     while(imgOne === imgTwo || imgOne === imgThree ||imgTwo === imgThree){
//         imgTwo = RandomImg ();
//         imgThree = RandomImg ();
//     } 
    //Keeping this for my reference


      while (indexArray.length < 6){
        let randomIndex = RandomImg ();
        if (!indexArray.includes (randomIndex)){ 
          indexArray.push (randomIndex);
        } else { randomIndex = RandomImg();
        }
      }
     console.log (indexArray);

      let imgOne = indexArray.shift ();
      let imgTwo = indexArray.shift ();
      let imgThree = indexArray.shift ();

      // console.log (indexArray);
    
  productOne.src = state.array[imgOne].image;
  productOne.alt = state.array[imgOne].name;
  state.array[imgOne].views++;

  productTwo.src = state.array[imgTwo].image;
  productTwo.alt = state.array[imgTwo].name;
  state.array[imgTwo].views++;

  productThree.src = state.array[imgThree].image;
  productThree.alt = state.array[imgThree].name;
  state.array[imgThree].views++;
};

/// Function to Render Chart 

function renderChart () {
  ctx.style.display = 'block';
  let prodNames = [];
  let prodVotes = [];
  let prodViews = [];

  for (let i = 0; i < state.array.length; i++) {
    prodNames.push (state.array [i].name);
    prodVotes.push (state.array [i].votes);
    prodViews.push (state.array [i].views);
  }
  
  let myChart = {
    type: 'bar',
    data: {
      labels: prodNames,
      datasets: [{
        label: '# of Views',
        data: prodViews,
        borderWidth: 2,
        backgroundColor: ['Green'],
      },
      {
        label: '# of Votes',
        data: prodVotes,
        borderWidth: 2,
        backgroundColor: ['Maroon']
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

    new Chart (ctx,myChart);
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
  
  console.log(voteCount);

  // Step 1 - Convert our data to string to store in local storage
    let stringifiedProds = JSON.stringify (state.array);
    console.log (stringifiedProds);
  /// Step 2 - Store / set item with key value pair
    localStorage.setItem('myProducts', stringifiedProds);
  }
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
      button.style.display ='none';
      renderChart ();
    }
  }

  // >>>>>>> LISTENERS
imgContainer.addEventListener('click', handleClick);
button.addEventListener('click', handleShowResults);
// >>>>>>> FUNCTION INVOCATIONS
renderImg();

  