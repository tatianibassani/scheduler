import {useState} from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    setMode(newMode);
    if (replace) {
      setHistory(prev => [...prev.slice(0, prev.length-1), newMode]);
    } else {
      setHistory(prev => [...prev, newMode]);
    }
  }

  function back() {
    setHistory(prev => {
      if (prev.length > 1) {
        setMode(prev[prev.length-2]);
        return prev.slice(0, prev.length-1);
      } else {
        return prev;
      }
    });
  }

  return {mode, transition, back};
}
