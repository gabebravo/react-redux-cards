import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';
import BattleCard from './BattleCard'

export const ActiveDeck = ({ adArray, dropDown }) => {
  return (
    <Container style={{ marginTop: '15vh'}}>
      <Row className="text-center" style={{ marginBottom: '5vh'}}>
        { adArray.map( (card, index) => {
          return (
          <Col xs="6" md="3" key={index}>
            <BattleCard 
              img={card.image} 
              name={ card.level ? `${card.name}: Level ${card.level}`: card.name}
              levels={ card.levels }
              cardIndex={index}
              showDropdown={ dropDown }
            />
          </Col>)
        }) }
      </Row>
    </Container>
  )
}
