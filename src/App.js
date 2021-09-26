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

import { setImageUrl } from './actions';

const mapStateToProps = (state) => {
  return {
    imageUrl: state.imageUrl
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onInputChange: (event) => dispatch(setImageUrl(event.target.value))
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
  const { onInputChange, imageUrl } = props;
  const [user, setUser] = useState({});
  const [imageData, setImageData] = useState({});
  const [boundingBoxes, setBoundingBoxes] = useState({});
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [imageDataIsLoaded, setImageDataIsLoaded] = useState(false);

  useEffect(() => {
    
    if (route.match(/^(?:sign)(?:out|in|up)/gm)) {
      setIsSignedIn(false);
      setUser({});
      setBoundingBoxes('');
      setImageData({});
      setImageDataIsLoaded(false);
    } else {
      setIsSignedIn(true);
    }
  }, [route])

  const calculateFaceLocation = results => {
    console.log('calculateFaceLocation called');
    console.log(results);
    let boundingBoxes = [];
    // data.regions[].data.concepts
    // data[2] is multicultural model
    if (results[2].data.regions.length) {
      results[2].data.regions.forEach(region => {
        boundingBoxes.push(region.region_info.bounding_box)
      });
    }
    // const clarifaiBoundingBox = data[2].data.regions[0].region_info.bounding_box;
    
    const image = document.getElementById('input-image');
    // const width = Number(image.width);
    // const height = Number(image.height);

    // * API currently returns coords as decimal percentage values
    boundingBoxes.forEach(box => {
      box.left_col = `${box.left_col * 100}%`;
      box.top_row = `${box.top_row * 100}%`;
      box.right_col = `${(1 - box.right_col) * 100}%`;
      box.bottom_row = `${(1 - box.bottom_row) * 100}%`;
    })
    // * leaving here in case API updates in the future to return coords as pixel value
    // boundingBoxes.forEach(box => {
    //   box.left_col = `${(box.left_col / width) * 100}%`;
    //   box.top_row = `${(box.top_row / height) * 100}%`;
    //   box.right_col = `${((width - box.right_col) / width) * 100}`;
    //   box.bottom_row = `${((height - box.bottom_row) / height) * 100}`;
    // })

    return boundingBoxes;
  }

  const displayBoundingBoxOnFaces = boxArray => {
    setBoundingBoxes(boxArray);
  }

  const postToClarifai = async () => {
    try {
      const response = await fetch(`${serverEndpoint}/image`,
        {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ url: imageUrl })
        }
      );
      const imageResults = await response.json();

      setImageDataIsLoaded(true);
      setImageData(imageResults);
      displayBoundingBoxOnFaces(calculateFaceLocation(imageResults));

    }
    catch (error) {
      setImageDataIsLoaded(false);
      console.log(error);
    }
  }

  const onPictureSubmit = () => {
    if (imageUrl) {
      console.log('onButtonSubmit called');
      postToClarifai();
      updateUserEntires();
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
