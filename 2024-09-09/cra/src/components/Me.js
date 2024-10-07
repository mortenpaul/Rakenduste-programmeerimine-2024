import React from 'react';
import './Me.css';

const Me = ({ name }) => {
  const hobbies = ['Autod', 'Restaureerimine', 'Arvutimängud', 'Kalastamine'];

  return (
    <div className="me-container">
      <h1>{name}</h1>

      <h2>Minu hobid</h2>
      <ul>
        {hobbies.map((hobby, index) => (
          <li key={index}>{hobby}</li>
        ))}
      </ul>

      <form className="contact-form">
        <label>Email:</label>
        <input type="email" placeholder="Email" />
        <label>Sõnum:</label>
        <textarea placeholder="Kirjuta midagi" />
      </form>

      <button className="cta-button">Saada</button>
    </div>
  );
};

export default Me;
