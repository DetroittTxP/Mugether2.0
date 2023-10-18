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
    alert('Link copied to clipboard');
  };

  return (
    <div className="share-button-container">
      <button className="share-button" onClick={shareOnFacebook}>
        <img src="/path/to/share-icon.svg" alt="Share Icon" />
        Share on Facebook
      </button>
      <button className="share-button" onClick={copyLink}>
        <img src="/path/to/share-icon.svg" alt="Share Icon" />
        Copy Link
      </button>
    </div>
  );
};

export default ShareButton;
