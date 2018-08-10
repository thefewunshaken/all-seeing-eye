import React from 'react';
import Tilt from 'react-tilt';
import eye from './eye.png';
import './Logo.css';

const Logo = () => {
  return(
    <div className='ma4 mt0'>
      <Tilt className="Tilt br2 shadow-2" options={{ max: 25, reverse: true }} style={{ height: 150, width: 150 }} >
        <div className="Tilt-inner pa3">
          <img style={{paddingTop: '5px'}} src={eye} alt="brain"/>
        </div>
      </Tilt>
    </div>
  );
}

export default Logo;