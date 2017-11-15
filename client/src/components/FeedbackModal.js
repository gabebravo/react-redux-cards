import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const refreshPage = () => { 
  sessionStorage.clear();
  window.location.reload(); 
}

const FeedbackModal = ({ showModal, toggleModal, header, body, 
  shouldRefreshPage, isOnDeckPage = false }) => { // can remove default false, once true is added to the deck page
  const refreshBtn = shouldRefreshPage && !isOnDeckPage ? 
  <Button color="primary" onClick={refreshPage}>OK</Button>:
  <Button color="primary" onClick={toggleModal}>OK</Button>
  return(
    <div>
      <Modal isOpen={showModal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>{header}</ModalHeader>
        <ModalBody>{body}</ModalBody>
        <ModalFooter>
          {refreshBtn}
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default FeedbackModal;