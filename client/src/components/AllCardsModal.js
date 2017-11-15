import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleAllCardsModal, setAllCards, setActiveDeck } from '../actions';
import { Button, Table, Modal, ModalHeader, ModalBody } from 'reactstrap';
const _ = require('lodash');

class AllCardsModal extends Component {

  printCardsArray = arr => {
    return arr.map( (card, index) => {
      return (
        <tr key={index}>
          <td><img src={card.image} alt="clash royale" width="50px" /></td>
          <td style={{ fontSize: '1.5rem' }}>{card.name}</td>
          <td><Button onClick={() => this.updateDeck(card.clash_id)} color="primary">Choose</Button></td>
        </tr>
      )
    });
  }

  addInitialModalSelectionToActiveDeck = (selectedCardId, fullDeck, activeDeck, adSelectedCardIndex) => {
    const fullDeckCopy = [...fullDeck], activeDeckCopy = [...activeDeck];
    const cardPickedFromModal = fullDeckCopy.find( card => card.clash_id === selectedCardId);
    const cardIndex = fullDeckCopy.indexOf(cardPickedFromModal);

    fullDeckCopy.splice(cardIndex, 1); // remove
    const copyCardPickedFromModal = Object.assign({}, cardPickedFromModal)
    copyCardPickedFromModal.level = 1, copyCardPickedFromModal.isCardSet = true; // make the default level 1
    activeDeckCopy.splice(adSelectedCardIndex, 1, copyCardPickedFromModal); // add
    this.props.setAllCards(fullDeckCopy);
    this.props.setActiveDeck(activeDeckCopy);
  }

  swapActiveCardForModalSelectionCard = (selectedCardId, fullDeck, activeDeck, selectedIndex) => {
    const fullDeckCopy = [...fullDeck], activeDeckCopy = [...activeDeck];
    const cardPickedFromModal = fullDeckCopy.find( card => card.clash_id === selectedCardId);
    const modifiedModalCard = Object.assign({}, cardPickedFromModal, { level: 1});

    const [adSwappedCard] = activeDeckCopy.splice(selectedIndex, 1, modifiedModalCard); // remove
    const modifiedAdCard = Object.assign({}, adSwappedCard, { level: 1});
    const filteredDeck = fullDeckCopy.filter( card => card.clash_id !== selectedCardId) // full deck
    filteredDeck.push(modifiedAdCard); // push in the new card

    this.props.setActiveDeck(activeDeckCopy);
    this.props.setAllCards(filteredDeck);
  }

  updateDeck = cardId => {
    const { toggleAllCardsModal, allCardsModal, allCards, activeDeck } = this.props;
    const { cards, selectedIndex } = activeDeck;

    if( cards[selectedIndex].isCardSet === 'false') {
      this.addInitialModalSelectionToActiveDeck(cardId, allCards, cards, selectedIndex);
      toggleAllCardsModal(allCardsModal);
    } 
    else {
      this.swapActiveCardForModalSelectionCard(cardId, allCards, cards, selectedIndex);
      toggleAllCardsModal(allCardsModal); 
    }
  }

  sortFullDeckByName = arr => {
    return _.sortBy(arr, ['name']);
  }

  render() {
    const { toggleAllCardsModal, allCardsModal, allCards } = this.props;
    const sortedDeck = this.sortFullDeckByName(allCards)
    return (
      <div>
        <Modal isOpen={allCardsModal} toggle={toggleAllCardsModal}>
          <ModalHeader toggle={toggleAllCardsModal}>Choose Card</ModalHeader>
          <ModalBody style={{ padding: 0}}>
            <Table>
              <tbody>{this.printCardsArray(sortedDeck)}</tbody>
            </Table>
          </ModalBody>
        </Modal>
      </div>
    )
  }

}

const mapStateToProps = ({ allCardsModal, allCards, activeDeck, selectedIndex }) => ({ allCardsModal, allCards, activeDeck, selectedIndex })
const mapDispatchToProps = { toggleAllCardsModal, setAllCards, setActiveDeck }
export default connect(mapStateToProps, mapDispatchToProps)(AllCardsModal);