
const Navigation = ({ onRouteChange, isSignedIn }) => {
  return (
    isSignedIn ?
      <nav className="absolute right-1">
        <p onClick={() => onRouteChange('signin')} className="f3 link dim black underline pa3 pointer">Sign Out</p>
      </nav>
    :
      <nav className="absolute right-1">
        {/* <p onClick={() => onRouteChange('signup')} className="f3 link dim black underline pa3 pointer">Sign Up</p> */}
        {/* <p onClick={() => onRouteChange('signin')} className="f3 link dim black underline pa3 pointer">Sign In</p> */}
      </nav>
  )
}

export default Navigation;
