import React, { useContext } from "react";
import es from '../imágenes/argentina.png';
import en from '../imágenes/united-states.png';
import {langContext} from '../contexto/langContext';
import GabyXer from '../imágenes/GabyXer.png';
import './Navbar.css';

function NavBar() {
  const idioma = useContext(langContext);

  return (
    <div className="navbar">
      <div className="iconPortfolio">
        <a href="https://www.gabyxer.com">
          <img src={GabyXer} alt="GabyXer"/>
        </a>
      </div>
      <div className="banderas">
			  <button onClick={() => idioma.establecerLenguaje('es-AR')}><img src={es} alt="Español"/></button>
			  <button onClick={() => idioma.establecerLenguaje('en-US')}><img src={en} alt="Inglés"/></button>
			</div>
    </div>
  );
}

export default NavBar;
