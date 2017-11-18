import React, { Component } from 'react';
import { connect } from 'react-redux'
import { deleteUserDeck } from '../actions'
import { Button, ListGroup, ListGroupItem, Modal, ModalHeader, 
  ModalBody, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom'

class HeaderModal extends Component {

  printDeckList = (deckIds, arr) => {
    if(arr.length === 0 ) { return (
      <ListGroupItem style={{ fontSize: '1.5rem' }}>
        <Row>
          <Col><span>No Saved Decks Found</span></Col>
        </Row>
      </ListGroupItem>
    ) }
    return arr.map( (deck, index) => {
      return (
        <div key={deckIds[index]}>
          <ListGroupItem style={{ fontSize: '1.5rem' }}>
            <Row>
              <Col xs="5" md="6"><span>{deck.title}</span></Col>
              <Link className="open-search" to={`/deck/${deckIds[index]}`}>
              <Col xs="2" md="1"><Button onClick={() => this.props.toggleModal()} color="primary">View</Button></Col></Link>
              <Col xs="2" md="1"><Button onClick={() => this.props.deleteUserDeck(deckIds[index])} color="primary">Delete</Button></Col>
            </Row>
          </ListGroupItem>
        </div>
      )
    });
  }

  render() {
    const { showModal, toggleModal, decksArray, deckIds } = this.props;
    return(
      <div>
        <Modal isOpen={showModal} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Choose Deck</ModalHeader>
          <ModalBody style={{ padding: 0}}>
            <ListGroup>
              {this.printDeckList(deckIds, decksArray)}
            </ListGroup>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

const mapDispatchToProps = { deleteUserDeck }
export default connect(null, mapDispatchToProps)(HeaderModal);