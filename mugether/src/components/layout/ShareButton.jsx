import React from 'react';
import { Button } from 'react-bootstrap';
import { FacebookShareButton, TwitterShareButton, LineShareButton, FacebookIcon, TwitterIcon, LineIcon } from 'react-share';
import { FaLink } from 'react-icons/fa';
import { IoShareOutline } from "react-icons/io5";
import "./ShareButton.css";

const ShareButton = ({ url }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      alert('Link copied to clipboard!');
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  };

  return (
    <div className="share-options">
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
    </div>
  );
};

export default ShareButton;
