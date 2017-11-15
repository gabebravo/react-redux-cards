import React, { Component } from 'react';
import { chartSeriesArray } from '../utils'
import Chart from './Chart'

class CostChart extends Component {

  constructor(props){
      super(props);
      this.state = {
          series: [ 
            { name: "card1 cost",
                data: [7, 5, 1, 5, 2] },
            { name: "death_damage",
                data: [4, 1, 9, 7, 4] },
            { name: "dash_damage",
                data: [1, 4, 8, 9, 2] },
            { name: "charge_damage",
                data: [5, 3, 9, 2, 1] },
            { name: "area_damage",
                data: [1, 2, 1, 1, 8] },
            { name: "spawn_damage",
                data: [8, 7, 3, 3, 5] },
            { name: "crown_tower_damage",
                data: [1, 5, 4, 1, 2] }
        ],
        changeState: false
      }
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    if( nextProps.modalStatus ) {
        return false
    } else if( !nextProps.modalStatus ) {
        return true
    } else if( nextProps.levelChange !== nextState.changeState ) {
        return true
    } else {
        return false
    }
  } 
  
  render() {
    // const seriesArray = chartSeriesArray(this.props.deckData, this.state.series)
    const options = {
      title: {
          text: 'Elixir Cost'
      },
      xAxis: {
          categories: ['Card1', 'Card2', 'Card3', 'Card4', 'Card5', 'Card6', 'Card7', 'Card8']
      },
      colors: [
        '#E4D354', 
        '#3D96AE', 
        '#F15C80', 
        '#999EFF', 
        '#F7A35C', 
        '#90ED7D', 
        '#000', 
        '#95CEFF',
        ], 
      plotOptions: {
          column: {
              colorByPoint: true
          }
      },
      series: [{
          type: 'column',
          name: 'Cost',
          data: [3, 2, 1, 5, 4, 8, 6, 7]
      }, {
          type: 'spline',
          name: 'Average',
          data: [4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5],
          marker: {
              lineWidth: 2,
              lineColor: 'orange',
              fillColor: 'white'
          }
      }]
    }

    return (
      <div><Chart options={options} /></div>
    );
  }
}

export default CostChart;