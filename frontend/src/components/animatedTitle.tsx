import React, { useEffect, useState } from "react";

const AnimatedBorder: React.FC = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setAnimate(true), 100); // trigger animation on mount
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="w-full">
      <span
        className={`
          block h-0.5 bg-amber-700 rounded transition-all duration-500 ease-out
          ${animate ? "w-24" : "w-0"}
        `}
      />
    </div>
  );
};

export default AnimatedBorder;
