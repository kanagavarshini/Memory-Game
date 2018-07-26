/*
 * Create a list that holds all of your cards
 */
const arrCards=[ "fa fa-diamond","fa fa-diamond","fa fa-anchor","fa fa-anchor","fa fa-paper-plane-o","fa fa-paper-plane-o","fa fa-bolt","fa fa-bolt","fa fa-cube","fa fa-cube","fa fa-leaf","fa fa-leaf","fa fa-bomb","fa fa-bomb","fa fa-bicycle","fa fa-bicycle"];
//container for arrCards
const deck= document.querySelector('.deck');
let opened=[];
let matched=[];
let counter=[];
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
    const currentCard= this;
    const previousCard= opened[0];
    incrCounter();

    if (opened.length === 1){
        card.classList.add("open","show","disable");
        opened.push(this);

        if (this.innerHTML === opened[0].innerHTML){
          currentCard.classList.add("match");
          previousCard.classList.add("match");
          opened=[];
          matched.push(currentCard,previousCard);
          finalScore();
          }  else {
          unmatchedCard(currentCard , previousCard);
              }
    } else {
          currentCard.classList.add("open","show");
          opened.push(this);
        }
  });


}


function unmatchedCard(currentCard , previousCard){
  setTimeout(function() {
  currentCard.classList.remove("open","show","diable");
  previousCard.classList.remove("open","show","disable");
  opened=[];
}, 500);
}

function incrCounter(){
let movesCtr=0;
counter.push(this);
const move=document.querySelector('.moves');
move.innerHTML= counter.length;
console.log(movesCtr);
}
function finalScore() {
      if (matched.length === arrCards.length){
      alert("Game Over in" + counter.length);

  }

}

function restartSymbol(){
  restart.addEventListener("click", function(){
    const cards=$('.card');
    cards.remove();
    initialise();
    matched=[];
    counter=[];
  });
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
