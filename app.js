
const displayPlayer = document.querySelector("#display-player");
const displayDealer = document.querySelector("#display-dealer");
const results = document.querySelector("#results");
let url = ``;
let shuffleDeck;
var playerCard1;
var playerCard2;
var dealerCard1;
var dealerCard2;



//Shuffling Deck
window.addEventListener('load', async function () {
  const response = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
  shuffleDeck = response.data.deck_id;
})

//Buttons
let playButton = document.querySelector('#play');
let hitButton = document.querySelector('#hit');
let stayButton = document.querySelector('#stay');

//dealing cards
let dealCards = async (cards) => {
  let response = await axios.get(`https://deckofcardsapi.com/api/deck/${shuffleDeck}/draw/?count=4`);
  players(response.data.cards);
  titlePlayer.style = `display: block`;
  titleDealer.style = `display: block`;
}

//Making Player and Dealer disappear
let titlePlayer = document.querySelector("#headingPlayer");
let titleDealer = document.querySelector("#headingDealer");

playButton.addEventListener(`click`, dealCards)

let changeRank = (value) => {
  if (value === "JACK" || value === "QUEEN" || value === "KING") {
    return 10;
  } else if (value === "ACE") {
    return 11;
  } else if (value === "ACE" && value === "ACE") {
    return 2;
  } else {
    return parseInt(value);
  }
}


//Each player gets two cards. position, value, and image
const players = (cards) => {

  for (let i = 0; i < cards.length; i++) {
    if (i === 0) {
      const playerCardDiv = document.createElement('div');
      playerCardDiv.innerHTML = `<img src=${cards[i].image} />`;
      displayPlayer.append(playerCardDiv);
      playerCard1 = changeRank(cards[i].value)
    }
    else if (i === 2) {
      const playerCardDiv = document.createElement('div');
      playerCardDiv.innerHTML = `<img src=${cards[i].image} />`;
      displayPlayer.append(playerCardDiv);
      playerCard2 = changeRank(cards[i].value)
    } else if (i === 1) {
      const dealerCardDiv = document.createElement('div');
      dealerCardDiv.innerHTML = `<img src=${cards[i].image} />`;
      displayDealer.append(dealerCardDiv);
      dealerCard1 = changeRank(cards[i].value)
    } else if (i === 3) {
      const dealerCardDiv = document.createElement('div');
      dealerCardDiv.innerHTML = `<img src=${cards[i].image} />`;
      displayDealer.append(dealerCardDiv);
      dealerCard2 = changeRank(cards[i].value)
    }

  }
  //Adding cards after the delt.
  console.log(playerCard1, playerCard2, dealerCard1, dealerCard2);
  let playerScore = getTotal(playerCard1, playerCard2);
  let dealerScore = getTotal(dealerCard1, dealerCard2);
  if (playerScore === 21 && playerScore === dealerScore) {
    let winner = document.createElement('div');
    winner.innerHTML = `<h2>Player and dealer tie at 21. Dealer wins!</h2>`
    results.append(winner);
  } else if (playerScore > dealerScore) {
    let winner = document.createElement('div')
    winner.innerHTML = `<h2>Player wins with score of ${playerScore}</h2>`
    results.append(winner);
  } else if (dealerScore > playerScore) {
    let winner = document.createElement('div')
    winner.innerHTML = `<h2>Dealer wins with score of ${dealerScore}</h2>`
    results.append(winner);
  }


}

getTotal = (card1, card2) => {
  return card1 + card2;
}
//count cards and see if cards add up to 21 or bust.
const determineWinner = (player1, player2) => {
  let score = 0;
  for (let i = 0; i < array.length; i++) {
    let cardValue = array[i].value;
    score += cardValue;
  }
  return score
}
