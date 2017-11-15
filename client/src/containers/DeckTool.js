import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { ActiveDeck } from '../components/ActiveDeck';

import { Container, Row, Col } from 'reactstrap';
import Header from '../components/Header';
import AllCardsModal from '../components/AllCardsModal';
import MemberForm from '../components/MemberForm';
import HistoryChart from '../components/HistoryChart';
import DpsChart from '../components/DpsChart';
// import CostChart from '../components/CostChart';

class DeckTool extends Component {

  render() {
    const { activeDeck, allCards } = this.props;
    const activeDeckCount = this.props.activeDeck.cards.filter( card => card.level > 0 );
    const addDeckForm = activeDeckCount.length === 8 ?  <MemberForm /> : <span></span>
    return (
      <div>
        <Header />
        <ActiveDeck adArray={activeDeck.cards} dropDown={true}/>
          {addDeckForm}
        <Container style={{ marginTop: '5vh', marginBottom: '5vh'}}>
          <HistoryChart />
          <DpsChart />
        </Container>
        <AllCardsModal allCards={allCards} />
      </div>
    );
  }
}

const mapStateToProps = ({ allCards, activeDeck }) => ({ allCards, activeDeck })
export default connect(mapStateToProps, actions)(DeckTool)
