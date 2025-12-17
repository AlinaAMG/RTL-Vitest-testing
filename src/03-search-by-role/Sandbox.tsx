import { useEffect, useState } from "react";


const Sandbox = () => {
  const [showAsyncButton, setShowAsyncButton] = useState(false);
  const [showError] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAsyncButton(true);
    }, 1000)
    return () => clearTimeout(timer);
  },[])
  return <div>
    <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
    </nav>
    {/* HEADINGS */}
    <h1>Main Heading</h1>
    <h2>Subheading</h2>
    <img src="example.jpg" alt="Example" />
    {/* REGULAR BUTTONS */}
    <button>Click Me </button>
    <button>Submit </button>
    <button>Cancel</button>
    
    {/*CONDITIONAL ERROR BUTTON TO DEMONSTRATE queryByRole */}
    {showError && <button>Error</button>}
    {/*ASYNC BUTTON TO DEMONSTRATE findByRole  */}
    {showAsyncButton && <button>Async Button</button>}
    </div>
};
export default Sandbox;
