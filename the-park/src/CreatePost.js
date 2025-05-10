import React, { useState } from 'react';

function CreatePost() {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handlePost = () => {
    console.log('Posting:', { caption, image });
    // Reset form
    setCaption('');
    setImage(null);
  };

  const handleNotNow = () => {
    console.log('User chose not to post right now.');
  };

  return (
    <div className="create-post-container">
      <h2>Create a Post</h2>
      <textarea
        value={caption}
        onChange={handleCaptionChange}
        placeholder="Write something about your pet..."
        className="input-field"
        rows="4"
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="input-field"
      />
      <button className="login-button" onClick={handlePost}>Post</button>
      <button className="forgotpw-button" onClick={handleNotNow}>Not Now</button>
    </div>
  );
}

export default CreatePost;