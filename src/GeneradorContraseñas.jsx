import React, { useState, useEffect, useContext } from 'react';
import './GeneradorContraseñas.css';
import styled from 'styled-components';
import { BotonIncrementar, BotonDisminuir, BotonCheck, BotonGenerar } from './componentes/Botones';
import generarPassword from './funciones/generarPassword';
import Footer from './componentes/Footer';
import NavBar from './componentes/Navbar';
import { FormattedMessage } from 'react-intl';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaCopy } from 'react-icons/fa';
import { langContext } from './contexto/langContext';


const GeneradorContraseñas = () => {
	const {configuracionGenerador, cambiarConfiguracionGenerador} = useContext(langContext);
	const [copiado, cambiarEstadoCopiado] = useState(false);
	
	const incrementarNumeroCaracteres = () => {
		cambiarConfiguracionGenerador({numeroDeCaracteres: configuracionGenerador.numeroDeCaracteres + 1});
	};
	
  	const disminuirNumeroCaracteres = () => {
  	  if (configuracionGenerador.numeroDeCaracteres > 1) {
  	    cambiarConfiguracionGenerador({numeroDeCaracteres: configuracionGenerador.numeroDeCaracteres - 1});
  	  }
  	};

  	const toggleSimbolos = () => {
  	  cambiarConfiguracionGenerador({simbolos: !configuracionGenerador.simbolos});
  	};

  	const toggleNumeros = () => {
  	  cambiarConfiguracionGenerador({numeros: !configuracionGenerador.numeros});
  	};

  	const toggleMayusculas = () => {
  	  cambiarConfiguracionGenerador({mayusculas: !configuracionGenerador.mayusculas});
  	};

	const [passwordGenerada, cambiarPasswordGenerada] = useState('');

	useEffect(() => {
		// Actualizar el título de la página con "Generar Contraseña"
		document.title = `Generar Contraseña`;
	  }, []);

	useEffect(() => {
		cambiarPasswordGenerada(generarPassword(configuracionGenerador));
	}, [configuracionGenerador]);

	const onSubmit = (e) => {
		e.preventDefault();

		cambiarPasswordGenerada(generarPassword(configuracionGenerador));
	}

	const onClickCopy = () => {
		navigator.clipboard.writeText(passwordGenerada);
		cambiarEstadoCopiado(true);
		setTimeout(() => {
		  cambiarEstadoCopiado(false);
		}, 3000);
	  };

	return (
		<div className='contenedorApp'>
			<NavBar />
			<div className="contenedorGeneradorContraseñas">
				<form className='formularioGeneradorContraseñas' onSubmit={onSubmit}>
					<div className="fila">
						<label>
							<FormattedMessage id="generator.numberGenerator" defaultMessage="Number of characters:"/>
						</label>
						<Controles>
							<BotonDisminuir click={disminuirNumeroCaracteres} />
							<span className='numeroGenerado'>{configuracionGenerador.numeroDeCaracteres}</span>
							<BotonIncrementar click={incrementarNumeroCaracteres} />
						</Controles>
					</div>
					<div className="fila">
						<label>
							<FormattedMessage id="generator.symbols" defaultMessage="Include symbols?"/>
						</label>
						<BotonCheck seleccionado={configuracionGenerador.simbolos} click={toggleSimbolos} />
					</div>
					<div className="fila">
						<label>
							<FormattedMessage id="generator.numbers" defaultMessage="Include numbers?"/>
						</label>
						<BotonCheck seleccionado={configuracionGenerador.numeros} click={toggleNumeros} />
					</div>
					<div className="fila">
						<label>
							<FormattedMessage id="generator.uppercase" defaultMessage="Include uppercase?"/>
						</label>
						<BotonCheck seleccionado={configuracionGenerador.mayusculas} click={toggleMayusculas} />
					</div>
					<div className="fila">
						<BotonGenerar />
						<div className="contenedorInputCopy">
    					  <Input type="text" readOnly={true} value={passwordGenerada} />
    					  <CopyToClipboard text={passwordGenerada}>
    					    <button className="botonCopiar" onClick={onClickCopy}>
    					      <FaCopy />
    					    </button>
    					  </CopyToClipboard>
    					  {copiado && (
    					    <div className="mensajeExito">
    					      <FormattedMessage
    					        id="generator.copiedToClipboard"
    					        defaultMessage="Copied to clipboard!"
    					      />
    					    </div>
    					  )}
    					</div>
					</div>
				</form>
			</div>
			<Footer />
		</div>
	);
}
 
export default GeneradorContraseñas;

const Controles = styled.div`
	display: flex;
	justify-content: space-between;
	text-align: center;

	& > * {
		flex: 1;
	}

	span {
		line-height: 40px;
		background: #144f13;
	}
`;

const Input = styled.input`
	width: 40vw;
	background: #888;
	border-radius: 4px;
	border: 1px solid #144f13;
	color: #fff;
	height: 40px;
	line-height: 40px;
	transition: all .3s ease;
	cursor: default;

	&:hover {
		border: 1px solid #212139;
	}

	&::selection {
		background: #212139;
	}

	&::-moz-selection {
		background: #212139;
	}

	@media (max-width: 740px) {
		width: 60vw;
	}
`;