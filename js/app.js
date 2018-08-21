/*
 * Create a list that holds all of your cards
 */
const arrCards=[ "fa fa-diamond","fa fa-diamond","fa fa-anchor","fa fa-anchor","fa fa-paper-plane-o","fa fa-paper-plane-o","fa fa-bolt","fa fa-bolt","fa fa-cube","fa fa-cube","fa fa-leaf","fa fa-leaf","fa fa-bomb","fa fa-bomb","fa fa-bicycle","fa fa-bicycle"];
//container for arrCards
const deck= document.querySelector('.deck');
let opened=[];
let matched=[];
let counter=[];
let minutes=0;
let seconds=0;
let initialClick=false;
let clickedCard;
let timer;

const restart=document.querySelector('.restart');
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
shuffle(arrCards);
initialise();
restartSymbol();

function initialise(){

   for(i=0; i<arrCards.length ; i++){

       const card=document.createElement('li');
       card.classList.add("card");
       card.innerHTML=`<i class = "${arrCards[i]} "></i>`;
       deck.appendChild(card);
       matchCard(card);
    }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function matchCard(card){

    card.addEventListener("click" , function(){
    console.log(opened);
   let clickedCard = this;
   if(!clickedCard.classList.contains('open') && !clickedCard.classList.contains('match') && !clickedCard.classList.contains('show') && opened.length < 2){
    opened.push(clickedCard);
    clickedCard.classList.add("open","show","disable");
    if (initialClick === false){
      initialClick = true;
      beginTimer();
    }
    incrCounter();


    if (opened.length === 2){
      currentCard = opened[1];
      previousCard = opened[0];
        if (currentCard.innerHTML === previousCard.innerHTML){
          currentCard.classList.add("match");
          previousCard.classList.add("match");
          while (opened.length>0) opened.pop();
          console.log(opened);
          matched.push(currentCard,previousCard);
          finalScore();
          }  else {
          unmatchedCard(currentCard , previousCard);
              }
    }
    }
  });


}


function unmatchedCard(currentCard , previousCard){
  setTimeout(function() {
  currentCard.classList.remove("open","show","disable");
  previousCard.classList.remove("open","show","disable");
  currentCard = '';
  previousCard = '';
  while (opened.length > 0) opened.pop();
    console.log(opened);
}, 500);
}
console.log(this);
const move=document.querySelector('.moves');
function incrCounter(){
counter.push(this);

move.innerHTML= counter.length;
if (counter.length == 20 ){
  hideStar();
} else if (counter.length  == 30){
  hideStar();


}
}
function resetStar(){
  stars=0;
  const starLi= document.querySelectorAll('.stars li');
  for(star of starLi){
  star.style.display='inline';
}
}
function finalScore() {
      if (matched.length === arrCards.length){
      resetTimer();
      showModal();
      modalDetail();
  }

}
function hideStar(){
  const starLi= document.querySelectorAll('.stars li');
  for(star of starLi){
    if (star.style.display != 'none'){
      star.style.display='none';
      break;
    }
  }
}
/*function restartSymbol(){
 restart.addEventListener("click", function(){

   const cards=document.querySelectorAll('.card');
   cards.remove();
   const cards=document.getElementsByClassName('card');
   for (let i=0; i<cards.length;i++){
   cards[i].classList.remove('card');
   }
   shuffle(arrCards);
   initialise();
   matched=[];
   counter=[];
 });
}*/

function restartSymbol(){
  restart.addEventListener("click", function(){
    const cards=$('.card');
    cards.remove();
    shuffle(arrCards);
    initialise();
    matched=[];
    counter=[];
    move.innerHTML= "0";
    initialClick=false;
    resetTimer();
    dis.innerHTML="0:00";
    resetStar();
  /*  window.location.reload();*/

  });
}
function beginTimer() {

  timer= setInterval(function(){
    seconds++;
    if (seconds==60){
      minutes++;
      seconds=0;
    }
    displayTime();
  },1000);
}
function resetTimer(){
  clearInterval(timer);
}
function formatTime(){
  let sec= seconds>9 ? String(seconds) : '0'+ String(seconds);
  let min= minutes>9 ? String(minutes) : '0'+ String(minutes);
  return min + ':' + sec;
}
let dis = document.querySelector('.clock');
function displayTime(){

  dis.innerHTML= formatTime();
}
// Get the modal
var modal = document.getElementById('myModal');


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
 function showModal() {
    modal.style.display = "block";
  }
  function modalDetail(){
    const disMoves = document.querySelector('.modal_moves');
    const disTime= document.querySelector('.modal_time');
    //const clockIn=document.querySelector('.clock').innerHTML;
    disMoves.innerHTML=`Moves : ${move.innerHTML}`;
    const x = document.querySelector('.clock').innerHTML;
    disTime.innerHTML=`Time : ${x}`;
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
