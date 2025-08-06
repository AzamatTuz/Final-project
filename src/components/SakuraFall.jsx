import React, { useEffect, useState } from 'react';

const SakuraFall = () => {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    const newPetals = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 5 + Math.random() * 5,
      size: 10 + Math.random() * 20
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-50">
      {petals.map(petal => (
        <div
          key={petal.id}
          className="absolute sakura"
          style={{
            left: `${petal.left}%`,
            animationDelay: `${petal.delay}s`,
            animationDuration: `${petal.duration}s`,
            width: `${petal.size}px`,
            height: `${petal.size}px`
          }}
        />
      ))}
    </div>
  );
};

export default SakuraFall;
