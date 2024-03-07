import React, { useState } from 'react';

import { FacebookShareButton, TwitterShareButton, LineShareButton, FacebookIcon, TwitterIcon, LineIcon,VKShareButton,VKIcon } from 'react-share';
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

      <VKShareButton url={url}  className='share-icon'>
        <VKIcon size={32} round={true} />
      </VKShareButton>

    </>
  );
};

export default ShareButton;
