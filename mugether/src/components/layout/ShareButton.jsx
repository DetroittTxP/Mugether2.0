import React from 'react';

const ShareButton = ({ url }) => {
  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer.php?u=${encodeURIComponent(url)}`);
    
  };

  const copyLink = () => {
    const textField = document.createElement('textarea');
    textField.innerText = url;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    document.body.removeChild(textField);
    alert('Copied to clipboard');
  };

  return (
    <div className="share-button-container" style={{paddingLeft:'700px'}}  >
      <button className="share-button" onClick={shareOnFacebook}>
        <img src="https://cdn-icons-png.flaticon.com/128/1828/1828954.png" alt="Share Icon"style={{ width: '24px', height: '24px' }} /><br/>
        Share on Facebook
      </button>
      <br/><br/>
      <button className="share-button" onClick={copyLink} style={{paddingTop:'10px'}}>
        <img src="https://cdn-icons-png.flaticon.com/128/126/126498.png" alt="Share Icon" style={{ width: '24px', height: '24px' }} /><br/>
        Copy Link
      </button>
    </div>
  );
};

export default ShareButton;
