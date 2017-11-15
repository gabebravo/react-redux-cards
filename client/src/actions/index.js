// allCards Actions
export const SET_ALLCARDS = 'SET_ALLCARDS'
export const setAllCards = deck => ({
    type: SET_ALLCARDS, deck
})

// activeDeck Actions
export const SET_ACTIVE_DECK = 'SET_ACTIVE_DECK'
export const setActiveDeck = deck => ({
    type: SET_ACTIVE_DECK, deck
})

export const SET_AD_SELECTED_INDEX = 'SET_AD_SELECTED_INDEX'
export const setAdSelectedindex = index => ({
    type: SET_AD_SELECTED_INDEX, index
})

// allCardsModal Actions
export const AC_MODAL_STATE = 'AC_MODAL_STATE'
export const getAllCardsModalState = () => ({
    type: AC_MODAL_STATE
})

export const TOOGGLE_AC_MODAL = 'TOOGGLE_AC_MODAL'
export const toggleAllCardsModal = modalState => ({
    type: TOOGGLE_AC_MODAL, modalState
})

// userDeck Actions 
export const SET_USER_DECK = 'SET_USER_DECK'
export const setUserDeck = (id, deckObj) => {
    return {
        type: SET_USER_DECK, id, deckObj
    }
}

export const DELETE_USER_DECK = 'DELETE_USER_DECK'
export const deleteUserDeck = id => {
    return {
        type: DELETE_USER_DECK, id
    }
}

