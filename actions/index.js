export const RECEIVE_DECKS = "RECEIVE_DECKS";
export const ADD_DECK = "ADD_DECK";
export const ADD_CARD = "ADD_CARD";

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  };
}

export function addDeck(newDeck) {
  return {
    type: ADD_DECK,
    newDeck,
  };
}

export function addCard(deck, question) {
  return {
    type: ADD_CARD,
    question,
    deck,
  };
}
