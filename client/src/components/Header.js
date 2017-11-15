import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Collapse, Navbar, NavLink, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import HeaderModal from './HeaderModal'

class Header extends Component {

  state = {
    hamburgerIsOpen: false,
    showModal: false, 
    decksArray: [], 
    isUserLoggedIn: false
  }

  toggleLinks = () => {
    this.setState({
      hamurgerIsOpen: !this.state.hamurgerIsOpen
    })
  }

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  render() {
    const deckIds = Object.keys(this.props.userDecks)
    const deckVals = Object.values(this.props.userDecks)
    const viewDecksLink = deckIds.length > 0 ? 
      <NavLink onClick={this.toggleModal} className="text-white" style={{ fontSize: '1rem', marginRight: 15}}>View Decks</NavLink>:
      <NavLink></NavLink>
    return (
      <div>
        <Navbar color="inverse" inverse toggleable>
          <NavbarToggler right onClick={this.toggleLinks} />
          <NavbarBrand tag={Link} to="/" 
            className="text-white" style={{ fontSize: '2rem' }} >Clash Royale</NavbarBrand>
          <Collapse isOpen={this.state.hamurgerIsOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                {viewDecksLink}
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <HeaderModal 
          showModal={this.state.showModal} 
          toggleModal={this.toggleModal}
          decksArray={deckVals}
          deckIds={deckIds}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ userDecks }) => ({ userDecks });
export default connect(mapStateToProps, null)(Header);