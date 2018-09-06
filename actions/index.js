export const Add_DECK = 'Add_DECK'
export const ADD_CARD = 'ADD_CARD'
export const LOAD_INITIAL = 'LOAD_INITIAL'

export function loadInitial(data) {
  return {
    type: LOAD_INITIAL,
    data
  }
}

export function addDeck(deck) {
  return {
    type: Add_DECK,
    deck
  }
}

export function addCard(card, deckId) {
  return {
    type: ADD_CARD,
    card,
    deckId
  }
}
