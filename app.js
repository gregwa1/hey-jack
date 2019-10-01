const player = ``;
const dealer = '';
const display = document.querySelector("#display");

// Greeting the player
const greet = () => {
  let name = getInput("Welcome! Let's play a game. What's your name?");
  console.log(name);
  return name;
}

//Shuffling Deck
let shuffleDeck = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";

//Buttons
let playButton = document.querySelector('#play');
let hitButton = document.querySelector('#hit');
let stayButton = document.querySelector('#stay');

//dealing cards
let dealCards = async (cards) => {
  let response = await axios.get(`https://deckofcardsapi.com/api/deck/${cards}/draw/?count=4`);
  // console.log(response.data.cards);
  return response.data.cards;
}

//Getting deck_id
playButton.addEventListener(`click`, async () => {
  let response = await axios.get(`https://deckofcardsapi.com/api/deck/o9z1x6oiqd0i/shuffle/?deck_count=1`);
  console.log(response.data.deck_id);
  let twoCards = await dealCards(response.data.deck_id);
  console.log(twoCards);
});

//Each player gets two cards. position, value, and image
let players = (cards) => {
  for (let i = 0; i < twoCards.length; i++) {
    if (i === 0) {
      player.style.div = `https://deckofcardsapi.com/api/deck/${cards}/draw/?count=4(${cards[i].image})`
    } else if (i === 1) {

    }

  }
  cards.forEach((cards) => {
    let cardDiv = document.createElement("#div");
    cardDiv.style.backgroundImage = `url(${card.image})`
    display.append(cardDiv);
  })
}


// from Tony
// const showCards = (cards) => {
//   // cards.forEach((card) => {
//   for (let i = 0; i < cards.length; i++) {
//     if (i === 0) {
//       playArea1.style.backgroundImage = `url(${cards[i].image})`
//     } else {
//       playArea2.style.backgroundImage = `url(${cards[i].image})`
//     }
//   }
//   // });
// }
// let renderList = (cards) => {
//   display.innerHTML = "";
//   cards.forEach((card) => {
//     const cardOutput = document.createElement('#playerCard1');
//     cardOutput.innerHTML = `<img src=${card.image} />`;
//     // movieList.append(movieOutput);
//     display.append(cardOutput);
//   })
// }