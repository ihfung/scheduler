import { useState } from "react";
export default function useVisualMode(initial) {

 
  const [history, setHistory] = useState([initial]); //we will need to keep track of the history of the modes, so we can go backwards to a previous mode.

function transition(newMode, replace = false) {
  setHistory(prev => {
    if (replace) { 
      return [...prev.slice(0, prev.length - 1), newMode]; // Replace the last element in the history with the new mode
    }
    return [...prev, newMode]; // Add the new mode to the history
  });
}


  function back() {
  setHistory(prev => {
    if (prev.length > 1) { // Check if there's more than one element in the history
      return [...prev.slice(0, prev.length - 1)]; // Return the history without the last element
    }
    return prev; // Return the current history if there's only one element
  });
}

  
  return { mode: history[history.length - 1] , transition, back};
}

// As seen here, the `useVisualMode` function can take an initial argument to set the mode state. We then return an object `{ mode }`, which can also be written as `{ mode: mode }`. This lets our tests (and components) access the current value of the mode from the hook.

//When transition is called, we need to set the new mode and add the new mode to our history.
// When back is called, it should remove the last item in our history array then set the mode to the last element in our history array.
