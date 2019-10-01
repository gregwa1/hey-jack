const player = '';
const computer = '';

//Shuffling Deck
let shuffleDeck = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";

//Buttons
let playButton = document.querySelector('#play');
let hitButton = document.querySelector('#hit');
let stayButton = document.querySelector('#stay');

//dealing cards
let dealCards = async (cards) => {
  let response = await axios.get(`https://deckofcardsapi.com/api/deck/${cards}/draw/?count=2`);
  console.log(response);
}

//Getting deck_id
playButton.addEventListener(`click`, async () => {
  let response = await axios.get(`https://deckofcardsapi.com/api/deck/o9z1x6oiqd0i/shuffle/?deck_count=1`);
  // console.log(response.data.deck_id)
  dealCards(response.data.deck_id)
});

//dealing
