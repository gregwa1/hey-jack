
const displayPlayer = document.querySelector("#display-player");
const displayDealer = document.querySelector("#display-dealer");
let url = ``
let shuffleDeck;

// Greeting the player
const greet = () => {
  let name = getInput("Welcome! Let's play a game. What's your name?");
  console.log(name);
  return name;
}

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
}

//Getting deck_id
playButton.addEventListener(`click`, dealCards);

//Each player gets two cards. position, value, and image
let players = (cards) => {
  for (let i = 0; i < cards.length; i++) {
    if (i === 0 || i === 2) {
      const playerCardDiv = document.createElement('div');
      playerCardDiv.innerHTML = `<img src=${cards[i].image} />`;
      displayPlayer.append(playerCardDiv);
    } else if (i === 1 || i === 3) {
      const dealerCardDiv = document.createElement('div');
      dealerCardDiv.innerHTML = `<img src=${cards[i].image} />`;
      displayDealer.append(dealerCardDiv);
    }

  }
}