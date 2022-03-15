import React, { useState, useEffect } from "react";

function UseEffectSetinterval() {
  const [count, setCount] = useState(0);
  const tick = () => {
    setCount(count + 1);
  };
  useEffect(() => {
    const interval = setInterval(tick, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      UseEffectsetinterval
      {count}
    </div>
  );
}

export default UseEffectSetinterval;
