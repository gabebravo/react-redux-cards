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
    const fullDeckCopy = {...fullDeck}, activeDeckCopy = [...activeDeck];
    const modifiedModalCard = Object.assign({}, fullDeckCopy[selectedCardId], { level: 1});
    activeDeckCopy[adSelectedCardIndex] = modifiedModalCard;
    const updatedFullDeck = _.omit(fullDeckCopy, [selectedCardId]);
    this.props.setAllCards(updatedFullDeck);
    this.props.setActiveDeck(activeDeckCopy);
  }

  swapActiveCardForModalSelectionCard = (selectedCardId, fullDeck, activeDeck, adSelectedCardIndex) => {
    const fullDeckCopy = Object.assign({}, {}, fullDeck), activeDeckCopy = [...activeDeck];
    // pass the card from the active deck back into the fulldeck >> must happen first
    fullDeckCopy[ activeDeckCopy[adSelectedCardIndex].clash_id ] = activeDeckCopy[adSelectedCardIndex];
    const modifiedModalCard = Object.assign({}, fullDeckCopy[selectedCardId], { level: 1});
    activeDeckCopy[adSelectedCardIndex] = modifiedModalCard; // reassign card into the active deck >> must happen after
    const updatedFullDeck = _.omit(fullDeckCopy, [selectedCardId]);
    this.props.setAllCards(updatedFullDeck);
    this.props.setActiveDeck(activeDeckCopy);
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