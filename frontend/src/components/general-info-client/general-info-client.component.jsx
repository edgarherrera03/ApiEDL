import {
	ClientBaseInformation,
	ApiKeyContainer,
	TitleInformation,
	ExpirationDateContainer,
	DatesContainer,
	DateContainer,
} from "./general-info-client.styles";
import { useContext, useState } from "react";
import { BUTTON_TYPE_CLASSES } from "../button/button.component";
import Button from "../button/button.component";
import {
	modifyExpirationDateRequest,
	regenerateApiKeyRequest,
} from "../../utils/api";
import { UserContext } from "../../context/user.context";

const GeneralInfoClient = ({ client, token, reloadClientDetails }) => {
	const [expirationDate, setExpirationDate] = useState("");
	const { currentUser, logout } = useContext(UserContext);
	const role = currentUser["role"];
	const handleSubmitExpirationDate = async (event) => {
		event.preventDefault();
		const newDate = event.target.elements[0].value;
		const confirmed = window.confirm(
			`La siguiente fecha de expiración sera añadida:\n\n[Fecha: ${newDate}]\n\n¿Confirmar?`
		);
		if (!confirmed) return;
		const response = await modifyExpirationDateRequest(
			currentUser["username"],
			token,
			newDate
		);
		if (response.success) {
			reloadClientDetails();
		} else if (response.code === 403 || response.code === 401) {
			await logout();
		} else {
			console.log(response.error);
		}
		setExpirationDate("");
	};

	const handleChangeExpirationDate = (event) => {
		const { value } = event.target;
		setExpirationDate(value);
	};

	const handleRegenerateKey = async () => {
		const confirmed = window.confirm(
			`La Api_Key del cliente sera regenerada:\n\n¿Confirmar?`
		);
		if (!confirmed) return;
		const response = await regenerateApiKeyRequest(
			currentUser["username"],
			token
		);
		if (response.success) {
			reloadClientDetails();
		} else if (response.code === 403 || response.code === 401) {
			await logout();
		} else {
			console.log(
				response.error || "Se produjo un error al regenerar la Api_Key"
			);
		}
	};
	return (
		<ClientBaseInformation>
			<ApiKeyContainer>
				<TitleInformation>
					<span>API Key</span>
					<p>{client.apiKey}</p>
				</TitleInformation>
				{role === "admin" && (
					<div>
						<Button
							onClick={handleRegenerateKey}
							type="button"
							buttonType={BUTTON_TYPE_CLASSES.generate}>
							Regenerar
						</Button>
					</div>
				)}
			</ApiKeyContainer>
			<ExpirationDateContainer>
				<DateContainer>
					<span>Fecha de expiración:</span>
					<p>{new Date(client.expirationDate).toUTCString()}</p>
				</DateContainer>

				<form onSubmit={handleSubmitExpirationDate}>
					<DateContainer>
						<span>Nueva fecha:</span>
						{role === "admin" && (
							<>
								<input
									type="date"
									required
									value={expirationDate}
									onChange={handleChangeExpirationDate}
								/>
								<button type="submit">OK</button>
							</>
						)}
					</DateContainer>
				</form>
			</ExpirationDateContainer>
			<DatesContainer>
				<DateContainer>
					<span>Fecha de creación:</span>{" "}
					<p>{new Date(client.creationDate).toUTCString()}</p>
				</DateContainer>
				<DateContainer>
					<span>Última actualización:</span>{" "}
					<p>{new Date(client.updateDate).toUTCString()}</p>
				</DateContainer>
			</DatesContainer>
		</ClientBaseInformation>
	);
};

export default GeneralInfoClient;
