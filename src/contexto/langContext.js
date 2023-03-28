import React, { useState } from 'react';
import MensajesIngles from './../idiomas/inglés.json';
import MensajesEspañol from './../idiomas/español.json';
import {IntlProvider} from 'react-intl';

const langContext = React.createContext();

const configuracionGeneradorPorDefecto =
  JSON.parse(localStorage.getItem('configuracionGenerador')) || {
    numeroDeCaracteres: 14,
    simbolos: true,
    numeros: true,
    mayusculas: true,
};

const LangProvider = ({children}) => {
	const [configuracionGenerador, setConfiguracionGenerador] = useState(configuracionGeneradorPorDefecto);

	const cambiarConfiguracionGenerador = (nuevaConfiguracion) => {
		const nuevaConfiguracionGenerador = {...configuracionGenerador, ...nuevaConfiguracion};
		setConfiguracionGenerador(nuevaConfiguracionGenerador);
		localStorage.setItem('configuracionGenerador', JSON.stringify(nuevaConfiguracionGenerador));
	};	  

	let localePorDefecto;
	let mensajesPorDefecto;
	const lang = localStorage.getItem('lang');

	if(lang){
		localePorDefecto = lang

		if(lang === 'es-AR'){
			mensajesPorDefecto = MensajesEspañol;
		} else if(lang === 'en-US'){
			mensajesPorDefecto = MensajesIngles
		} else {
			localePorDefecto = 'en-US'
			mensajesPorDefecto = MensajesIngles
		}
	}

	const [mensajes, establecerMensajes] = useState(mensajesPorDefecto);
	const [locale, establecerLocale] = useState(localePorDefecto);

	const establecerLenguaje = (lenguaje) => {
		switch (lenguaje){
			case 'es-AR':
				establecerMensajes(MensajesEspañol);
				establecerLocale('es-AR');
				localStorage.setItem('lang', 'es-AR');
				break;
			case 'en-US':
				establecerMensajes(MensajesIngles);
				establecerLocale('en-US');
				localStorage.setItem('lang', 'en-US');
				break;
			default:
				establecerMensajes(MensajesIngles);
				establecerLocale('en-US');
				localStorage.setItem('lang', 'en-US');
		}
	}

	return (
		<langContext.Provider value={{
		  establecerLenguaje: establecerLenguaje,
		  configuracionGenerador: configuracionGenerador,
		  setConfiguracionGenerador: setConfiguracionGenerador,
		  cambiarConfiguracionGenerador: cambiarConfiguracionGenerador
		}}>
		  <IntlProvider locale={locale} messages={mensajes}>
			{children}
		  </IntlProvider>
		</langContext.Provider>
	  );
	  
}
 
export {LangProvider, langContext};