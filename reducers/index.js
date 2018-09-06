import { Add_DECK, ADD_CARD, LOAD_INITIAL } from '../actions'

function decks(state = {}, action) {
  // console.log(state[action.deckName])
  switch (action.type) {
    case Add_DECK:
      return {
        ...state,
        [action.deck]: { title: action.deck, questions: [] }
      }
    case ADD_CARD:
      return {
        ...state,
        [action.deckId]: {
          title: action.deckId,
          questions: state[action.deckId].questions.concat(action.card)
        }
      }
    case LOAD_INITIAL:
      return {
        ...state,
        ...action.data
      }
    default:
      return state
  }
}

export default decks
