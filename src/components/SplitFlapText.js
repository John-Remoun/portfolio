import React, { useState, useEffect } from "react";
import "./SplitFlapText.css";

export default function SplitFlapText({
  words = ["BACK-END DEV", "NODE.JS EXPERT", "REST API ARCHITECT", "SYSTEM DESIGNER"],
  cycleDelay = 2500,
}) {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setFade(false);
      }, 300);
    }, cycleDelay);

    return () => clearInterval(interval);
  }, [words, cycleDelay]);

  return (
    <div className="role-flip-container">
      <span className={`role-flip-text ${fade ? "fade-out" : "fade-in"}`}>
        {words[index]}
      </span>
    </div>
  );
}