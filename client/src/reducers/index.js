import { combineReducers } from 'redux';
import * as actions from '../actions';
import { fullDeckArr } from '../data/allCards';

export const allCards = (state = fullDeckArr, action) => {
  switch(action.type) {
    case actions.SET_ALLCARDS : 
      return action.deck;
    default :
      return state;
  }
}

const activeDeckArr = [
  {image: 'clashroyale-cards/blank_card.png', name: '', isCardSet: 'false'},
  {image: 'clashroyale-cards/blank.png', name: '', isCardSet: 'false'},
  {image: 'clashroyale-cards/blank.png', name: '', isCardSet: 'false'},
  {image: 'clashroyale-cards/blank.png', name: '', isCardSet: 'false'},
  {image: 'clashroyale-cards/blank.png', name: '', isCardSet: 'false'},
  {image: 'clashroyale-cards/blank.png', name: '', isCardSet: 'false'},
  {image: 'clashroyale-cards/blank.png', name: '', isCardSet: 'false'},
  {image: 'clashroyale-cards/blank.png', name: '', isCardSet: 'false'},
];

export const activeDeck = (state = {
  cards: activeDeckArr,
  selectedIndex: 0
}, action) => {
  switch(action.type) {
    case actions.SET_ACTIVE_DECK : 
      const copyActiveDeck = {...state, cards: action.deck}
    return copyActiveDeck;
    case actions.SET_AD_SELECTED_INDEX :
      const copySelectedIndex = {...state, selectedIndex: action.index}
    return copySelectedIndex;
    default :
      return state;
  }
}

export const allCardsModal = ( state = false, action ) => {
  switch(action.type) {
    case actions.AC_MODAL_STATE: 
      return state;
    case actions.TOOGGLE_AC_MODAL: 
      const modalState = !action.modalState;
      return modalState;
    default: 
      return state;
  }
}

// REALLY GOOD EXAMPLE OF NORMALIZATION
const userDecks = (state = {}, action) => {
  switch(action.type) {
    case actions.SET_USER_DECK : 
      let userDeck = {};
      userDeck[`${action.id}`] = action.deckObj;
      return {...state, ...userDeck};
    case actions.DELETE_USER_DECK :
      const copy = Object.assign({}, {}, state)
      for( let key in copy ) {
        if( key === action.id) {
          delete copy[key]
        }
      }
      return copy;
    default: 
      return state;
  }
}

 export default combineReducers({ allCards, activeDeck, 
  allCardsModal, userDecks,
});
 