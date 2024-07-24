import React, { useState } from "react";
import "./cards.css";

function Card({ name, img }) {
  const [{ angl, x, y }] = useState({
    angl: Math.random() * 90 - 45,
    x: Math.random() * 40 - 20,
    y: Math.random() * 40 - 20,
  });

  const transform = `translate(${x}px, ${y}px) rotate(${angl}deg)`;

  return <img className="crd" alt={name} src={img} style={{ transform }} />;
}

export default Card;
