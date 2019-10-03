
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

//dealing cards. Changing two ACEs to the value of 2 if drawn in same user.
const dealCards = async (cards) => {
  let response = await axios.get(`https://deckofcardsapi.com/api/deck/${shuffleDeck}/draw/?count=4`);
  let allCards = players(response.data.cards);
  console.log(allCards)
  let playerCards = [];
  let dealerCards = [];
  for (let i = 0; i < allCards.length; i += 1) {
    let currentCard = allCards[i]
    console.log(currentCard.value)
    if (i % 2 === 0) {
      playerCards.push(currentCard)
      if (playerCards[0].value === "ACE" && playerCards[1] === "ACE")

        changeRank(currentCard.value)

    } else {
      dealerCards.push(currentCard)
    }
  }

  titlePlayer.style = `display: block`;
  titleDealer.style = `display: block`;
}

//Making Player and Dealer disappear
let titlePlayer = document.querySelector("#headingPlayer");
let titleDealer = document.querySelector("#headingDealer");

playButton.addEventListener(`click`, dealCards)


//This function changes value of high suits to value 10.
const changeRank = (value) => {
  if (value === "JACK" || value === "QUEEN" || value === "KING") {
    value = 10;
  } else if (value === "ACE") {
    value = 11;
  } else {
    value = parseInt(value);
  }
  return value;
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

  return cards
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

//Hit Button
//The Player score continues by adding one random card 
//from cards delt.If the cards exceed 21 then Bust!.
//Player looses. If Player Player 
//If 