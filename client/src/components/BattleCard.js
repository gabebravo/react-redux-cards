import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleAllCardsModal, setAdSelectedindex, setActiveDeck } from '../actions';
import { Card, CardImg, CardBlock, CardTitle, ButtonDropdown, 
  DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class BattleCard extends Component {

  state = {
    isOpen: false
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  updateCardInfo = index => {
    this.props.setAdSelectedindex(index)
  }

  updateLevel = (level, cardIndex) => {
    const activeDeckCopy = [...this.props.activeDeck.cards];
    activeDeckCopy[cardIndex].level = level;
    this.props.setActiveDeck(activeDeckCopy)  
  };

  updateLevel = (level, cardIndex) => {
    const activeDeckCopy = [...this.props.activeDeck.cards];
    const updatedCard = Object.assign({}, activeDeckCopy[cardIndex], { level });
    const updatedDeck = activeDeckCopy.map( card => {
       return card.clash_id === updatedCard.clash_id ?
       updatedCard : card;
    })
    this.props.setActiveDeck(updatedDeck)  
  };

  printDropdownItem = (counter, cardIndex) => {
    let DropdownItems = [];
    for( let i = 0; i < counter; i++ ){
      DropdownItems.push(
      <DropdownItem key={i} 
        onClick={ () => this.updateLevel((i + 1), cardIndex) }>
        {i + 1}
      </DropdownItem>);
    }
    return DropdownItems;
  }

  render() {
    const {img, name, levels, toggleAllCardsModal, cardIndex, allCardsModal, showDropdown } = this.props;
    return (
      <div>
        <Card style={{ border: 'none' }}>
          <CardImg onClick={() => { this.updateCardInfo(cardIndex); toggleAllCardsModal(allCardsModal) }} top width="100%" src={img} alt="clash royale" />
          <CardBlock>
            <CardTitle style={{ fontSize: '1.3rem'}}>{name}</CardTitle>
            {
              showDropdown && name.length !== 0 ?
                <span style={{ marginLeft: -1}}>
                <ButtonDropdown isOpen={this.state.isOpen || false } toggle={this.toggle}>
                  <DropdownToggle caret>
                    Level
                  </DropdownToggle>
                  <DropdownMenu>
                    { (typeof levels) === 'object' ? 
                      this.printDropdownItem(Object.keys(levels).length, cardIndex) : '' }
                  </DropdownMenu>
                </ButtonDropdown>
                </span> : ''
            }
          </CardBlock>
        </Card>
      </div>
    );
  }
};

const mapStateToProps = ({ allCardsModal, activeDeck }) => ({ allCardsModal, activeDeck })
const mapDispatchToProps = { toggleAllCardsModal, setAdSelectedindex, setActiveDeck }
export default connect(mapStateToProps, mapDispatchToProps)(BattleCard);