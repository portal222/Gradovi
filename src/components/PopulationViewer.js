import React, { useState, useEffect } from 'react';

const PopulationViewer = ({ populationCounts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex < populationCounts.length - 1 ? prevIndex + 1 : 0
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [populationCounts.length]);

  const currentData = populationCounts[currentIndex];

  return (
    <p>{currentData.year + " - " + currentData.value.toLocaleString()}</p>
  );
};

export default PopulationViewer;