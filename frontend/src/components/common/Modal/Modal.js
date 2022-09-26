import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const  CommonModal=({show,message,onHide,btnsave,modalHeading,fncall}) =>{ 
    return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{modalHeading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
     {btnsave ?     <Button variant="primary" onClick={fncall}>
            {btnsave}
          </Button> : ' '}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CommonModal;