# Introduction

This is a flashcard project which allows users to create different categories of flashcards called "decks", add flashcards to those decks, then take quizzes on those decks.

## Installation and Development

You can Install dependencies by running:
`npm install`
Then start the app by running
`expo start`

## Platforms

The Application has been tested on an IOS and android device using EXPO

## Database

AsyncStorage is used to represent our database. It is responsible for storing all data used in the application.

### API

Application makes use of 4 api calls:

getDecks: return all of the decks along with their titles, questions, and answers.

getDeck: take in a single id argument and return the deck associated with that id.

saveDeckTitle: take in a single title argument and add it to the decks.

addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.

## Contribution

Contributions are not allowed for this project as it is an assessment for the Udacity React Nanodegree
