import React, { useEffect, useState } from "react";

const Debug = () => {
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    const handleGlobalClick = () => {
      setClickCount((prevCount) => {
        const newCount = prevCount + 1;
        console.log("Total clicks on page:", newCount);
        return newCount;
      });
    };

    // Attach global click event listener
    document.addEventListener("click", handleGlobalClick);

    // Cleanup event listener on unmount
    // return () => {
    //   document.removeEventListener("click", handleGlobalClick);
    // };
  }, []);

  return (
    <div>
      <h1>Debug Component</h1>
      <p>Click count: {clickCount}</p>
      <button onClick={() => console.log("Button clicked")}>Test Button</button>
    </div>
  );
};

export default Debug;
