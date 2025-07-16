import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { requestClientByToken } from "../../utils/flask-backend.utils";
import {
	ClientDetailPageContainer,
	ClientGeneralInformation,
	ClientInformation,
	ApiKeyContainer,
	ExpirationDateContainer,
	ActivityLogContainer,
} from "./client-detail-page.styles";
import Button, {
	BUTTON_TYPE_CLASSES,
} from "../../components/button/button.component";

const ClientDetailPage = () => {
	const { token } = useParams();
	const [client, setClient] = useState(null);

	useEffect(() => {
		const fetchClient = async () => {
			const response = await requestClientByToken(token);
			if (response.success) {
				setClient(response.client);
			} else {
				alert(response.error || "Error fetching client details");
			}
		};

		fetchClient();
	}, [token]);

	if (!client) return <p>Loading...</p>;

	return (
		<ClientDetailPageContainer>
			<ClientGeneralInformation>
				<h1>{client.name}</h1>
				<p>Usuario: {client.username}</p>
			</ClientGeneralInformation>
			<ClientInformation>
				<ApiKeyContainer>
					<h2>API Key</h2>
					<p>{client.apiKey}</p>
					<Button type="button" buttonType={BUTTON_TYPE_CLASSES.modify}>
						ReGen
					</Button>
				</ApiKeyContainer>
				<ExpirationDateContainer>
					<h2>Fecha de Expiración</h2>
					<p>{new Date(client.expirationDate).toUTCString()}</p>
					<form action=""></form>
				</ExpirationDateContainer>
				<ActivityLogContainer>
					<h2>Actividad</h2>
					<p>
						Fecha de creación: {new Date(client.creationDate).toUTCString()}
					</p>
					<p>
						Fecha de actualización: {new Date(client.updateDate).toUTCString()}
					</p>
				</ActivityLogContainer>
			</ClientInformation>
		</ClientDetailPageContainer>
	);
};

export default ClientDetailPage;
