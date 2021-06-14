import { AsyncStorage } from "react-native";

const STORAGE_KEY = "CARDS_DATA";

export async function saveDeckTitle(deckTitle) {
  try {
    await AsyncStorage.mergeItem(
      STORAGE_KEY,
      JSON.stringify({
        [deckTitle]: {
          title: deckTitle,
          questions: [],
        },
      })
    );

    return {
      [deckTitle]: {
        title: deckTitle,
        questions: [],
      },
    };
  } catch (err) {
    console.warn("deck title error", err);
  }
}

export async function getDecks() {
  try {
    // AsyncStorage.removeItem(STORAGE_KEY);
    const decks = await AsyncStorage.getItem(STORAGE_KEY);

    return decks;
  } catch (err) {
    console.warn("getDecks failed", err);
  }
}

export async function getDeck(id) {
  let deck = {};
  try {
    deck = getDecks().then((decks) => {
      decks = JSON.parse(decks);
      return decks[id];
    });
  } catch (err) {
    console.warn("error getting deck", err);
  }
  return deck;
}

export async function addCardToDeck(title, card) {
  let newDeck = {};
  try {
    const decks = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY));
    await AsyncStorage.mergeItem(
      STORAGE_KEY,
      JSON.stringify({
        [title]: {
          title,
          questions: decks[title].questions.concat(card),
        },
      })
    );
    newDeck = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY));
  } catch (err) {
    console.warn("error adding card", err);
  }
  return newDeck;
}
