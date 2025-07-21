import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import {
	EdlProfilesContainer,
	TitleContainer,
	EdlProfile,
	EdlLink,
	TitleLinkContainer,
	Logo,
	InfoContainer,
	Info,
} from "./edl-profiles.styles";
const EdlProfiles = () => {
	return (
		<EdlProfilesContainer>
			<TitleContainer>
				<span>Perfiles EDL</span>
			</TitleContainer>
			<EdlProfile>
				<EdlLink>
					<TitleLinkContainer>
						<Logo>
							<p>&#127760;</p>
						</Logo>
						<span>Lista de IPs bloqueadas</span>
					</TitleLinkContainer>
					<InfoContainer>
						<Info>
							<p>
								<span>Cantidad de IPs bloqueadas:</span> 2,800 / 10000
							</p>
							<form>
								<input type="number" placeholder="Nuevo registro maximo" />
								<button>Actualizar</button>
							</form>
						</Info>
						<Info>
							<p>
								<span>Última modificación: </span>14/07/2025
							</p>
							<Button buttonType={BUTTON_TYPE_CLASSES.seeMore}>
								❏ Copiar link
							</Button>
						</Info>
					</InfoContainer>
				</EdlLink>
			</EdlProfile>
			<EdlProfile>
				<EdlLink>
					<TitleLinkContainer>
						<Logo>
							<p>&#128279;</p>
						</Logo>
						<span>Lista de dominios bloqueados</span>
					</TitleLinkContainer>
					<InfoContainer>
						<Info>
							<p>
								<span>Cantidad de dominios bloqueados:</span> 2,800 / 10000
							</p>
							<form>
								<input type="number" placeholder="Nuevo registro maximo" />
								<button>Actualizar</button>
							</form>
						</Info>
						<Info>
							<p>
								<span>Última modificación: </span>14/07/2025
							</p>
							<Button buttonType={BUTTON_TYPE_CLASSES.seeMore}>
								❏ Copiar link
							</Button>
						</Info>
					</InfoContainer>
				</EdlLink>
			</EdlProfile>
			<EdlProfile>
				<EdlLink>
					<TitleLinkContainer>
						<Logo>
							<p>&#35;&#65039;&#x20E3;</p>
						</Logo>
						<span>Lista de Hashes bloqueados</span>
					</TitleLinkContainer>
					<InfoContainer>
						<Info>
							<p>
								<span>Cantidad de hashes bloqueadas:</span> 2,800 / 10000
							</p>
							<form>
								<input type="number" placeholder="Nuevo registro maximo" />
								<button>Actualizar</button>
							</form>
						</Info>
						<Info>
							<p>
								<span>Última modificación: </span>14/07/2025
							</p>
							<Button buttonType={BUTTON_TYPE_CLASSES.seeMore}>
								❏ Copiar link
							</Button>
						</Info>
					</InfoContainer>
				</EdlLink>
			</EdlProfile>
		</EdlProfilesContainer>
	);
};
export default EdlProfiles;
