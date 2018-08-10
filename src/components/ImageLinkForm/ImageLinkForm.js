import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => {
  return(
    <div>
      <p className='f3 mb3'>
        {'The All Seeing Eye can recognize faces. Give it a whirl.'}
      </p>
      <div className="center">
        <div className='form center pa4 br3 shadow-5'>
          <input
            className="f4 pa2 w-70 center"
            type="text"
            placeholder="https://"
            onChange={onInputChange}
          />
          {/* http://www.exmooradventures.co.uk/wp-content/uploads/2013/01/DSCN59891.jpg */}
          <button className="w-30 grow f4 link ph3 pv2 diib" onClickCapture={onPictureSubmit}>Detect</button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;