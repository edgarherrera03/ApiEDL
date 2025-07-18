import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
	modifyExpirationDateRequest,
	requestClientByToken,
} from "../../utils/flask-backend.utils";
import {
	ClientDetailPageContainer,
	ClientGeneralInformation,
	ClientInformation,
	ApiKeyContainer,
	ExpirationDateContainer,
	ActivityLogContainer,
	ClientControlContainer,
	TitleInformation,
} from "./client-detail-page.styles";
import Button, {
	BUTTON_TYPE_CLASSES,
} from "../../components/button/button.component";
import IpList from "../../components/Ip-list/Ip-list.component";
import DomainList from "../../components/domain-list/domain-list.component";
import {
	addIpAddressRequest,
	deleteIpAddressRequest,
	addIpWhiteListRequest,
	deleteIpWhiteListRequest,
	addWebsiteRequest,
	deleteWebsiteRequest,
} from "../../utils/flask-backend.utils";

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

	const reloadClientDetails = async () => {
		const response = await requestClientByToken(token);
		if (response.success) {
			setClient(response.client);
		} else {
			alert(response.error || "Error reloading client details");
		}
	};

	const handleAddIpAdress = async (ipAddress) => {
		const response = await addIpAddressRequest(token, ipAddress);
		return response;
	};

	const handleDeleteIpAddress = async (ipAddress) => {
		const response = await deleteIpAddressRequest(token, ipAddress);
		return response;
	};

	const handleAddIpWhiteList = async (ipAddress) => {
		const response = await addIpWhiteListRequest(token, ipAddress);
		return response;
	};

	const handleDeleteIpWhiteList = async (ipAddress) => {
		const response = await deleteIpWhiteListRequest(token, ipAddress);
		return response;
	};

	const handleAddWebsiteList = async (ipAddress) => {
		const response = await addWebsiteRequest(token, ipAddress);
		return response;
	};

	const handleDeleteWebsiteList = async (ipAddress) => {
		const response = await deleteWebsiteRequest(token, ipAddress);
		return response;
	};

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
			alert(response.error || "Error modifying expiration date");
		}
	};
	if (!client) return <p>Loading...</p>;

	return (
		<ClientDetailPageContainer>
			<ClientGeneralInformation>
				<h1>{client.name}</h1>
				<p>
					<span>Usuario:</span> {client.username}
				</p>
			</ClientGeneralInformation>
			<ClientInformation>
				<ApiKeyContainer>
					<TitleInformation>API Key</TitleInformation>
					<p>{client.apiKey}</p>
					<div>
						<Button type="button" buttonType={BUTTON_TYPE_CLASSES.generate}>
							Regenerar
						</Button>
					</div>
				</ApiKeyContainer>
				<ExpirationDateContainer>
					<TitleInformation>Fecha de Expiración</TitleInformation>
					<p>{new Date(client.expirationDate).toUTCString()}</p>
					<form onSubmit={handleSubmitExpirationDate}>
						<label>Nueva fecha</label>
						<input type="date" required />
						<button type="submit">OK</button>
					</form>
				</ExpirationDateContainer>
				<ActivityLogContainer>
					<TitleInformation>Actividad</TitleInformation>
					<p>
						<span>Fecha de creación:</span>{" "}
						{new Date(client.creationDate).toUTCString()}
					</p>
					<p>
						<span>Fecha de actualización:</span>{" "}
						{new Date(client.updateDate).toUTCString()}
					</p>
				</ActivityLogContainer>
			</ClientInformation>
			<ClientControlContainer>
				<IpList
					header="Lista de enlaces:"
					ipItemList={client.IpList}
					handleAdd={handleAddIpAdress}
					handleDelete={handleDeleteIpAddress}
					reloadIpItemList={reloadClientDetails}
				/>
				<IpList
					header="White List:"
					ipItemList={client.WhiteList}
					handleAdd={handleAddIpWhiteList}
					handleDelete={handleDeleteIpWhiteList}
					reloadIpItemList={reloadClientDetails}
				/>
				<DomainList
					header="Lista de dominios:"
					ipItemList={client.WebsiteList}
					handleAdd={handleAddWebsiteList}
					handleDelete={handleDeleteWebsiteList}
					reloadIpItemList={reloadClientDetails}
				/>
			</ClientControlContainer>
		</ClientDetailPageContainer>
	);
};

export default ClientDetailPage;
