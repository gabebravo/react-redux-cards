import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActiveDeck } from '../components/ActiveDeck';

import { Container } from 'reactstrap';
import Header from '../components/Header';
import HistoryChart from '../components/HistoryChart';
import DpsChart from '../components/DpsChart';
import { Redirect } from 'react-router-dom';

class Deck extends Component {

  render() {
    const { userDecks } = this.props;
    const { id } = this.props.match.params;
    const activeDeck = Object.keys(userDecks).length > 0 && 
      userDecks[id].cards ? userDecks[id].cards: [];
    return (
    <div> {
      Object.keys(userDecks).length === 0 ? ( <div><Redirect to="/"/></div> ) : (
      <div>
        <Header />
        <ActiveDeck adArray={activeDeck} dropDown={false}/>
        <Container style={{ marginTop: '5vh', marginBottom: '5vh'}}>
          <HistoryChart />
          <DpsChart />
        </Container>
      </div> )
    }
    </div>
    );
  }
}

const mapStateToProps = ({ userDecks }) => ({ userDecks })
export default connect(mapStateToProps, null)(Deck)