import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Header from '../components/Header';

const NotFound = () =>
  <div>
  <Header />
    <div style={{marginTop: '15%', textAlign: 'center' }}>
      <h3>404 page not found</h3>
      <p>We are sorry but the page you are looking for does not exist.</p>
    </div>
  </div>

export default NotFound;