import React, { useState } from "react";
import { useRef } from "react";

// Create a component that tracks and displays the number of times it has been rendered. Use useRef to create a variable that persists across renders without causing additional renders when it changes.

export function Assignment2() {
  const [_, forceRender] = useState(0);
  const numRender = useRef(0);

  const handleReRender = () => {
    // Update state to force re-render
    forceRender(Math.random());
  };

  numRender.current = numRender.current + 1;

  return (
    <div>
      <p>This component has rendered {numRender.current} times.</p>
      <button onClick={handleReRender}>Force Re-render</button>
    </div>
  );
}
