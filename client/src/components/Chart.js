import React, { Component } from 'react';
import Highcharts from 'highcharts';

export default class Chart extends Component {

  componentDidMount() {
    this.chart = new Highcharts[this.props.type || 'Chart'](
      this.chartEl,
      this.props.options
    );
  }

  componentDidUpdate(prevProps, prevState) {
    // only update chart if the data has changed
    if (prevProps.options !== this.props.options) {
      this.chart = new Highcharts[this.props.type || 'Chart'](
        this.chartEl,
        this.props.options
      );
    }
  }

  componentWillUnmount() {
    this.chart.destroy();
  }

  render() {
    return <div ref={el => this.chartEl = el} />;
  }
}