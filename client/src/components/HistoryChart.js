import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduceDamageData, historySeriesArray } from '../utils'
import { Row, Col } from 'reactstrap';
import Chart from './Chart'

class HistoryChart extends Component {

  constructor(props){
      super(props);
      this.state = {
          series: [ 
            { name: "damage",
                data: [0] },
            { name: "death_damage",
                data: [0] },
            { name: "dash_damage",
                data: [0] },
            { name: "charge_damage",
                data: [0] },
            { name: "area_damage",
                data: [0] },
            { name: "spawn_damage",
                data: [0] },
            { name: "crown_tower_damage",
                data: [0] }
        ],
        changeState: false
      }
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    if( nextProps.allCardsModal ) {
        return false
    } else if( !nextProps.allCardsModal ) {
        return true
    } else {
        return false
    }
  } 
  
  render() {
    const damageData = reduceDamageData(this.props.activeDeck.cards);
    const seriesArray = historySeriesArray(damageData, this.state.series)
    const options = {
      chart: {
          type: 'bar'
      },
      title: {
          text: 'Current Damage'
      },
      xAxis: {
        categories: ['Current Deck']
      },
      yAxis: {
          min: 0,
          title: {
              text: ''
          }
      },
      legend: {
          reversed: true
      },
      plotOptions: {
          series: {
              stacking: 'normal',
              pointWidth: 35
          }
      },
      series: seriesArray
  }

    return (
        <Row>
            <Col style={{ marginBottom: '10vh'}}>
                <div><Chart options={options} /></div>
            </Col>
        </Row>
    );
  }
}

const mapStateToProps = ({ activeDeck, allCardsModal }) => ({ activeDeck, allCardsModal })
export default connect(mapStateToProps, null)(HistoryChart);