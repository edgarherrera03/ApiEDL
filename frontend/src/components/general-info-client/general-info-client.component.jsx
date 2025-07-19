import {
	GeneralInfoClientContainer,
	ClientTitle,
	ClientBaseInformation,
	ApiKeyContainer,
	TitleInformation,
	ExpirationDateContainer,
	DatesContainer,
	DateContainer,
} from "./general-info-client.styles";
import { useState } from "react";
import { BUTTON_TYPE_CLASSES } from "../button/button.component";
import Button from "../button/button.component";
import { modifyExpirationDateRequest } from "../../utils/api";

const GeneralInfoClient = ({ client, token, reloadClientDetails }) => {
	const [expirationDate, setExpirationDate] = useState("");
	const handleSubmitExpirationDate = async (event) => {
		event.preventDefault();
		const newDate = event.target.elements[0].value;
		const confirmed = window.confirm(
			`La siguiente fecha de expiración sera añadida:\n\n[Fecha: ${newDate}]\n\n¿Confirmar?`
		);
		if (!confirmed) return;
		const response = await modifyExpirationDateRequest(token, newDate);
		if (response.success) {
			reloadClientDetails();
		} else {
			alert(response.error || "Se produjo un error al modificar la fecha");
		}
		setExpirationDate("");
	};

	const handleChangeExpirationDate = (event) => {
		const { value } = event.target;
		setExpirationDate(value);
	};
	return (
		<GeneralInfoClientContainer>
			<ClientBaseInformation>
				<ApiKeyContainer>
					<TitleInformation>
						<span>API Key</span>
						<p>{client.apiKey}</p>
					</TitleInformation>

					<div>
						<Button type="button" buttonType={BUTTON_TYPE_CLASSES.generate}>
							Regenerar
						</Button>
					</div>
				</ApiKeyContainer>
				<ExpirationDateContainer>
					<DateContainer>
						<span>Fecha de expiración:</span>
						<p>{new Date(client.expirationDate).toUTCString()}</p>
					</DateContainer>
					<form onSubmit={handleSubmitExpirationDate}>
						<DateContainer>
							<span>Nueva fecha:</span>
							<input
								type="date"
								required
								value={expirationDate}
								onChange={handleChangeExpirationDate}
							/>
							<button type="submit">OK</button>
						</DateContainer>
					</form>
				</ExpirationDateContainer>
				<DatesContainer>
					<DateContainer>
						<span>Fecha de creación:</span>{" "}
						<p>{new Date(client.creationDate).toUTCString()}</p>
					</DateContainer>
					<DateContainer>
						<span>Ultima actualización:</span>{" "}
						<p>{new Date(client.updateDate).toUTCString()}</p>
					</DateContainer>
				</DatesContainer>
			</ClientBaseInformation>
		</GeneralInfoClientContainer>
	);
};

export default GeneralInfoClient;
