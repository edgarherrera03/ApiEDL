import {
	HomeContainer,
	InfoContainer,
	Title,
	InfoTitle,
	TextContainer,
	WarningLogo,
	HelpLogo,
	LogoContainer,
} from "./home.styles";

const Home = () => {
	return (
		<>
			<HomeContainer>
				<Title>
					<h1>Administracion de la ApiEDL</h1>
				</Title>
				<InfoContainer>
					<LogoContainer>
						<WarningLogo />
					</LogoContainer>

					<TextContainer>
						<InfoTitle> Uso Adecuado De ApiEDL</InfoTitle>
						<p>
							Esta Aplicación está destinada a un uso autorizado y controlado.
							Cualquier uso no autorizado o abuso del recurso está estrictamente
							prohibido.
						</p>
					</TextContainer>
				</InfoContainer>
				<InfoContainer>
					<LogoContainer>
						<HelpLogo />
					</LogoContainer>
					<TextContainer>
						<InfoTitle>¿Necesita Ayuda?</InfoTitle>
						<p>
							Si tiene algún inconveniente o necesita asistencia técnica, por
							favor, contacte con el personal técnico correspondiente{" "}
							<a href="mailto:soporte@ets.consulting">soporte@ets.consulting</a>
						</p>
					</TextContainer>
				</InfoContainer>
			</HomeContainer>
		</>
	);
};

export default Home;
