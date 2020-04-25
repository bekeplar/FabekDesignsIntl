import React from 'react';
import AppModal from 'react-modal';

const Modal = (props) => {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      position: 'fixed',
      paddingTop: '50px',
      paddingBottom: '50px',
      transition: 'all .5s ease',
      zIndex: 9999,
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    }
  };

  AppModal.setAppElement('#app');

  return (
    <AppModal
        contentLabel="Product Modal"
        isOpen={props.isOpen}
        onAfterOpen={props.afterOpenModal}
        onRequestClose={props.closeModal}
        shouldCloseOnOverlayClick
        style={customStyles}
    >
      {props.children}
    </AppModal>
  );
};

export default Modal;
