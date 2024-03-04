import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FacebookShareButton, TwitterShareButton, LineShareButton, FacebookIcon, TwitterIcon, LineIcon } from 'react-share';
import { FaLink } from 'react-icons/fa';
import { IoShareOutline } from "react-icons/io5";
import "./ShareButton.css";

const ShareModal = ({ show, handleClose, url }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      alert('Link copied to clipboard!');
      handleClose();
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Share</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FacebookShareButton url={url} className='share-icon'>
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>

        <TwitterShareButton url={url} className='share-icon'>
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>

        <LineShareButton url={url} className='share-icon'>
          <LineIcon size={32} round={true} />
        </LineShareButton>

        
        
        <Button variant="secondary" onClick={copyToClipboard}>
          <FaLink /> Copy Link
        </Button>
      </Modal.Body>
    </Modal>
  );
};

const ShareButton = ({ url }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button variant="outline-secondary" onClick={() => setShowModal(true)}>
        <IoShareOutline />Share
      </Button>

      <ShareModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        url={url}
      />
    </>
  );
};

export default ShareButton;
