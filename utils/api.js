import { AsyncStorage } from 'react-native'
import { DECK_STORAGE_KEY, checkEmptyDeck } from './helpers'

export function fetchDecks() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then(checkEmptyDeck)
}

export function submitDeck(deck) {
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(deck))
}
