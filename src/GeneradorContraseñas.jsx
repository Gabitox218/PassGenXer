import React, { useState, useEffect, useContext } from 'react';
import './GeneradorContraseñas.css';
import styled from 'styled-components';
import { BotonIncrementar, BotonDisminuir, BotonCheck, BotonGenerar } from './elementos/Botones (GeneradorContraseñas)';
import generarPassword from './funciones/generarPassword';
import Footer from './componentes/Footer';
import NavBar from './componentes/Navbar';
import { FormattedMessage } from 'react-intl';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaCopy } from 'react-icons/fa';
import { langContext } from './contexto/langContext';


const GeneradorContraseñas = () => {
	const {configuracionGenerador, cambiarConfiguracionGenerador} = useContext(langContext);
	
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

	return (
		<div className='contenedorApp'>
			<NavBar />
			<div className="contenedorGeneradorContraseñas">
				<form onSubmit={onSubmit}>
					<Fila>
						<label>
							<FormattedMessage id="generator.numberGenerator" defaultMessage="Number of characters:"/>
						</label>
						<Controles>
							<BotonDisminuir click={disminuirNumeroCaracteres} />
							<span className='numeroGenerado'>{configuracionGenerador.numeroDeCaracteres}</span>
							<BotonIncrementar click={incrementarNumeroCaracteres} />
						</Controles>
					</Fila>
					<Fila>
						<label>
							<FormattedMessage id="generator.symbols" defaultMessage="Include symbols?"/>
						</label>
						<BotonCheck seleccionado={configuracionGenerador.simbolos} click={toggleSimbolos} />
					</Fila>
					<Fila>
						<label>
							<FormattedMessage id="generator.numbers" defaultMessage="Include numbers?"/>
						</label>
						<BotonCheck seleccionado={configuracionGenerador.numeros} click={toggleNumeros} />
					</Fila>
					<Fila>
						<label>
							<FormattedMessage id="generator.uppercase" defaultMessage="Include uppercase?"/>
						</label>
						<BotonCheck seleccionado={configuracionGenerador.mayusculas} click={toggleMayusculas} />
					</Fila>
					<Fila>
						<BotonGenerar />
						<div className='contenedorInputCopy'>
							<Input type="text" readOnly={true} value={passwordGenerada} />
							<CopyToClipboard text={passwordGenerada}>
  							  <button className="botonCopiar">
								<FaCopy />
  							  </button>
  							</CopyToClipboard>
						</div>
					</Fila>
				</form>
			</div>
			<Footer />
		</div>
	);
}
 
export default GeneradorContraseñas;


const Fila = styled.div`
	margin-bottom: 30px;
	padding-top: 19px;
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 10px;
	justify-items: center;
`;

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
	width: 524px;
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
`;