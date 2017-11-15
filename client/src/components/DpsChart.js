import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduceDpsData, dpsDataArray, sumDps } from '../utils'
import { Row, Col } from 'reactstrap';
import Chart from './Chart'

class DpsChart extends Component {

  constructor(props){
      super(props);
      this.state = {
          data: [ 
            {
                name: 'card1',
                y: 0,
            }, 
            {
                name: 'card2',
                y: 0,
            }, 
            {
                name: 'card3',
                y: 0,
            }, 
            {
                name: 'card4',
                y: 0,
            }, 
            {
                name: 'card5',
                y: 0,
            }, 
            {
                name: 'card6',
                y: 0,
            }, 
            {
                name: 'card7',
                y: 0,
            }, 
            {
                name: 'card8',
                y: 0,
            } 
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
    const deckData = reduceDpsData(this.props.activeDeck.cards);
    const dpsData = deckData.length > 0 ? 
        dpsDataArray(deckData, this.state.data) : this.state.data;
    const dpsTotal = sumDps(dpsData)
    const options = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: `Total Damage Per Second: ${dpsTotal}`
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.y}</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'dps',
            colorByPoint: true,
            data: dpsData
        }]
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
export default connect(mapStateToProps, null)(DpsChart);