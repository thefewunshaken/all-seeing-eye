import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, boundingBox }) => {
  return(
    <div className="center ma">
      <div className="absolute mt2">
        <img id="inputImg" src={imageUrl} alt="" width="500px" height="auto"/>
        {boundingBox}
      </div>
    </div>
  );
}

export default FaceRecognition;