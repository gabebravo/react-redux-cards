import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUserDeck } from '../actions';
import FeedbackModal from '../components/FeedbackModal';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import { buildUserDeck } from '../utils'
const uuidv1 = require('uuid/v1');

class MemberForm extends Component {

  state = {
    title: '',
    description: '',
    showModal: false, 
    modalTitle: '',
    modalBody: '',
    initModalDisplayed: false,
  }

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  updateFormValues = e => {
    switch(e.currentTarget.name){
      case 'title' :
        this.setState({ title: e.target.value });
        break;
      case 'description' :
        this.setState({ description: e.target.value });
        break;
      default: 
        break;
    }
  }

  submitHandler = () => {
    const { title, description } = this.state;
      if( title.length === 0 ) {
        this.setState({ 
          showModal: true, 
          modalTitle: 'Title Field is blank',
          modalBody: 'Please give your deck a name.',
        });
      } else if ( description.length === 0 ) {
        this.setState({ 
          showModal: true, 
          modalTitle: 'Description Field is blank',
          modalBody: 'Please give your deck a description.',
        });
      } else {
        if( !this.state.initModalDisplayed ) {
          this.setState({ 
            modalTitle: 'Success',
            modalBody: 'Your deck has been saved. You can view it in the View Decks link in the header.',
            showModal: true,
            initModalDisplayed: true
          });
        }
        this.setState({ 
          title: '', 
          description: '',
        });
        const id = uuidv1();
        const newUserDeck = buildUserDeck(this.props.activeDeck.cards, title, description);
        this.props.setUserDeck(id, newUserDeck);
      }
  }

  render() {
    return (
      <div>
      <Container className="addFormDivMargin">
        <Row><Col>
            <Form>
              <FormGroup>
              <legend>Deck Information</legend>
                <Label for="name">Name</Label>
                <Input onChange={this.updateFormValues} value={this.state.title } 
                  type="text" name="title" placeholder="Enter the Deck name" />
              </FormGroup>     
              <FormGroup>
                <Label for="description">Description</Label>
                <Input onChange={this.updateFormValues} value={this.state.description} 
                  type="textarea" name="description" />
              </FormGroup>
              <Button color="primary" onClick={this.submitHandler}>Submit</Button>
            </Form>
            <FeedbackModal  
              showModal={this.state.showModal}
              toggleModal={this.toggleModal}
              header={this.state.modalTitle}
              body={this.state.modalBody}
            />
            </Col></Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = ({ activeDeck }) => ({ activeDeck });
const mapDispatchToProps = { setUserDeck }
export default connect(mapStateToProps, mapDispatchToProps)(MemberForm);