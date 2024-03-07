import React, { useState } from 'react';

import { FacebookShareButton, TwitterShareButton, LineShareButton, FacebookIcon, TwitterIcon, LineIcon } from 'react-share';
import "./ShareButton.css";



const ShareButton = ({url}) => {

  return (
    <>
      <FacebookShareButton url={url} className='share-icon'>
        <FacebookIcon size={32} round={true} />
      </FacebookShareButton>

      <TwitterShareButton url={url}  className='share-icon'>
        <TwitterIcon size={32} round={true} />
      </TwitterShareButton>

      <LineShareButton url={url}  className='share-icon'>
        <LineIcon size={32} round={true} />
      </LineShareButton>

    </>
  );
};

export default ShareButton;
