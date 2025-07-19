import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { requestClientByToken } from "../../utils/api";
import {
	ClientDetailPageContainer,
	ClientDetailContentContainer,
	ClientTitle,
} from "./client-detail-page.styles";
import LeftBarClient from "../../components/left-bar-client/left-bar-client.component";
import { CLIENT_ROUTES } from "../../components/left-bar-client/left-bar-client.component";
import {
	addIpAddressRequest,
	deleteIpAddressRequest,
	addIpWhiteListRequest,
	deleteIpWhiteListRequest,
	addWebsiteRequest,
	deleteWebsiteRequest,
} from "../../utils/api";
import GeneralInfoClient from "../../components/general-info-client/general-info-client.component";
import IpList from "../../components/ip-list/ip-list.component";

const ClientDetailPage = () => {
	const { token } = useParams();
	const [client, setClient] = useState(null);
	const [selectedRoute, setSelectedRoute] = useState(CLIENT_ROUTES.general);

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

	const handleSelectRoute = (route) => {
		setSelectedRoute(route);
	};

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

	if (!client) return <p>Loading...</p>;

	return (
		<ClientDetailPageContainer>
			<LeftBarClient selected={selectedRoute} onSelect={handleSelectRoute} />
			<ClientDetailContentContainer>
				<ClientTitle>
					<h1>{client.name}</h1>
					<p>
						<span>Usuario:</span> {client.username}
					</p>
				</ClientTitle>
				{selectedRoute === CLIENT_ROUTES.general && (
					<GeneralInfoClient
						client={client}
						token={token}
						reloadClientDetails={reloadClientDetails}
					/>
				)}
				{selectedRoute === CLIENT_ROUTES.ipList && (
					<IpList
						reloadIpItemList={reloadClientDetails}
						handleAdd={handleAddIpAdress}
					/>
				)}
				{selectedRoute === CLIENT_ROUTES.domainList && (
					<GeneralInfoClient
						client={client}
						token={token}
						reloadClientDetails={reloadClientDetails}
					/>
				)}
				{selectedRoute === CLIENT_ROUTES.hashList && (
					<GeneralInfoClient
						client={client}
						token={token}
						reloadClientDetails={reloadClientDetails}
					/>
				)}
				{selectedRoute === CLIENT_ROUTES.edlProfiles && (
					<GeneralInfoClient
						client={client}
						token={token}
						reloadClientDetails={reloadClientDetails}
					/>
				)}
			</ClientDetailContentContainer>
		</ClientDetailPageContainer>
	);
};

export default ClientDetailPage;
