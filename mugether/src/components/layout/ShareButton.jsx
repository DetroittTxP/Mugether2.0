import React from 'react';

import { FacebookShareButton, TwitterShareButton, LineShareButton, FacebookIcon, TwitterIcon, LineIcon,VKShareButton,VKIcon } from 'react-share';
import "./ShareButton.css";




const ShareButton = ({url}) => {

  return (
    <div>
      <span style={{marginRight:30}}>
       🚶‍♂️ ค้นหาสถานที่ใกล้เคียง  ลองใช้ Mugether Chat bot ➡️
      </span>
        <a href='https://qr-official.line.me/sid/L/026gkuxb.png'>
        <LineIcon className='share-icon' href='https://qr-official.line.me/sid/L/026gkuxb.png' size={32} round={true} />
        </a>
    </div>
  );
};

export default ShareButton;
