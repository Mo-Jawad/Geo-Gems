import React, { useState, useEffect } from 'react';

export const RippleButton = React.forwardRef(({
  className = '',
  children,
  rippleColor = 'rgba(255, 255, 255, 0.45)',
  duration = '600ms',
  onClick,
  ...props
}, ref) => {
  const [rippleArray, setRippleArray] = useState([]);

  useEffect(() => {
    if (rippleArray.length > 0) {
      const timer = setTimeout(() => {
        setRippleArray([]);
      }, parseInt(duration, 10) || 600);
      return () => clearTimeout(timer);
    }
  }, [rippleArray.length, duration]);

  const showRipple = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const newRipple = {
      x,
      y,
      size,
      id: Date.now() + Math.random(),
    };

    setRippleArray((prevState) => [...prevState, newRipple]);
    if (onClick) onClick(e);
  };

  return (
    <button
      ref={ref}
      className={`relative inline-flex items-center justify-center overflow-hidden font-medium transition-all duration-200 active:scale-95 cursor-pointer select-none ${className}`}
      onClick={showRipple}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
      <span className="absolute inset-0 pointer-events-none overflow-hidden rounded-[inherit]">
        {rippleArray.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute rounded-full animate-ripple pointer-events-none"
            style={{
              top: `${ripple.y}px`,
              left: `${ripple.x}px`,
              width: `${ripple.size}px`,
              height: `${ripple.size}px`,
              backgroundColor: rippleColor,
              animationDuration: duration,
            }}
          />
        ))}
      </span>
    </button>
  );
});

RippleButton.displayName = 'RippleButton';
export default RippleButton;
