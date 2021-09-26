import faceScan from './face-scan.png';
import { useSpring, animated } from 'react-spring';

const calc = (x, y) => {
  // console.log(`x: ${x}, y: ${y}`);
  // console.log(-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20);
  return [-((y*9) - window.innerHeight / 2) / 20, ((x*4) - window.innerWidth / 2) / 20, 1.05]
};
const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

const Logo = () => {
  const [props, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 5, tension: 350, friction: 40 } }))
  return (
    <animated.div
      className="ma4 mt0 h4 w4 pa3 top-0"
      // onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x,y) })}
      onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x,y) })}
      onMouseLeave={() => set({ xys: [0, 0, 1] })}
      style={{ transform: props.xys.to(trans) }}
    >
      <img src={faceScan} alt="face" />
    </animated.div>
  )
}

export default Logo;