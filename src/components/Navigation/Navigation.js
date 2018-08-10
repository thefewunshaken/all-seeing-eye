import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
    if(isSignedIn) {
      return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
          <p onClickCapture={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
        </nav>
      );
    } else {
      return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
          <p onClickCapture={() => onRouteChange('signin')} className='f4 link dim black underline pa3 pointer'>Sign In</p>
          <p onClickCapture={() => onRouteChange('register')} className='f4 link dim black underline pa3 pointer'>Register</p>
        </nav>
      );
    }
}

export default Navigation;