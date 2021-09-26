import { useState, useEffect } from 'react';

export const PopInBelow = ({ timing = 250, timeout = 2500, children }) => {
  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const style = {
    opacity: isVisible ? 1 : 0,
    // position: 'absolute',
    // left: 0,
    // right: 0,
    // bottom: 0,
    backfaceVisibility: 'hidden',
    zIndex: 100,
    transform: isActive
      ? `translateY(0)`
      : `translateY(-25px)`,
    transition: `all ${timing}ms`
  };

  useEffect(() => {
    if (!isActive) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsVisible(false);
      setIsActive(false);
    }, timeout);

    return () => {
      window.clearTimeout(timeoutId);
    };
    
  }, [isActive, timeout]);

  useEffect(() => {
    if (!children) {
      return;
    }

    setIsVisible(true);
    setIsActive(true);
    
  }, [children]);

  return (
    <span style={style}>
      {children}
    </span>
  )
}