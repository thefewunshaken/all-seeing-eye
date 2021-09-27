import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import './App.css';
import Particles from 'react-particles-js';

import { setImageUrl, fetchImageData } from './actions';

const mapStateToProps = (state) => {
  return {
    imageUrl: state.image.url,
    isPending: state.image.isPending,
    imageData: state.image.data,
    boundingBoxes: state.image.boundingBoxes,
    error: state.image.error
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onInputChange: (event) => dispatch(setImageUrl(event.target.value)),
    onFetchImageData: () => dispatch(fetchImageData())
  }
}

const particlesOptions = {
  particles: {
    number: {
        value: 160,
        density: {
            enable: false
        }
    },
    size: {
        value: 3,
        random: true,
        anim: {
            speed: 4,
            size_min: 0.3
        }
    },
    line_linked: {
        enable: false
    },
    move: {
        random: true,
        speed: 1,
        direction: 'top',
        out_mode: 'out'
    }
  },
  interactivity: {
      events: {
          onhover: {
              enable: true,
              mode: 'bubble'
          },
          onclick: {
              enable: true,
              mode: 'repulse'
          }
      },
      modes: {
          bubble: {
              distance: 250,
              duration: 2,
              size: 0,
              opacity: 0
          },
          repulse: {
              distance: 400,
              duration: 4
          }
      }
  }
};
const serverEndpoint = process.env.REACT_APP_SERVER_ENDPOINT;


// https://api.time.com/wp-content/uploads/2017/12/terry-crews-person-of-year-2017-time-magazine-2.jpg

function App(props) {
  const { onInputChange, onFetchImageData, imageUrl, imageData, boundingBoxes } = props;
  const [user, setUser] = useState({});
  // const [imageData, setImageData] = useState({});
  // const [boundingBoxes, setBoundingBoxes] = useState({});
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    
    if (route.match(/^(?:sign)(?:out|in|up)/gm)) {
      setIsSignedIn(false);
      setUser({});
    } else {
      setIsSignedIn(true);
    }
  }, [route])

  useEffect(() => {
    if (imageData) {
      console.log(imageData);
      updateUserEntires();
    }
  }, [imageData])

  const postImageUrlToClarifai = async () => {
    try {
      const data = await onFetchImageData();
      return data;
    }
    catch (error) {
      console.log(error);
    }
  }

  const onPictureSubmit = () => {
    if (imageUrl) {
      console.log('onButtonSubmit called');
      postImageUrlToClarifai();
    }
  }

  const onRouteChange = (route) => {
    setRoute(route);
  }

  const updateUserEntires = async () => {
    try {
      const result = await fetch(`${serverEndpoint}/update-entries`,
        {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ userUUID: user.uuid, entries: user.entries })
        }
      );
      const entriesJson = await result.json();
      setUser({...user, entries: entriesJson.entries});
    }
    catch (error) {
      console.log(error);
    }
  }

  const initializeActiveUser = user => {
    console.log(user);
    setUser(user);
  };

  return (
    <div className="App flex flex-column pt1">
      <Particles params={particlesOptions} className="particles" />
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      <Logo />
      {
        route === 'signin' ? <SignIn onRouteChange={onRouteChange} initializeActiveUser={initializeActiveUser} serverEndpoint={serverEndpoint} />
          : route === 'signup' ? <SignUp onRouteChange={onRouteChange} initializeActiveUser={initializeActiveUser} serverEndpoint={serverEndpoint} />
            : <>
              <Rank user={user} />
              <ImageLinkForm onInputChange={onInputChange} onPictureSubmit={onPictureSubmit}/>
              <FaceRecognition image={imageUrl} boundingBoxes={boundingBoxes}/>
              <div className="tc">Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
            </>
      }
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
