import { HomeContainer, InfoContainer, Title, InfoTitle } from "./home.styles";
const Home = () => {
	return (
		<>
			<HomeContainer>
				<Title>
					<h1>Administracion de la ApiEDL</h1>
				</Title>
				<InfoContainer>
					<InfoTitle>Uso Adecuado De ApiEDL</InfoTitle>
					<p>
						Esta Aplicación está destinada a un uso autorizado y controlado.
						Cualquier uso no autorizado o abuso del recurso está estrictamente
						prohibido.
					</p>
				</InfoContainer>
				<InfoContainer>
					<InfoTitle>¿Necesita Ayuda?</InfoTitle>
					<p>
						Si tiene algún inconveniente o necesita asistencia técnica, por
						favor, contacte con el personal técnico correspondiente{" "}
						<span>soporte@ets.consulting</span>.
					</p>
				</InfoContainer>
			</HomeContainer>
		</>
	);
};

export default Home;
